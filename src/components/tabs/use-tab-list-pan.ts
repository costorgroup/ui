import {
  PointerEvent as ReactPointerEvent,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TTabsOrientation } from './context';

const PAN_THRESHOLD = 6;

type TUseTabListPanOptions = {
  orientation: TTabsOrientation;
  skipTarget?: (target: EventTarget | null) => boolean;
};

export const useTabListPan = (
  listRef: RefObject<HTMLDivElement | null>,
  options: TUseTabListPanOptions,
) => {
  const { orientation, skipTarget } = options;
  const [panning, setPanning] = useState(false);
  const pointerIdRef = useRef<number | null>(null);
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const lastRef = useRef<{ x: number; y: number } | null>(null);
  const panningRef = useRef(false);
  const suppressClickRef = useRef(false);
  const clearPointerListenersRef = useRef<(() => void) | null>(null);
  const clearClickListenerRef = useRef<(() => void) | null>(null);

  useEffect(
    () => () => {
      clearPointerListenersRef.current?.();
      clearClickListenerRef.current?.();
    },
    [],
  );

  const canScroll = useCallback(() => {
    const list = listRef.current;

    if (list == null) {
      return false;
    }

    return orientation === 'horizontal'
      ? list.scrollWidth > list.clientWidth + 1
      : list.scrollHeight > list.clientHeight + 1;
  }, [listRef, orientation]);

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.button !== 0 || skipTarget?.(event.target)) {
        return;
      }

      const list = listRef.current;

      if (list == null || !canScroll()) {
        return;
      }

      clearPointerListenersRef.current?.();
      clearClickListenerRef.current?.();
      pointerIdRef.current = event.pointerId;
      startRef.current = { x: event.clientX, y: event.clientY };
      lastRef.current = { x: event.clientX, y: event.clientY };
      panningRef.current = false;
      suppressClickRef.current = false;

      const onPointerMove = (moveEvent: PointerEvent) => {
        if (moveEvent.pointerId !== pointerIdRef.current) {
          return;
        }

        if (moveEvent.buttons === 0) {
          onPointerUp(moveEvent);
          return;
        }

        const start = startRef.current;
        const last = lastRef.current;

        if (start == null || last == null) {
          return;
        }

        const deltaX = moveEvent.clientX - start.x;
        const deltaY = moveEvent.clientY - start.y;
        const distance = Math.hypot(deltaX, deltaY);

        if (!panningRef.current) {
          const along =
            orientation === 'horizontal' ? Math.abs(deltaX) : Math.abs(deltaY);
          const across =
            orientation === 'horizontal' ? Math.abs(deltaY) : Math.abs(deltaX);

          if (distance < PAN_THRESHOLD || along < across) {
            return;
          }

          panningRef.current = true;
          suppressClickRef.current = true;
          setPanning(true);
        }

        moveEvent.preventDefault();

        if (orientation === 'horizontal') {
          list.scrollLeft -= moveEvent.clientX - last.x;
        } else {
          list.scrollTop -= moveEvent.clientY - last.y;
        }

        lastRef.current = { x: moveEvent.clientX, y: moveEvent.clientY };
      };

      const onClickCapture = (clickEvent: MouseEvent) => {
        if (!suppressClickRef.current) {
          return;
        }

        clickEvent.preventDefault();
        clickEvent.stopPropagation();
        suppressClickRef.current = false;
        clearClickListenerRef.current?.();
      };

      const onPointerUp = (upEvent: PointerEvent) => {
        if (upEvent.pointerId !== pointerIdRef.current) {
          return;
        }

        clearPointerListenersRef.current?.();

        if (!suppressClickRef.current) {
          clearClickListenerRef.current?.();
        }

        pointerIdRef.current = null;
        startRef.current = null;
        lastRef.current = null;
        panningRef.current = false;
        setPanning(false);
      };

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerUp);
      window.addEventListener('click', onClickCapture, true);

      clearPointerListenersRef.current = () => {
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('pointercancel', onPointerUp);
        clearPointerListenersRef.current = null;
      };

      clearClickListenerRef.current = () => {
        window.removeEventListener('click', onClickCapture, true);
        clearClickListenerRef.current = null;
      };
    },
    [canScroll, listRef, orientation, skipTarget],
  );

  return {
    panning,
    onPointerDown,
  };
};
