import React, {
  PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import type { TPaletteColor } from '../../../theme/types';
import type { TInputVariant } from '../input-wrapper/types';
import {
  SInputDateFieldTimeWheel,
  SInputDateFieldTimeWheelHighlight,
  SInputDateFieldTimeWheelItem,
  SInputDateFieldTimeWheelList,
  SInputDateFieldTimeWheelSpacer,
} from './styles';

export const TIME_WHEEL_ITEM_HEIGHT = 36;
export const TIME_WHEEL_VISIBLE = 5;

const REPEAT = 3;
const PAD = ((TIME_WHEEL_VISIBLE - 1) / 2) * TIME_WHEEL_ITEM_HEIGHT;
const SNAP_IDLE_MS = 100;
const COMMIT_DELAY_MS = 300;
/** Higher = slower drag / wheel movement. */
const SCROLL_RESISTANCE = 3;

type TTimeWheelItem = {
  value: string | number;
  label: string;
};

type TTimeWheelProps = {
  items: TTimeWheelItem[];
  value: string | number;
  onChange: (value: string | number) => void;
  color?: TPaletteColor;
  variant?: TInputVariant;
  infinite?: boolean;
  'aria-label'?: string;
  disabled?: boolean;
};

const mod = (n: number, m: number) => ((n % m) + m) % m;

/** Center + two neighbors; fade by distance, hide beyond. */
const opacityForDistance = (distance: number) => {
  if (distance > 2.5) {
    return 0;
  }
  return Math.max(0.2, 1 - distance * 0.35);
};

export const TimeWheel = ({
  items,
  value,
  onChange,
  color = 'primary',
  variant = 'subtle',
  infinite = true,
  'aria-label': ariaLabel,
  disabled = false,
}: TTimeWheelProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const valueRef = useRef(value);
  const onChangeRef = useRef(onChange);
  const userScrollingRef = useRef(false);
  const draggingRef = useRef(false);
  const dragMovedRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const pendingClickIndexRef = useRef<number | null>(null);
  const snapTimerRef = useRef(0);
  const commitTimerRef = useRef(0);
  const rafRef = useRef(0);

  valueRef.current = value;
  onChangeRef.current = onChange;

  const loop = infinite && items.length > 1;
  const copies = loop ? REPEAT : 1;
  const setHeight = items.length * TIME_WHEEL_ITEM_HEIGHT;

  const rendered = Array.from({ length: copies }, (_, copy) =>
    items.map((item, index) => ({
      ...item,
      key: `${copy}-${item.value}-${index}`,
      flatIndex: copy * items.length + index,
    })),
  ).flat();

  const indexFromValue = (next: string | number) =>
    Math.max(0, items.findIndex((item) => item.value === next));

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = 'auto') => {
      const node = listRef.current;
      if (!node || items.length === 0) {
        return;
      }
      const targetIndex = loop ? index + items.length : index;
      const top = targetIndex * TIME_WHEEL_ITEM_HEIGHT;
      if (behavior === 'smooth') {
        node.scrollTo({ top, behavior });
      } else {
        node.scrollTop = top;
      }
    },
    [items.length, loop],
  );

  const updateItemStyles = useCallback(() => {
    const node = listRef.current;
    if (!node) {
      return;
    }
    const center = node.scrollTop / TIME_WHEEL_ITEM_HEIGHT;
    const selected = Math.round(center);

    itemRefs.current.forEach((el, flatIndex) => {
      const distance = Math.abs(flatIndex - center);
      el.style.opacity = String(opacityForDistance(distance));
      if (flatIndex === selected) {
        el.dataset.selected = 'true';
      } else {
        delete el.dataset.selected;
      }
    });
  }, []);

  const handleLoopScroll = useCallback(() => {
    const node = listRef.current;
    if (!node || !loop) {
      return;
    }
    const { scrollTop } = node;
    if (scrollTop < setHeight * 0.5) {
      node.scrollTop = scrollTop + setHeight;
    } else if (scrollTop >= setHeight * 2.5) {
      node.scrollTop = scrollTop - setHeight;
    }
  }, [loop, setHeight]);

  const emitFromScroll = useCallback(() => {
    const node = listRef.current;
    if (!node || items.length === 0) {
      return;
    }

    let { scrollTop } = node;
    if (loop) {
      const offsetInSet = ((scrollTop % setHeight) + setHeight) % setHeight;
      const normalized = setHeight + offsetInSet;
      if (Math.abs(scrollTop - normalized) > 1) {
        node.scrollTop = normalized;
        scrollTop = normalized;
      }
    }

    const rawIndex = Math.round(scrollTop / TIME_WHEEL_ITEM_HEIGHT);
    const finalIndex = loop
      ? mod(rawIndex, items.length)
      : Math.min(Math.max(rawIndex, 0), items.length - 1);
    const snapIndex = loop ? finalIndex + items.length : finalIndex;
    node.scrollTo({
      top: snapIndex * TIME_WHEEL_ITEM_HEIGHT,
      behavior: 'smooth',
    });
    updateItemStyles();

    const nextValue = items[finalIndex]?.value;
    if (nextValue === undefined || nextValue === valueRef.current) {
      return;
    }

    window.clearTimeout(commitTimerRef.current);
    commitTimerRef.current = window.setTimeout(() => {
      valueRef.current = nextValue;
      onChangeRef.current(nextValue);
    }, COMMIT_DELAY_MS);
  }, [items, loop, setHeight, updateItemStyles]);

  const scheduleFinalize = useCallback(() => {
    window.clearTimeout(snapTimerRef.current);
    snapTimerRef.current = window.setTimeout(() => {
      userScrollingRef.current = false;
      draggingRef.current = false;
      emitFromScroll();
    }, SNAP_IDLE_MS);
  }, [emitFromScroll]);

  useLayoutEffect(() => {
    scrollToIndex(indexFromValue(valueRef.current), 'auto');
    updateItemStyles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copies, items.length, loop, scrollToIndex, updateItemStyles]);

  useEffect(() => {
    if (userScrollingRef.current || draggingRef.current) {
      return;
    }
    if (value === valueRef.current) {
      return;
    }
    valueRef.current = value;
    window.clearTimeout(commitTimerRef.current);
    scrollToIndex(indexFromValue(value), 'auto');
    updateItemStyles();
  }, [value, scrollToIndex, updateItemStyles, items]);

  useEffect(() => {
    const node = listRef.current;
    if (!node) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      if (disabled) {
        return;
      }
      event.preventDefault();
      userScrollingRef.current = true;
      window.clearTimeout(snapTimerRef.current);
      window.clearTimeout(commitTimerRef.current);
      node.scrollTop += event.deltaY / SCROLL_RESISTANCE;
      handleLoopScroll();
      updateItemStyles();
      scheduleFinalize();
    };

    node.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      node.removeEventListener('wheel', handleWheel);
      window.clearTimeout(snapTimerRef.current);
      window.clearTimeout(commitTimerRef.current);
      window.cancelAnimationFrame(rafRef.current);
    };
  }, [
    disabled,
    handleLoopScroll,
    scheduleFinalize,
    updateItemStyles,
  ]);

  const handleScroll = () => {
    if (loop) {
      handleLoopScroll();
    }

    window.cancelAnimationFrame(rafRef.current);
    rafRef.current = window.requestAnimationFrame(updateItemStyles);

    if (draggingRef.current) {
      return;
    }

    userScrollingRef.current = true;
    window.clearTimeout(commitTimerRef.current);
    scheduleFinalize();
  };

  const selectFlatIndex = useCallback(
    (flatIndex: number, behavior: ScrollBehavior = 'smooth') => {
      if (disabled || items.length === 0) {
        return;
      }
      const itemIndex = loop ? mod(flatIndex, items.length) : flatIndex;
      if (itemIndex < 0 || itemIndex >= items.length) {
        return;
      }
      const nextValue = items[itemIndex]?.value;
      if (nextValue === undefined) {
        return;
      }

      window.clearTimeout(snapTimerRef.current);
      window.clearTimeout(commitTimerRef.current);
      valueRef.current = nextValue;
      onChangeRef.current(nextValue);
      scrollToIndex(itemIndex, behavior);
      window.requestAnimationFrame(updateItemStyles);
    },
    [disabled, items, loop, scrollToIndex, updateItemStyles],
  );

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (disabled || event.button !== 0) {
      return;
    }
    const node = listRef.current;
    if (!node) {
      return;
    }

    const itemNode = (event.target as HTMLElement | null)?.closest(
      '[data-flat-index]',
    ) as HTMLElement | null;
    pendingClickIndexRef.current =
      itemNode != null ? Number(itemNode.dataset.flatIndex) : null;

    draggingRef.current = true;
    dragMovedRef.current = false;
    userScrollingRef.current = true;
    dragStartYRef.current = event.clientY;
    dragStartScrollRef.current = node.scrollTop;
    node.setPointerCapture(event.pointerId);
    window.clearTimeout(snapTimerRef.current);
    window.clearTimeout(commitTimerRef.current);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || !listRef.current) {
      return;
    }

    const pointerDelta = dragStartYRef.current - event.clientY;
    if (Math.abs(pointerDelta) > 6) {
      dragMovedRef.current = true;
      pendingClickIndexRef.current = null;
    }

    const deltaY = pointerDelta / SCROLL_RESISTANCE;
    let nextTop = dragStartScrollRef.current + deltaY;
    if (!loop) {
      const maxScroll = Math.max(0, (items.length - 1) * TIME_WHEEL_ITEM_HEIGHT);
      nextTop = Math.min(Math.max(nextTop, 0), maxScroll);
    }

    listRef.current.scrollTop = nextTop;
    if (loop) {
      handleLoopScroll();
    }
    updateItemStyles();
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) {
      return;
    }
    const node = listRef.current;
    if (node?.hasPointerCapture(event.pointerId)) {
      node.releasePointerCapture(event.pointerId);
    }

    const clickIndex = pendingClickIndexRef.current;
    const wasDrag = dragMovedRef.current;
    draggingRef.current = false;
    pendingClickIndexRef.current = null;

    if (!wasDrag && clickIndex != null && !Number.isNaN(clickIndex)) {
      selectFlatIndex(clickIndex, 'smooth');
      userScrollingRef.current = false;
      return;
    }

    scheduleFinalize();
  };

  return (
    <SInputDateFieldTimeWheel aria-label={ariaLabel} aria-disabled={disabled}>
      <SInputDateFieldTimeWheelHighlight
        color={color}
        variant={variant}
        aria-hidden
      />
      <SInputDateFieldTimeWheelList
        ref={listRef}
        onScroll={handleScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <SInputDateFieldTimeWheelSpacer style={{ height: PAD }} aria-hidden />
        {rendered.map((item) => (
          <SInputDateFieldTimeWheelItem
            key={item.key}
            ref={(el) => {
              if (el) {
                itemRefs.current.set(item.flatIndex, el);
              } else {
                itemRefs.current.delete(item.flatIndex);
              }
            }}
            type="button"
            tabIndex={-1}
            disabled={disabled}
            color={color}
            variant={variant}
            data-flat-index={item.flatIndex}
          >
            {item.label}
          </SInputDateFieldTimeWheelItem>
        ))}
        <SInputDateFieldTimeWheelSpacer style={{ height: PAD }} aria-hidden />
      </SInputDateFieldTimeWheelList>
    </SInputDateFieldTimeWheel>
  );
};
