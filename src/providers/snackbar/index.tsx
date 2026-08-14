import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { SSnackbarViewport } from './styles';
import { TSnackbarProviderProps } from './types';

const POSITIONS: TSnackbarPosition[] = [
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
];

const SnackbarProvider = ({
  children,
  position = 'bottom-right',
  duration = 4000,
  render = defaultSnackbarRender,
}: TSnackbarProviderProps) => {
  const [items, setItems] = useState<TSnackbarItem[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const itemsRef = useRef(items);
  itemsRef.current = items;

  const clearTimer = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const remove = useCallback((id: string) => {
    clearTimer(id);
    setItems((current) => current.filter((item) => item.id !== id));
  }, [clearTimer]);

  const beginExit = useCallback((id: string) => {
    clearTimer(id);

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
        return;
      }

      const timer = setTimeout(() => {
        beginExit(id);
      }, itemDuration);

      timersRef.current.set(id, timer);
    },
    [beginExit, clearTimer],
  );

  const enqueue = useCallback(
    (options: TSnackbarEnqueueOptions = {}) => {
      const id = createSnackbarId();
      const item: TSnackbarItem = {
        ...options,
        id,
        exiting: false,
      };

      setItems((current) => [...current, item]);
      scheduleAutoClose(id, options.duration ?? duration);

      return id;
    },
    [duration, scheduleAutoClose],
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

  const value = useMemo(
    () => ({
      enqueue,
      close,
      closeAll,
    }),
    [close, closeAll, enqueue],
  );

  const grouped = POSITIONS.map((slot) => ({
    position: slot,
    items: items.filter((item) => (item.position ?? position) === slot),
  })).filter((group) => group.items.length > 0);

  const portal =
    typeof document === 'undefined'
      ? null
      : createPortal(
          <>
            {grouped.map((group) => (
              <SSnackbarViewport key={group.position} position={group.position}>
                {group.items.map((item) => (
                  <SnackbarItem
                    key={item.id}
                    item={item}
                    position={item.position ?? position}
                    render={item.render ?? render}
                    onClose={close}
                    onExited={remove}
                  />
                ))}
              </SSnackbarViewport>
            ))}
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
