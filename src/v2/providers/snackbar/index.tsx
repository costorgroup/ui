import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { SnackbarContext } from './context';
import { createSnackbarId } from './create-id';
import { defaultSnackbarRender } from './default-render';
import SnackbarItem from './item';
import { SNACKBAR_ANIM_MS } from './item/styles';
import {
  TSnackbarEnqueueOptions,
  TSnackbarItem,
  TSnackbarPosition,
} from './shared-types';
import { SNACKBAR_POSITIONS } from './position';
import { SNACKBAR_MAX_VISIBLE_DEFAULT } from './stack';
import { SSnackbarViewport } from './styles';
import { TSnackbarProviderProps } from './types';

const STACKED_SIZE_ERROR =
  'SnackbarProvider: stacked requires size so every snackbar is the same size.';

type TViewportGroupProps = {
  position: TSnackbarPosition;
  items: TSnackbarItem[];
  stacked: boolean;
  stretch: boolean;
  render: TSnackbarProviderProps['render'];
  defaultRender: typeof defaultSnackbarRender;
  onClose: (id: string) => void;
  onExited: (id: string) => void;
  onHoverChange: (hovered: boolean) => void;
};

const SnackbarViewportGroup = ({
  position,
  items,
  stacked,
  stretch,
  render,
  defaultRender,
  onClose,
  onExited,
  onHoverChange,
}: TViewportGroupProps) => {
  const [expanded, setExpanded] = useState(false);
  const [itemBox, setItemBox] = useState({ width: 0, height: 0 });
  const frontRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!stacked) {
      setItemBox({ width: 0, height: 0 });
      return;
    }

    const node = frontRef.current;

    if (!node) {
      setItemBox({ width: 0, height: 0 });
      return;
    }

    const update = () => {
      const rect = node.getBoundingClientRect();
      setItemBox({ width: rect.width, height: rect.height });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);

    return () => observer.disconnect();
  }, [items, stacked]);

  return (
    <SSnackbarViewport
      position={position}
      stretch={stretch}
      stacked={stacked}
      expanded={stacked && expanded}
      stackCount={items.length}
      itemHeight={itemBox.height}
      itemWidth={itemBox.width}
      onMouseEnter={() => {
        if (!stacked) {
          return;
        }

        setExpanded(true);
        onHoverChange(true);
      }}
      onMouseLeave={() => {
        if (!stacked) {
          return;
        }

        setExpanded(false);
        onHoverChange(false);
      }}
    >
      {items.map((item, index) => {
        const stackIndex = items.length - 1 - index;

        return (
          <SnackbarItem
            key={item.id}
            ref={stacked && stackIndex === 0 ? frontRef : undefined}
            item={item}
            position={item.position ?? position}
            render={item.render ?? render ?? defaultRender}
            stretch={stretch}
            stacked={stacked}
            expanded={stacked && expanded}
            stackIndex={stackIndex}
            onClose={onClose}
            onExited={onExited}
          />
        );
      })}
    </SSnackbarViewport>
  );
};

