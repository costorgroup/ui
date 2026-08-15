import React, {
  PointerEvent as ReactPointerEvent,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
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

const TimeWheelComponent = ({
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
  const valueRef = useRef(value);
  const onChangeRef = useRef(onChange);
  const userScrollingRef = useRef(false);
  const draggingRef = useRef(false);
  const dragMovedRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const pendingClickIndexRef = useRef<number | null>(null);
  const selectedIndexRef = useRef<number | null>(null);
  const snapTimerRef = useRef(0);
  const commitTimerRef = useRef(0);
  const rafRef = useRef(0);
  const pendingScrollRef = useRef<number | null>(null);

  valueRef.current = value;
  onChangeRef.current = onChange;

  const loop = infinite && items.length > 1;
  const copies = loop ? REPEAT : 1;
  const setHeight = items.length * TIME_WHEEL_ITEM_HEIGHT;

  const rendered = useMemo(
    () =>
      Array.from({ length: copies }, (_, copy) =>
        items.map((item, index) => ({
          ...item,
          key: `${copy}-${item.value}-${index}`,
          flatIndex: copy * items.length + index,
        })),
      ).flat(),
    [copies, items],
  );

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

  const updateSelectedItem = useCallback(() => {
    const node = listRef.current;
    if (!node) {
      return;
    }

    const selected = Math.round(node.scrollTop / TIME_WHEEL_ITEM_HEIGHT);
    if (selected === selectedIndexRef.current) {
      return;
    }

    if (selectedIndexRef.current != null) {
      const previous = node.querySelector<HTMLElement>(
        `[data-flat-index="${selectedIndexRef.current}"]`,
      );
      if (previous) {
        delete previous.dataset.selected;
      }
    }

    const current = node.querySelector<HTMLElement>(
      `[data-flat-index="${selected}"]`,
    );
    if (current) {
      current.dataset.selected = 'true';
    }
    selectedIndexRef.current = selected;
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

  const applyPendingScroll = useCallback(() => {
    const node = listRef.current;
    const nextTop = pendingScrollRef.current;
    rafRef.current = 0;
    pendingScrollRef.current = null;

    if (!node || nextTop == null) {
      return;
    }

    node.scrollTop = nextTop;
    handleLoopScroll();
    updateSelectedItem();
  }, [handleLoopScroll, updateSelectedItem]);

  const scheduleScrollTop = useCallback(
    (nextTop: number) => {
      pendingScrollRef.current = nextTop;
      if (rafRef.current) {
        return;
      }
      rafRef.current = window.requestAnimationFrame(applyPendingScroll);
    },
    [applyPendingScroll],
  );

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
    updateSelectedItem();

    const nextValue = items[finalIndex]?.value;
    if (nextValue === undefined || nextValue === valueRef.current) {
      return;
    }

    window.clearTimeout(commitTimerRef.current);
    commitTimerRef.current = window.setTimeout(() => {
      valueRef.current = nextValue;
      onChangeRef.current(nextValue);
    }, COMMIT_DELAY_MS);
  }, [items, loop, setHeight, updateSelectedItem]);

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
    updateSelectedItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copies, items.length, loop, scrollToIndex, updateSelectedItem]);

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
    updateSelectedItem();
  }, [value, scrollToIndex, updateSelectedItem, items]);

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
      const current =
        pendingScrollRef.current ?? node.scrollTop;
      scheduleScrollTop(current + event.deltaY / SCROLL_RESISTANCE);
      scheduleFinalize();
    };

    node.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      node.removeEventListener('wheel', handleWheel);
      window.clearTimeout(snapTimerRef.current);
      window.clearTimeout(commitTimerRef.current);
      window.cancelAnimationFrame(rafRef.current);
    };
  }, [disabled, scheduleFinalize, scheduleScrollTop]);

  const handleScroll = () => {
    if (draggingRef.current || pendingScrollRef.current != null) {
      return;
    }

    if (loop) {
      handleLoopScroll();
    }

    updateSelectedItem();
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
      window.requestAnimationFrame(updateSelectedItem);
    },
    [disabled, items, loop, scrollToIndex, updateSelectedItem],
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
    if (!draggingRef.current) {
      return;
    }

    const pointerDelta = dragStartYRef.current - event.clientY;
    if (Math.abs(pointerDelta) > 6) {
      dragMovedRef.current = true;
      pendingClickIndexRef.current = null;
    }

    let nextTop = dragStartScrollRef.current + pointerDelta / SCROLL_RESISTANCE;
    if (!loop) {
      const maxScroll = Math.max(0, (items.length - 1) * TIME_WHEEL_ITEM_HEIGHT);
      nextTop = Math.min(Math.max(nextTop, 0), maxScroll);
    }

    scheduleScrollTop(nextTop);
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

    if (rafRef.current) {
      window.cancelAnimationFrame(rafRef.current);
      applyPendingScroll();
    }

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

export const TimeWheel = memo(TimeWheelComponent, (prev, next) => (
  prev.items === next.items &&
  prev.value === next.value &&
  prev.color === next.color &&
  prev.variant === next.variant &&
  prev.infinite === next.infinite &&
  prev.disabled === next.disabled &&
  prev['aria-label'] === next['aria-label']
));
TimeWheel.displayName = 'TimeWheel';
