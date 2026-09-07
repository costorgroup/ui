import React, { useCallback, useMemo, useRef, useState } from 'react';
import { MediaViewer } from '../../components/media-viewer';
import { TMediaViewerItem } from '../../components/media-viewer/types';
import { MediaViewerContext } from './context';
import { TMediaViewerContextValue, TMediaViewerProviderProps } from './types';

const clampIndex = (index: number, length: number) => {
  if (length <= 0) {
    return 0;
  }

  return Math.min(Math.max(index, 0), length - 1);
};

const wrapIndex = (index: number, length: number) => {
  if (length <= 0) {
    return 0;
  }

  return ((index % length) + length) % length;
};

const MediaViewerProvider = ({ children }: TMediaViewerProviderProps) => {
  const [items, setItems] = useState<TMediaViewerItem[]>([]);
  const [index, setIndexState] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const itemsRef = useRef(items);
  itemsRef.current = items;

  const open = useCallback((nextItems: TMediaViewerItem[], nextIndex = 0) => {
    setItems(nextItems);
    setIndexState(clampIndex(nextIndex, nextItems.length));
    setOpen(nextItems.length > 0);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const setIndex = useCallback((nextIndex: number) => {
    setIndexState(clampIndex(nextIndex, itemsRef.current.length));
  }, []);

  const next = useCallback(() => {
    setIndexState((current) => wrapIndex(current + 1, itemsRef.current.length));
  }, []);

  const prev = useCallback(() => {
    setIndexState((current) => wrapIndex(current - 1, itemsRef.current.length));
  }, []);

  const value = useMemo<TMediaViewerContextValue>(
    () => ({
      open,
      close,
      next,
      prev,
      setIndex,
      items,
      index: clampIndex(index, items.length),
      active: items[clampIndex(index, items.length)] ?? null,
      isOpen,
    }),
    [close, index, isOpen, items, next, open, prev, setIndex],
  );

  return (
    <MediaViewerContext.Provider value={value}>
      {children}
      <MediaViewer
        items={items}
        index={index}
        open={isOpen}
        onIndexChange={setIndexState}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) {
            close();
          }
        }}
      />
    </MediaViewerContext.Provider>
  );
};

MediaViewerProvider.displayName = 'MediaViewerProvider';

export type {
  TMediaViewerContextValue,
  TMediaViewerProviderProps,
} from './types';
export { MediaViewerContext } from './context';
export { MediaViewerProvider };
export default MediaViewerProvider;