const SnackbarProvider = ({
  children,
  position = 'bottom-right',
  duration = 4000,
  render = defaultSnackbarRender,
  stretch = false,
  stacked = false,
  maxVisible = SNACKBAR_MAX_VISIBLE_DEFAULT,
  size,
}: TSnackbarProviderProps) => {
  if (stacked && size == null) {
    throw new Error(STACKED_SIZE_ERROR);
  }

  const visibleLimit = Math.max(1, maxVisible);
  const [items, setItems] = useState<TSnackbarItem[]>([]);
  const [pausedSlots, setPausedSlots] = useState<ReadonlySet<TSnackbarPosition>>(
    () => new Set(),
  );
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const remainingRef = useRef<Map<string, number>>(new Map());
  const deadlineRef = useRef<Map<string, number>>(new Map());
  const itemsRef = useRef(items);
  itemsRef.current = items;

  const clearTimer = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const pauseTimer = useCallback(
    (id: string) => {
      const deadline = deadlineRef.current.get(id);

      if (deadline != null) {
        remainingRef.current.set(id, Math.max(0, deadline - Date.now()));
        deadlineRef.current.delete(id);
      }

      clearTimer(id);
    },
    [clearTimer],
  );

  const remove = useCallback((id: string) => {
    clearTimer(id);
    remainingRef.current.delete(id);
    deadlineRef.current.delete(id);
    setItems((current) => current.filter((item) => item.id !== id));
  }, [clearTimer]);

  const beginExit = useCallback((id: string) => {
    clearTimer(id);
    remainingRef.current.delete(id);
    deadlineRef.current.delete(id);

    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, exiting: true } : item)),
    );

    const timer = setTimeout(() => {
      remove(id);
    }, SNACKBAR_ANIM_MS + 40);

    timersRef.current.set(id, timer);
  }, [clearTimer, remove]);

  const scheduleAutoClose = useCallback(
    (id: string, itemDuration: number) => {
      clearTimer(id);

      if (itemDuration <= 0) {
        remainingRef.current.delete(id);
        deadlineRef.current.delete(id);
        return;
      }

      deadlineRef.current.set(id, Date.now() + itemDuration);
      remainingRef.current.delete(id);

      const timer = setTimeout(() => {
        beginExit(id);
      }, itemDuration);

      timersRef.current.set(id, timer);
    },
    [beginExit, clearTimer],
  );

  const enqueue = useCallback(
    (options: TSnackbarEnqueueOptions = {}) => {
      if (stacked && options.size != null && options.size !== size) {
        throw new Error(
          `enqueue: stacked snackbars must use size="${size}".`,
        );
      }

      const id = createSnackbarId();
      const item: TSnackbarItem = {
        ...options,
        id,
        exiting: false,
        size: stacked ? size : options.size,
      };

      remainingRef.current.set(id, options.duration ?? duration);
      setItems((current) => [...current, item]);

      if (!stacked) {
        scheduleAutoClose(id, options.duration ?? duration);
      }

      return id;
    },
    [duration, scheduleAutoClose, size, stacked],
  );

  const close = useCallback(
    (id: string) => {
      const item = itemsRef.current.find((entry) => entry.id === id);
      if (!item || item.exiting) {
        return;
      }

      beginExit(id);
    },
    [beginExit],
  );

  const closeAll = useCallback(() => {
    itemsRef.current.forEach((item) => {
      if (!item.exiting) {
        beginExit(item.id);
      }
    });
  }, [beginExit]);

  useEffect(
    () => () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current.clear();
    },
    [],
  );

  useEffect(() => {
    if (!stacked) {
      return;
    }

    SNACKBAR_POSITIONS.forEach((slot) => {
      const group = items.filter((item) => (item.position ?? position) === slot);
      const visibleIds = new Set(group.slice(-visibleLimit).map((item) => item.id));
      const paused = pausedSlots.has(slot);

      group.forEach((item) => {
        if (item.exiting) {
          return;
        }

        const visible = visibleIds.has(item.id);

        if (!visible || paused) {
          pauseTimer(item.id);
          return;
        }

        if (timersRef.current.has(item.id)) {
          return;
        }

        const remaining =
          remainingRef.current.get(item.id) ?? item.duration ?? duration;
        scheduleAutoClose(item.id, remaining);
      });
    });
  }, [
    duration,
    items,
    pauseTimer,
    pausedSlots,
    position,
    scheduleAutoClose,
    stacked,
    visibleLimit,
  ]);

  const value = useMemo(
    () => ({
      enqueue,
      close,
      closeAll,
    }),
    [close, closeAll, enqueue],
  );

  const grouped = SNACKBAR_POSITIONS.map((slot) => ({
    position: slot,
    items: items.filter((item) => (item.position ?? position) === slot),
  })).filter((group) => group.items.length > 0);

  const portal =
    typeof document === 'undefined'
      ? null
      : createPortal(
          <>
            {grouped.map((group) => {
              const visibleItems = stacked
                ? group.items.slice(-visibleLimit)
                : group.items;

              return (
                <SnackbarViewportGroup
                  key={group.position}
                  position={group.position}
                  items={visibleItems}
                  stacked={stacked}
                  stretch={stretch}
                  render={render}
                  defaultRender={defaultSnackbarRender}
                  onClose={close}
                  onExited={remove}
                  onHoverChange={(hovered) => {
                    setPausedSlots((current) => {
                      const next = new Set(current);

                      if (hovered) {
                        next.add(group.position);
                      } else {
                        next.delete(group.position);
                      }

                      return next;
                    });
                  }}
                />
              );
            })}
          </>,
          document.body,
        );

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      {portal}
    </SnackbarContext.Provider>
  );
};

export { SnackbarProvider };
export default SnackbarProvider;
export { defaultSnackbarRender } from './default-render';
export type { TSnackbarProviderProps } from './types';
export type {
  TSnackbarPosition,
  TSnackbarRenderProps,
  TSnackbarRender,
  TSnackbarEnqueueOptions,
  TSnackbarItem,
  TSnackbarContextValue,
} from './shared-types';
export type { TSnackbarItemProps } from './item/types';
