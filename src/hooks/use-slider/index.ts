import { useCallback, useMemo, useRef, useState } from 'react';
import type { TSliderHandle } from '../../components/slider/types';
import type {
  TUseSliderOptions,
  TUseSliderReturn,
  TUseSliderSliderProps,
} from './types';

const clampPage = (index: number, count: number, loop: boolean) => {
  if (count <= 0) {
    return Math.max(0, index);
  }

  if (loop) {
    return ((index % count) + count) % count;
  }

  return Math.min(Math.max(index, 0), count - 1);
};

const useSlider = ({
  page: pageProp,
  defaultPage = 0,
  onPageChange,
  loop = false,
  autoPlay = false,
  autoPlayInterval = 5000,
  draggable = false,
  dragThreshold = 0.2,
  transitionMs = 400,
  pauseOnHover = true,
  color = 'inverted',
}: TUseSliderOptions = {}): TUseSliderReturn => {
  const isControlled = pageProp !== undefined;
  const handleRef = useRef<TSliderHandle | null>(null);
  const [uncontrolledPage, setUncontrolledPage] = useState(defaultPage);
  const [pageCount, setPageCount] = useState(0);

  const page = isControlled ? Number(pageProp) : uncontrolledPage;

  const applyPage = useCallback(
    (index: number) => {
      const next = clampPage(index, pageCount, loop);

      if (!isControlled) {
        setUncontrolledPage(next);
      }

      onPageChange?.(next);
      return next;
    },
    [isControlled, loop, onPageChange, pageCount],
  );

  const handleSlideChange = useCallback(
    (index: number) => {
      if (!isControlled) {
        setUncontrolledPage(index);
      }

      onPageChange?.(index);
    },
    [isControlled, onPageChange],
  );

  const previousPage = useCallback(() => {
    if (handleRef.current) {
      handleRef.current.prevSlide();
      return;
    }

    applyPage(page - 1);
  }, [applyPage, page]);

  const nextPage = useCallback(() => {
    if (handleRef.current) {
      handleRef.current.nextSlide();
      return;
    }

    applyPage(page + 1);
  }, [applyPage, page]);

  const changePage = useCallback(
    (index: number) => {
      if (handleRef.current) {
        handleRef.current.setSlide(index);
        return;
      }

      applyPage(index);
    },
    [applyPage],
  );

  const sliderRef = useCallback((handle: TSliderHandle | null) => {
    handleRef.current = handle;
  }, []);

  const sliderProps = useMemo<TUseSliderSliderProps>(
    () => ({
      currentSlide: page,
      onSlideChange: handleSlideChange,
      onSlideCountChange: setPageCount,
      loop,
      autoPlay,
      autoPlayInterval,
      draggable,
      dragThreshold,
      transitionMs,
      pauseOnHover,
      color,
      sliderRef,
    }),
    [
      autoPlay,
      autoPlayInterval,
      color,
      dragThreshold,
      draggable,
      handleSlideChange,
      loop,
      page,
      pauseOnHover,
      sliderRef,
      transitionMs,
    ],
  );

  const canMove = pageCount > 1;
  const canPreviousPage = canMove && (loop || page > 0);
  const canNextPage = canMove && (loop || page < pageCount - 1);

  return {
    page,
    currentPage: page,
    pageCount,
    previousPage,
    nextPage,
    changePage,
    canPreviousPage,
    canNextPage,
    sliderProps,
  };
};

export type {
  TUseSliderOptions,
  TUseSliderReturn,
  TUseSliderSliderProps,
} from './types';
export { useSlider };
export default useSlider;
