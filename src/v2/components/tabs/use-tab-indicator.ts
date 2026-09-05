import {
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { TTabsAppearance, TTabsOrientation } from './context';

export type TTabIndicatorRect = {
  width: number;
  height: number;
  x: number;
  y: number;
};

const emptyRect: TTabIndicatorRect = {
  width: 0,
  height: 0,
  x: 0,
  y: 0,
};

const DRAG_THRESHOLD = 4;

type TUseTabIndicatorLayout = {
  appearance: TTabsAppearance;
  orientation: TTabsOrientation;
  fullWidth: boolean;
};

type TUseTabIndicatorOptions = {
  draggable?: boolean;
  onSelect?: (value: string) => void;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const useTabIndicator = (
  containerRef: RefObject<HTMLDivElement | null>,
  activeValue: string | undefined,
  layout: TUseTabIndicatorLayout,
  options: TUseTabIndicatorOptions = {},
) => {
  const { appearance, orientation, fullWidth } = layout;
  const { draggable = true, onSelect } = options;
  const [indicator, setIndicator] = useState<TTabIndicatorRect>(emptyRect);
  const [dragRect, setDragRect] = useState<TTabIndicatorRect | null>(null);
  const [dragHoverValue, setDragHoverValue] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [ready, setReady] = useState(false);
  const readyRef = useRef(false);
  const draggingRef = useRef(false);
  const dragStartRectRef = useRef<TTabIndicatorRect>(emptyRect);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const tabNodesRef = useRef(new Map<string, HTMLButtonElement>());
  const clearDragListenersRef = useRef<(() => void) | null>(null);

  useEffect(
    () => () => {
      clearDragListenersRef.current?.();
    },
    [],
  );

  const getTabRect = useCallback((value: string): TTabIndicatorRect | null => {
    const tab = tabNodesRef.current.get(value);

    if (tab == null || tab.disabled) {
      return null;
    }

    return {
      width: tab.offsetWidth,
      height: tab.offsetHeight,
      x: tab.offsetLeft,
      y: tab.offsetTop,
    };
  }, []);

  const getActiveRect = useCallback((): TTabIndicatorRect => {
    if (activeValue == null) {
      return emptyRect;
    }

    return getTabRect(activeValue) ?? emptyRect;
  }, [activeValue, getTabRect]);

  const findNearestTab = useCallback(
    (clientX: number, clientY: number) => {
      let nearest: { value: string; distance: number } | null = null;

      for (const [value, node] of tabNodesRef.current) {
        if (node.disabled) {
          continue;
        }

        const rect = node.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance =
          orientation === 'horizontal'
            ? Math.abs(clientX - centerX)
            : Math.abs(clientY - centerY);

        if (nearest == null || distance < nearest.distance) {
          nearest = { value, distance };
        }
      }

      return nearest?.value ?? null;
    },
    [orientation],
  );

  const getDragCenterBounds = useCallback(
    (rect: TTabIndicatorRect) => {
      const tabs = Array.from(tabNodesRef.current.entries()).filter(
        ([, node]) => !node.disabled,
      );

      if (tabs.length === 0) {
        return null;
      }

      const firstRect = getTabRect(tabs[0][0]);
      const lastRect = getTabRect(tabs[tabs.length - 1][0]);

      if (firstRect == null || lastRect == null) {
        return null;
      }

      if (orientation === 'horizontal') {
        return {
          min: firstRect.x + rect.width / 2,
          max: lastRect.x + lastRect.width / 2,
        };
      }

      return {
        min: firstRect.y + rect.height / 2,
        max: lastRect.y + lastRect.height / 2,
      };
    },
    [getTabRect, orientation],
  );

  const updateDragPosition = useCallback(
    (clientX: number, clientY: number) => {
      const start = pointerStartRef.current;
      const startRect = dragStartRectRef.current;

      if (start == null || startRect.width === 0) {
        return;
      }

      const bounds = getDragCenterBounds(startRect);

      if (bounds == null) {
        return;
      }

      const deltaX = clientX - start.x;
      const deltaY = clientY - start.y;
      const startCenterX = startRect.x + startRect.width / 2;
      const startCenterY = startRect.y + startRect.height / 2;

      let centerX = startCenterX;
      let centerY = startCenterY;

      if (orientation === 'horizontal') {
        centerX = clamp(startCenterX + deltaX, bounds.min, bounds.max);
      } else {
        centerY = clamp(startCenterY + deltaY, bounds.min, bounds.max);
      }

      setDragRect({
        width: startRect.width,
        height: startRect.height,
        x: centerX - startRect.width / 2,
        y: centerY - startRect.height / 2,
      });

      setDragHoverValue(findNearestTab(clientX, clientY));
    },
    [findNearestTab, getDragCenterBounds, orientation],
  );

  const updateIndicator = useCallback(() => {
    if (draggingRef.current) {
      return;
    }

    if (activeValue == null) {
      setIndicator(emptyRect);
      return;
    }

    const rect = getTabRect(activeValue);

    if (rect == null) {
      setIndicator(emptyRect);
      return;
    }

    setIndicator(rect);

    if (!readyRef.current) {
      readyRef.current = true;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setReady(true));
      });
    }
  }, [activeValue, getTabRect]);

  const registerTab = useCallback(
    (value: string, node: HTMLButtonElement | null) => {
      if (node != null) {
        tabNodesRef.current.set(value, node);
      } else {
        tabNodesRef.current.delete(value);
      }

      updateIndicator();
    },
    [updateIndicator],
  );

  const endDrag = useCallback(
    (clientX: number, clientY: number) => {
      const didDrag = draggingRef.current;

      pointerStartRef.current = null;

      if (!didDrag) {
        return;
      }

      const target = findNearestTab(clientX, clientY);
      const targetRect = target != null ? getTabRect(target) : null;

      draggingRef.current = false;
      setDragging(false);
      setDragHoverValue(null);

      if (targetRect != null) {
        setDragRect(targetRect);
        onSelect?.(target!);
        window.setTimeout(() => setDragRect(null), 280);
        return;
      }

      setDragRect(null);
    },
    [findNearestTab, getTabRect, onSelect],
  );

  const startIndicatorDrag = useCallback(
    (clientX: number, clientY: number) => {
      if (!draggable) {
        return;
      }

      pointerStartRef.current = { x: clientX, y: clientY };
      clearDragListenersRef.current?.();

      const onPointerMove = (event: PointerEvent) => {
        const start = pointerStartRef.current;

        if (start == null) {
          return;
        }

        const distance = Math.hypot(
          event.clientX - start.x,
          event.clientY - start.y,
        );

        if (!draggingRef.current && distance < DRAG_THRESHOLD) {
          return;
        }

        if (!draggingRef.current) {
          const startRect = getActiveRect();

          if (startRect.width === 0) {
            return;
          }

          draggingRef.current = true;
          dragStartRectRef.current = startRect;
          setDragging(true);
          setDragRect(startRect);
          setDragHoverValue(activeValue ?? findNearestTab(clientX, clientY));
        }

        updateDragPosition(event.clientX, event.clientY);
      };

      const onPointerUp = (event: PointerEvent) => {
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('pointercancel', onPointerUp);
        clearDragListenersRef.current = null;

        const didDrag = draggingRef.current;
        endDrag(event.clientX, event.clientY);

        if (didDrag) {
          event.preventDefault();
        }
      };

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerUp);

      clearDragListenersRef.current = () => {
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('pointercancel', onPointerUp);
        clearDragListenersRef.current = null;
      };
    },
    [activeValue, draggable, endDrag, findNearestTab, getActiveRect, updateDragPosition],
  );

  useLayoutEffect(() => {
    updateIndicator();

    const frame = requestAnimationFrame(updateIndicator);

    return () => cancelAnimationFrame(frame);
  }, [updateIndicator, appearance, orientation, fullWidth]);

  useEffect(() => {
    const container = containerRef.current;

    if (container == null) {
      return undefined;
    }

    const observer = new ResizeObserver(updateIndicator);
    observer.observe(container);

    const activeTab =
      activeValue != null ? tabNodesRef.current.get(activeValue) : null;

    if (activeTab != null) {
      observer.observe(activeTab);
    }

    return () => observer.disconnect();
  }, [activeValue, containerRef, updateIndicator, appearance, orientation, fullWidth]);

  return {
    indicator: dragRect ?? indicator,
    registerTab,
    ready: ready && !dragging,
    dragging,
    dragHoverValue,
    startIndicatorDrag,
  };
};
