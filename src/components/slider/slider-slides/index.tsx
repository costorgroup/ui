import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { SliderContext } from '../slider-base/context';
import { SSliderSlides } from './styles';
import { TSliderSlidesProps } from './types';

const SliderSlides = forwardRef<HTMLDivElement, TSliderSlidesProps>(
  ({ children, onTransitionEnd, onPointerDown, ...props }, ref) => {
    const slider = useContext(SliderContext);

    if (!slider) {
      throw new Error('SliderSlides must be used within SliderBase');
    }

    const {
      currentSlide,
      offset,
      transitionMs,
      disableTransition,
      loop,
      draggable,
      dragThreshold,
      dragging,
      setDragging,
      transitioning,
      slideCount,
      viewportWidth,
      setSlideCount,
      setOffset,
      shiftBy,
      beginSettle,
      completeSettle,
      onTrackTransitionEnd,
    } = slider;

    const trackRef = useRef<HTMLDivElement | null>(null);
    const dragStartX = useRef(0);
    const dragStartOffset = useRef(0);
    const offsetRef = useRef(offset);
    const pointerIdRef = useRef<number | null>(null);
    const movedRef = useRef(false);
    const pendingDragSettle = useRef(0);

    offsetRef.current = offset;

    const items = useMemo(() => Children.toArray(children), [children]);

    useEffect(() => {
      setSlideCount(items.length);
    }, [items.length, setSlideCount]);

    const slides = useMemo(() => {
      if (items.length === 0) {
        return items;
      }

      if (!loop || items.length === 1) {
        return items.map((child, index) =>
          isValidElement(child)
            ? cloneElement(child, { key: `slide-${index}` })
            : child,
        );
      }

      const count = items.length;
      const indices =
        count === 2
          ? [
              (currentSlide - 1 + count) % count,
              currentSlide,
              (currentSlide + 1) % count,
            ]
          : Array.from(
              { length: count },
              (_, index) => (currentSlide - 1 + index + count) % count,
            );

      const seen = new Map<number, number>();

      return indices.map((slideIndex) => {
        const child = items[slideIndex];
        const occurrence = seen.get(slideIndex) ?? 0;
        seen.set(slideIndex, occurrence + 1);

        if (!isValidElement(child)) {
          return child;
        }

        const key =
          occurrence === 0
            ? `slide-${slideIndex}`
            : `slide-${slideIndex}-dup-${occurrence}`;

        return cloneElement(child, { key });
      });
    }, [currentSlide, items, loop]);

    const baseIndex = loop && items.length > 1 ? 1 : currentSlide;
    const translateX =
      viewportWidth > 0 ? -baseIndex * viewportWidth + offset : 0;

    const assignRefs = useCallback(
      (node: HTMLDivElement | null) => {
        trackRef.current = node;

        if (typeof ref === 'function') {
          ref(node);
          return;
        }

        if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref],
    );

    const normalizeLoopOffset = useCallback(
      (value: number, frameWidth: number) => {
        let next = value;

        while (next <= -frameWidth) {
          next += frameWidth;
          shiftBy(1);
          dragStartOffset.current += frameWidth;
        }

        while (next >= frameWidth) {
          next -= frameWidth;
          shiftBy(-1);
          dragStartOffset.current -= frameWidth;
        }

        return next;
      },
      [shiftBy],
    );

    const endDrag = useCallback(() => {
      if (pointerIdRef.current === null) {
        return;
      }

      const currentOffset = offsetRef.current;
      const frameWidth = viewportWidth;
      const threshold = Math.max(frameWidth * dragThreshold, 24);

      pointerIdRef.current = null;
      setDragging(false);

      if (!movedRef.current || frameWidth === 0) {
        pendingDragSettle.current = 0;
        setOffset(0);
        return;
      }

      if (Math.abs(currentOffset) < threshold) {
        pendingDragSettle.current = 0;
        setOffset(0);
        return;
      }

      if (currentOffset < 0) {
        if (!loop && currentSlide >= slideCount - 1) {
          pendingDragSettle.current = 0;
          setOffset(0);
          return;
        }

        pendingDragSettle.current = 1;
        beginSettle(1);
        return;
      }

      if (!loop && currentSlide <= 0) {
        pendingDragSettle.current = 0;
        setOffset(0);
        return;
      }

      pendingDragSettle.current = -1;
      beginSettle(-1);
    }, [
      beginSettle,
      currentSlide,
      dragThreshold,
      loop,
      setDragging,
      setOffset,
      slideCount,
      viewportWidth,
    ]);

    useEffect(() => {
      if (!draggable) {
        return;
      }

      const handlePointerMove = (event: PointerEvent) => {
        if (pointerIdRef.current !== event.pointerId) {
          return;
        }

        const frameWidth = viewportWidth;
        const raw =
          dragStartOffset.current + (event.clientX - dragStartX.current);

        if (Math.abs(event.clientX - dragStartX.current) > 6) {
          movedRef.current = true;
        }

        if (!frameWidth) {
          setOffset(raw);
          return;
        }

        if (loop && slideCount > 1) {
          setOffset(normalizeLoopOffset(raw, frameWidth));
          return;
        }

        const min = -(slideCount - 1 - currentSlide) * frameWidth;
        const max = currentSlide * frameWidth;
        let next = raw;

        if (next > max) {
          next = max + (next - max) * 0.35;
        } else if (next < min) {
          next = min + (next - min) * 0.35;
        }

        setOffset(next);
      };

      const handlePointerUp = (event: PointerEvent) => {
        if (pointerIdRef.current !== event.pointerId) {
          return;
        }

        endDrag();
      };

      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      window.addEventListener('pointercancel', handlePointerUp);

      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
        window.removeEventListener('pointercancel', handlePointerUp);
      };
    }, [
      currentSlide,
      draggable,
      endDrag,
      loop,
      normalizeLoopOffset,
      setOffset,
      slideCount,
      viewportWidth,
    ]);

    const handlePointerDown = useCallback(
      (event: React.PointerEvent<HTMLDivElement>) => {
        onPointerDown?.(event);

        if (
          !draggable ||
          transitioning ||
          slideCount <= 1 ||
          event.button !== 0 ||
          event.defaultPrevented
        ) {
          return;
        }

        const target = event.target as HTMLElement | null;

        if (
          target?.closest(
            'button, a, input, textarea, select, label, [data-slider-no-drag]',
          )
        ) {
          return;
        }

        pointerIdRef.current = event.pointerId;
        dragStartX.current = event.clientX;
        dragStartOffset.current = offsetRef.current;
        movedRef.current = false;
        pendingDragSettle.current = 0;
        setDragging(true);
      },
      [draggable, onPointerDown, setDragging, slideCount, transitioning],
    );

    useEffect(() => {
      if (!dragging) {
        return;
      }

      const preventClick = (event: MouseEvent) => {
        if (!movedRef.current) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();
      };

      document.addEventListener('click', preventClick, true);

      return () => document.removeEventListener('click', preventClick, true);
    }, [dragging]);

    const handleTransitionEnd = useCallback(
      (event: React.TransitionEvent<HTMLDivElement>) => {
        if (
          event.target !== event.currentTarget ||
          event.propertyName !== 'transform'
        ) {
          onTransitionEnd?.(event);
          return;
        }

        if (pendingDragSettle.current !== 0) {
          const delta = pendingDragSettle.current;
          pendingDragSettle.current = 0;
          completeSettle(delta);
          onTransitionEnd?.(event);
          return;
        }

        onTrackTransitionEnd();
        onTransitionEnd?.(event);
      },
      [completeSettle, onTrackTransitionEnd, onTransitionEnd],
    );

    return (
      <SSliderSlides
        ref={assignRefs}
        translateX={translateX}
        transitionMs={transitionMs}
        disableTransition={
          disableTransition || dragging || viewportWidth === 0
        }
        isDraggable={draggable}
        dragging={dragging}
        onPointerDown={handlePointerDown}
        onTransitionEnd={handleTransitionEnd}
        {...props}
      >
        {slides}
      </SSliderSlides>
    );
  },
);

SliderSlides.displayName = 'SliderSlides';

export { SliderSlides };
export default SliderSlides;
