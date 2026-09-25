import React, {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  PointerEvent as ReactPointerEvent,
  UIEvent,
} from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { scrollAreaClasses } from './classes';
import {
  SScrollArea,
  SScrollAreaFade,
  SScrollAreaScrollbar,
  SScrollAreaThumb,
  SScrollAreaViewport,
} from './styles';
import {
  TScrollAreaProps,
  TScrollAreaScrollbarDirection,
  TScrollAreaScrollbarPosition,
  TScrollAreaScrollbarVisibility,
  TScrollAreaScrollbarX,
  TScrollAreaScrollbarY,
} from './types';
import { mergeSlotProps } from '../../helpers/slot-props';

const MIN_THUMB = 24;
const SCROLL_HIDE_MS = 800;

type TMetrics = {
  yOverflow: number;
  xOverflow: number;
  yThumb: number;
  xThumb: number;
  yMax: number;
  xMax: number;
};

const isScrollbarHidden = (visibility: TScrollAreaScrollbarVisibility) =>
  visibility === 'never' || visibility === 'hidden';

const isStartPosition = (position: TScrollAreaScrollbarPosition) =>
  position === 'inverted' || position === 'opposite';

const resolveOrigin = (
  direction: TScrollAreaScrollbarDirection,
  position: TScrollAreaScrollbarPosition,
  rtl: boolean,
) => {
  const start = isStartPosition(position);

  if (direction === 'vertical') {
    if (start) return rtl ? 'right' : 'left';
    return rtl ? 'left' : 'right';
  }

  return start ? 'top' : 'bottom';
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const parseLength = (
  value: number | string | undefined,
  axisSize: number,
  fallback: number,
) => {
  if (value == null) return fallback;
  if (typeof value === 'number') return value;
  if (value.endsWith('%')) {
    const next = Number.parseFloat(value);
    return Number.isFinite(next) ? (axisSize * next) / 100 : fallback;
  }
  const next = Number.parseFloat(value);
  return Number.isFinite(next) ? next : fallback;
};

const ScrollArea = forwardRef<HTMLDivElement, TScrollAreaProps>(
  (
    {
      children,
      fade = true,
      fadeSize,
      fadeReveal,
      scrollbarVisibility = 'hover',
      scrollbarPosition = 'preferred',
      scrollbarDirection = 'vertical',
      className,
      onMouseEnter,
      onMouseLeave,
      onScroll,
      slotProps,
      ...props
    },
    ref,
  ) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const fadeRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const hoverRef = useRef(false);
    const draggingRef = useRef<'x' | 'y' | null>(null);
    const scrollHideRef = useRef<number>(0);
    const metricsRef = useRef<TMetrics>({
      yOverflow: 0,
      xOverflow: 0,
      yThumb: MIN_THUMB,
      xThumb: MIN_THUMB,
      yMax: 0,
      xMax: 0,
    });
    const dragRef = useRef<{
      axis: 'x' | 'y';
      pointerId: number;
      start: number;
      scroll: number;
    } | null>(null);

    const [rtl, setRtl] = useState(false);
    const origin = resolveOrigin(scrollbarDirection, scrollbarPosition, rtl);
    const axis = scrollbarDirection === 'vertical' ? 'y' : 'x';
    const scrollbarHidden = isScrollbarHidden(scrollbarVisibility);

    const setViewportRef = useCallback(
      (node: HTMLDivElement | null) => {
        viewportRef.current = node;

        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    const updateVisible = useCallback(() => {
      const root = rootRef.current;

      if (root == null) return;

      const show =
        !isScrollbarHidden(scrollbarVisibility) &&
        (scrollbarVisibility === 'always' ||
          hoverRef.current ||
          draggingRef.current != null ||
          root.dataset.scrolling === 'true');

      root.dataset.scrollbarVisible = show ? 'true' : 'false';
    }, [scrollbarVisibility]);

    const syncMetrics = useCallback(() => {
      const root = rootRef.current;
      const viewport = viewportRef.current;

      if (root == null || viewport == null) return;

      const yOverflow = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
      const xOverflow = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      const yThumb =
        yOverflow <= 0
          ? viewport.clientHeight
          : Math.max(
              MIN_THUMB,
              (viewport.clientHeight / viewport.scrollHeight) *
                viewport.clientHeight,
            );
      const xThumb =
        xOverflow <= 0
          ? viewport.clientWidth
          : Math.max(
              MIN_THUMB,
              (viewport.clientWidth / viewport.scrollWidth) *
                viewport.clientWidth,
            );
      const yMax = Math.max(0, viewport.clientHeight - yThumb);
      const xMax = Math.max(0, viewport.clientWidth - xThumb);
      const yOffset = yOverflow <= 0 ? 0 : (viewport.scrollTop / yOverflow) * yMax;
      const xOffset =
        xOverflow <= 0 ? 0 : (viewport.scrollLeft / xOverflow) * xMax;

      metricsRef.current = { yOverflow, xOverflow, yThumb, xThumb, yMax, xMax };

      root.style.setProperty('--cui-scroll-thumb-y-size', `${yThumb}px`);
      root.style.setProperty('--cui-scroll-thumb-y-offset', `${yOffset}px`);
      root.style.setProperty('--cui-scroll-thumb-x-size', `${xThumb}px`);
      root.style.setProperty('--cui-scroll-thumb-x-offset', `${xOffset}px`);

      const sizeY = parseLength(
        fadeSize,
        viewport.clientHeight,
        Math.min(viewport.clientHeight * 0.12, 40),
      );
      const sizeX = parseLength(
        fadeSize,
        viewport.clientWidth,
        Math.min(viewport.clientWidth * 0.12, 40),
      );
      const reveal = parseLength(fadeReveal, viewport.clientHeight, 96);
      const yRemain = Math.max(0, yOverflow - viewport.scrollTop);
      const xRemain = Math.max(0, xOverflow - viewport.scrollLeft);
      const fadeT =
        yOverflow > 1 ? sizeY * clamp(viewport.scrollTop / reveal, 0, 1) : 0;
      const fadeB = yOverflow > 1 ? sizeY * clamp(yRemain / reveal, 0, 1) : 0;
      const fadeS =
        xOverflow > 1 ? sizeX * clamp(viewport.scrollLeft / reveal, 0, 1) : 0;
      const fadeE = xOverflow > 1 ? sizeX * clamp(xRemain / reveal, 0, 1) : 0;

      root.style.setProperty('--cui-scroll-fade-t', `${fadeT}px`);
      root.style.setProperty('--cui-scroll-fade-b', `${fadeB}px`);
      root.style.setProperty('--cui-scroll-fade-s', `${fadeS}px`);
      root.style.setProperty('--cui-scroll-fade-e', `${fadeE}px`);

      const canY = yOverflow > 1;
      const canX = xOverflow > 1;
      root.dataset.overflowY = canY ? 'true' : 'false';
      root.dataset.overflowX = canX ? 'true' : 'false';
      if (fadeRef.current != null) {
        fadeRef.current.dataset.overflowY = canY ? 'true' : 'false';
        fadeRef.current.dataset.overflowX = canX ? 'true' : 'false';
      }
      updateVisible();
    }, [fadeReveal, fadeSize, updateVisible]);

    const markScrolling = useCallback(() => {
      const root = rootRef.current;

      if (root == null) return;

      root.dataset.scrolling = 'true';
      window.clearTimeout(scrollHideRef.current);
      scrollHideRef.current = window.setTimeout(() => {
        if (rootRef.current != null) {
          rootRef.current.dataset.scrolling = 'false';
        }
        updateVisible();
      }, SCROLL_HIDE_MS);
      updateVisible();
    }, [updateVisible]);

    useEffect(() => {
      updateVisible();
    }, [updateVisible]);

    useLayoutEffect(() => {
      const root = rootRef.current;

      if (root == null) return;

      setRtl(getComputedStyle(root).direction === 'rtl');
    }, []);

    useEffect(() => {
      const viewport = viewportRef.current;

      if (viewport == null) return undefined;

      syncMetrics();

      const frame = { id: 0 };
      const schedule = () => {
        window.cancelAnimationFrame(frame.id);
        frame.id = window.requestAnimationFrame(syncMetrics);
      };

      const observer = new ResizeObserver(schedule);
      observer.observe(viewport);

      if (viewport.firstElementChild) {
        observer.observe(viewport.firstElementChild);
      }

      return () => {
        window.cancelAnimationFrame(frame.id);
        observer.disconnect();
      };
    }, [syncMetrics, children]);

    useEffect(
      () => () => {
        window.clearTimeout(scrollHideRef.current);
      },
      [],
    );

    const handleScroll = (event: UIEvent<HTMLDivElement>) => {
      syncMetrics();
      markScrolling();
      onScroll?.(event);
    };

    const stopDrag = useCallback(() => {
      draggingRef.current = null;
      dragRef.current = null;
      const thumbs = rootRef.current?.querySelectorAll('[data-dragging="true"]');
      thumbs?.forEach((node) => node.removeAttribute('data-dragging'));
      updateVisible();
    }, [updateVisible]);

    useEffect(() => {
      const onMove = (event: PointerEvent) => {
        const drag = dragRef.current;
        const viewport = viewportRef.current;

        if (drag == null || viewport == null || event.pointerId !== drag.pointerId) {
          return;
        }

        const metrics = metricsRef.current;
        const delta =
          (drag.axis === 'y' ? event.clientY : event.clientX) - drag.start;
        const overflow = drag.axis === 'y' ? metrics.yOverflow : metrics.xOverflow;
        const max = drag.axis === 'y' ? metrics.yMax : metrics.xMax;

        if (max <= 0) return;

        const next = drag.scroll + (delta / max) * overflow;

        if (drag.axis === 'y') {
          viewport.scrollTop = next;
        } else {
          viewport.scrollLeft = next;
        }
      };

      const onUp = (event: PointerEvent) => {
        if (dragRef.current?.pointerId === event.pointerId) {
          stopDrag();
        }
      };

      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
      window.addEventListener('pointercancel', onUp);
      window.addEventListener('blur', stopDrag);

      return () => {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
        window.removeEventListener('pointercancel', onUp);
        window.removeEventListener('blur', stopDrag);
      };
    }, [stopDrag]);

    const handleThumbDown =
      (axis: 'x' | 'y') => (event: ReactPointerEvent<HTMLDivElement>) => {
        if (event.button !== 0) return;

        event.preventDefault();
        event.stopPropagation();
        const viewport = viewportRef.current;

        if (viewport == null) return;

        draggingRef.current = axis;
        event.currentTarget.dataset.dragging = 'true';
        dragRef.current = {
          axis,
          pointerId: event.pointerId,
          start: axis === 'y' ? event.clientY : event.clientX,
          scroll: axis === 'y' ? viewport.scrollTop : viewport.scrollLeft,
        };
        updateVisible();
      };

    const handleTrackDown =
      (axis: 'x' | 'y') => (event: ReactPointerEvent<HTMLDivElement>) => {
        if (event.button !== 0) return;
        if ((event.target as HTMLElement).closest('[data-slot="thumb"]')) {
          return;
        }

        const viewport = viewportRef.current;
        const metrics = metricsRef.current;

        if (viewport == null) return;

        const rect = event.currentTarget.getBoundingClientRect();

        if (axis === 'y') {
          if (metrics.yMax <= 0) return;
          const y = event.clientY - rect.top - metrics.yThumb / 2;
          viewport.scrollTop =
            (clamp(y, 0, metrics.yMax) / metrics.yMax) * metrics.yOverflow;
        } else {
          if (metrics.xMax <= 0) return;
          const x = event.clientX - rect.left - metrics.xThumb / 2;
          viewport.scrollLeft =
            (clamp(x, 0, metrics.xMax) / metrics.xMax) * metrics.xOverflow;
        }
      };

    const showY = !scrollbarHidden && axis === 'y';
    const showX = !scrollbarHidden && axis === 'x';

    return (
      <SScrollArea
        ref={rootRef}
        data-slot="scroll-area"
        data-scrollbar-visibility={scrollbarVisibility}
        data-scrollbar-position={scrollbarPosition}
        data-scrollbar-direction={scrollbarDirection}
        data-scrollbar-y={axis === 'y' ? origin : undefined}
        data-scrollbar-x={axis === 'x' ? origin : undefined}
        {...props}
        className={mergeClasses(scrollAreaClasses.root, className)}
        onMouseEnter={(event) => {
          hoverRef.current = true;
          updateVisible();
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          hoverRef.current = false;
          updateVisible();
          onMouseLeave?.(event);
        }}
      >
        <SScrollAreaFade
          {...mergeSlotProps(
            {
              ref: fadeRef,
              fade,
              'data-slot': 'fade',
              className: scrollAreaClasses.fade,
            },
            slotProps?.fade,
          )}
        >
          <SScrollAreaViewport
            {...mergeSlotProps(
              {
                ref: setViewportRef,
                axis: scrollbarDirection,
                'data-slot': 'viewport',
                className: scrollAreaClasses.viewport,
                onScroll: handleScroll,
              },
              slotProps?.viewport,
            )}
          >
            {children}
          </SScrollAreaViewport>
        </SScrollAreaFade>
        {showY ? (
          <SScrollAreaScrollbar
            {...mergeSlotProps(
              {
                axis: 'y',
                origin: origin as TScrollAreaScrollbarY,
                'data-slot': 'scrollbar',
                className: mergeClasses(
                  scrollAreaClasses.scrollbar,
                  scrollAreaClasses.scrollbarY,
                ),
                onPointerDown: handleTrackDown('y'),
              },
              slotProps?.scrollbar,
            )}
          >
            <SScrollAreaThumb
              {...mergeSlotProps(
                {
                  axis: 'y',
                  'data-slot': 'thumb',
                  className: mergeClasses(
                    scrollAreaClasses.thumb,
                    scrollAreaClasses.thumbY,
                  ),
                  onPointerDown: handleThumbDown('y'),
                },
                slotProps?.thumb,
              )}
            />
          </SScrollAreaScrollbar>
        ) : null}
        {showX ? (
          <SScrollAreaScrollbar
            {...mergeSlotProps(
              {
                axis: 'x',
                origin: origin as TScrollAreaScrollbarX,
                'data-slot': 'scrollbar',
                className: mergeClasses(
                  scrollAreaClasses.scrollbar,
                  scrollAreaClasses.scrollbarX,
                ),
                onPointerDown: handleTrackDown('x'),
              },
              slotProps?.scrollbar,
            )}
          >
            <SScrollAreaThumb
              {...mergeSlotProps(
                {
                  axis: 'x',
                  'data-slot': 'thumb',
                  className: mergeClasses(
                    scrollAreaClasses.thumb,
                    scrollAreaClasses.thumbX,
                  ),
                  onPointerDown: handleThumbDown('x'),
                },
                slotProps?.thumb,
              )}
            />
          </SScrollAreaScrollbar>
        ) : null}
      </SScrollArea>
    );
  },
);

ScrollArea.displayName = 'ScrollArea';

export type {
  TScrollAreaProps,
  TScrollAreaSlotProps,
  TScrollAreaScrollbarVisibility,
  TScrollAreaScrollbarPosition,
  TScrollAreaScrollbarDirection,
  TScrollAreaScrollbarY,
  TScrollAreaScrollbarX,
} from './types';
export { scrollAreaClasses } from './classes';
export { ScrollArea };
export default ScrollArea;
