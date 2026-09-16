import type { Ref } from 'react';
import type { TPaletteColor } from '../../../theme/types';
import type { TSliderHandle } from '../../components/slider/types';

export type TUseSliderOptions = {
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  loop?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  draggable?: boolean;
  dragThreshold?: number;
  transitionMs?: number;
  pauseOnHover?: boolean;
  color?: TPaletteColor;
};

export type TUseSliderSliderProps = {
  currentSlide: number;
  onSlideChange: (index: number) => void;
  onSlideCountChange: (count: number) => void;
  loop: boolean;
  autoPlay: boolean;
  autoPlayInterval: number;
  draggable: boolean;
  dragThreshold: number;
  transitionMs: number;
  pauseOnHover: boolean;
  color: TPaletteColor;
  sliderRef: Ref<TSliderHandle>;
};

export type TUseSliderReturn = {
  page: number;
  currentPage: number;
  pageCount: number;
  previousPage: () => void;
  nextPage: () => void;
  changePage: (page: number) => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  sliderProps: TUseSliderSliderProps;
};
