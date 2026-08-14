import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { SliderContext } from './context';
import { SSliderBase } from './styles';
import { TSliderHandle, TSliderBaseProps } from './types';

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const wrapIndex = (index: number, length: number) => {
  if (length <= 0) {
    return 0;
  }

  return ((index % length) + length) % length;
};

const assignRef = <T,>(ref: React.Ref<T> | undefined, value: T | null) => {
  if (!ref) {
    return;
  }

  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  (ref as React.MutableRefObject<T | null>).current = value;
};

const SliderBase = forwardRef<HTMLDivElement, TSliderBaseProps>(
  (
    {
      children,
      currentSlide: currentSlideProp,
      defaultSlide = 0,
      onSlideChange,
      autoPlay = false,
      autoPlayInterval = 5000,
      loop = false,
      draggable = false,
      dragThreshold = 0.2,
      transitionMs = 400,
      pauseOnHover = true,
      color = 'primary',
      sliderRef,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref,
  ) => {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const isControlled = currentSlideProp !== undefined;
    const [slideCount, setSlideCount] = useState(0);
    const [uncontrolledSlide, setUncontrolledSlide] = useState(defaultSlide);
    const [offset, setOffset] = useState(0);
    const [viewportWidth, setViewportWidth] = useState(600);
    const [disableTransition, setDisableTransition] = useState(false);
    const [transitioning, setTransitioning] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [hovered, setHovered] = useState(false);
    const settleDeltaRef = useRef(0);
    const settleTimerRef = useRef<number | null>(null);
    const transitioningRef = useRef(false);
    const viewportWidthRef = useRef(0);
    const lastNotified = useRef(defaultSlide);
    const currentSlideRef = useRef(defaultSlide);

    const currentSlide = isControlled
      ? Number(currentSlideProp)
      : uncontrolledSlide;

    currentSlideRef.current = currentSlide;
    viewportWidthRef.current = viewportWidth;

    const clearSettleTimer = useCallback(() => {
      if (settleTimerRef.current == null) {
        return;
      }

      window.clearTimeout(settleTimerRef.current);
      settleTimerRef.current = null;
    }, []);

    const notifyChange = useCallback(
      (index: number) => {
        if (lastNotified.current === index) {
          return;
        }

        lastNotified.current = index;
        onSlideChange?.(index);
      },
      [onSlideChange],
    );

    const commitSlide = useCallback(
      (index: number) => {
        const next = loop
          ? wrapIndex(index, slideCount)
          : clamp(index, 0, Math.max(slideCount - 1, 0));

        if (!isControlled) {
          setUncontrolledSlide(next);
        }

        notifyChange(next);
        return next;
      },
      [isControlled, loop, notifyChange, slideCount],
    );

    useEffect(() => {
      if (slideCount === 0) {
        return;
      }

      lastNotified.current = clamp(
        isControlled ? Number(currentSlideProp) : uncontrolledSlide,
        0,
        slideCount - 1,
      );
    }, [currentSlideProp, isControlled, slideCount, uncontrolledSlide]);

    useEffect(() => {
      if (!isControlled || slideCount === 0 || transitioning || dragging) {
        return;
      }

      const next = clamp(Number(currentSlideProp), 0, slideCount - 1);
      lastNotified.current = next;
      setOffset(0);
    }, [currentSlideProp, dragging, isControlled, slideCount, transitioning]);

    useEffect(() => {
      if (!disableTransition) {
        return;
      }

      const id = requestAnimationFrame(() => {
        setDisableTransition(false);
      });

      return () => cancelAnimationFrame(id);
    }, [disableTransition, offset, currentSlide]);

    useEffect(() => () => clearSettleTimer(), [clearSettleTimer]);

    const shiftBy = useCallback(
      (delta: number) => {
        if (slideCount <= 0 || delta === 0) {
          return currentSlideRef.current;
        }

        if (!loop) {
          return commitSlide(
            clamp(currentSlideRef.current + delta, 0, slideCount - 1),
          );
        }

        return commitSlide(currentSlideRef.current + delta);
      },
      [commitSlide, loop, slideCount],
    );

    const completeSettle = useCallback(
      (delta?: number) => {
        const applied = settleDeltaRef.current || delta || 0;

        clearSettleTimer();

        if (!transitioningRef.current && settleDeltaRef.current === 0) {
          return;
        }

        settleDeltaRef.current = 0;
        transitioningRef.current = false;
        setDisableTransition(true);

        if (applied !== 0) {
          shiftBy(applied);
        }

        setOffset(0);
        setTransitioning(false);
      },
      [clearSettleTimer, shiftBy],
    );

    const beginSettle = useCallback(
      (delta: number) => {
        if (slideCount <= 1 || transitioningRef.current) {
          return;
        }

        if (!loop) {
          const target = currentSlideRef.current + delta;

          if (target < 0 || target > slideCount - 1) {
            return;
          }
        }

        const width = viewportWidthRef.current;

        if (width <= 0) {
          shiftBy(delta);
          setOffset(0);
          return;
        }

        settleDeltaRef.current = delta;
        transitioningRef.current = true;
        setTransitioning(true);
        setDisableTransition(false);

        requestAnimationFrame(() => {
          if (!transitioningRef.current || settleDeltaRef.current !== delta) {
            return;
          }

          setOffset(-delta * viewportWidthRef.current);
          clearSettleTimer();
          settleTimerRef.current = window.setTimeout(() => {
            completeSettle(delta);
          }, transitionMs + 50);
        });
      },
      [
        clearSettleTimer,
        completeSettle,
        loop,
        shiftBy,
        slideCount,
        transitionMs,
      ],
    );

    const setSlide = useCallback(
      (index: number) => {
        if (slideCount === 0 || transitioningRef.current || dragging) {
          return;
        }

        const next = loop
          ? wrapIndex(index, slideCount)
          : clamp(index, 0, slideCount - 1);

        if (next === currentSlideRef.current) {
          return;
        }

        clearSettleTimer();
        setDisableTransition(true);
        commitSlide(next);
        setOffset(0);
        setTransitioning(false);
        transitioningRef.current = false;
        settleDeltaRef.current = 0;
      },
      [clearSettleTimer, commitSlide, dragging, loop, slideCount],
    );

    const nextSlide = useCallback(() => {
      if (dragging) {
        return;
      }

      beginSettle(1);
    }, [beginSettle, dragging]);

    const prevSlide = useCallback(() => {
      if (dragging) {
        return;
      }

      beginSettle(-1);
    }, [beginSettle, dragging]);

    const onTrackTransitionEnd = useCallback(() => {
      completeSettle();
    }, [completeSettle]);

    useEffect(() => {
      if (!autoPlay || slideCount <= 1) {
        return;
      }

      if ((pauseOnHover && hovered) || dragging || transitioning) {
        return;
      }

      const id = window.setInterval(() => {
        nextSlide();
      }, autoPlayInterval);

      return () => window.clearInterval(id);
    }, [
      autoPlay,
      autoPlayInterval,
      dragging,
      hovered,
      nextSlide,
      pauseOnHover,
      slideCount,
      transitioning,
    ]);

    const getHandle = useCallback(
      (): TSliderHandle => ({
        element: rootRef.current,
        nextSlide,
        prevSlide,
        setSlide,
        getCurrentSlide: () => currentSlideRef.current,
      }),
      [nextSlide, prevSlide, setSlide],
    );

    useImperativeHandle(sliderRef, getHandle, [getHandle]);

    const setRootNode = useCallback(
      (node: HTMLDivElement | null) => {
        rootRef.current = node;
        assignRef(ref, node);
        assignRef(sliderRef, getHandle());

        if (node) {
          setViewportWidth(node.clientWidth);
        }
      },
      [getHandle, ref, sliderRef],
    );

    useLayoutEffect(() => {
      const node = rootRef.current;

      if (!node) {
        return;
      }

      const updateWidth = () => {
        setViewportWidth(node.clientWidth);
      };

      updateWidth();

      if (typeof ResizeObserver === 'undefined') {
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
      }

      const observer = new ResizeObserver(updateWidth);
      observer.observe(node);

      return () => observer.disconnect();
    }, [slideCount]);

    const value = useMemo(
      () => ({
        currentSlide:
          slideCount > 0 ? clamp(currentSlide, 0, slideCount - 1) : 0,
        slideCount,
        offset,
        loop,
        draggable,
        dragThreshold,
        dragging,
        setDragging,
        transitioning,
        transitionMs,
        disableTransition,
        color,
        viewportWidth,
        setViewportWidth,
        setSlideCount,
        setOffset,
        shiftBy,
        beginSettle,
        completeSettle,
        setSlide,
        nextSlide,
        prevSlide,
        onTrackTransitionEnd,
      }),
      [
        beginSettle,
        color,
        completeSettle,
        currentSlide,
        disableTransition,
        dragThreshold,
        draggable,
        dragging,
        loop,
        nextSlide,
        offset,
        onTrackTransitionEnd,
        prevSlide,
        setSlide,
        shiftBy,
        slideCount,
        transitionMs,
        transitioning,
        viewportWidth,
      ],
    );

    return (
      <SliderContext.Provider value={value}>
        <SSliderBase
          ref={setRootNode}
          role="region"
          aria-roledescription="carousel"
          onMouseEnter={(event) => {
            setHovered(true);
            onMouseEnter?.(event);
          }}
          onMouseLeave={(event) => {
            setHovered(false);
            onMouseLeave?.(event);
          }}
          {...props}
        >
          {children}
        </SSliderBase>
      </SliderContext.Provider>
    );
  },
);

SliderBase.displayName = 'SliderBase';

export type { TSliderBaseProps, TSliderHandle } from './types';
export { SliderBase };
export default SliderBase;
