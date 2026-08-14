import { HTMLAttributes, ReactNode, Ref } from 'react';
import type { TPaletteColor } from '../../../theme/types';

export type TSliderHandle = {
  element: HTMLDivElement | null;
  nextSlide: () => void;
  prevSlide: () => void;
  setSlide: (index: number) => void;
  getCurrentSlide: () => number;
};

export type TSliderBaseProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'onChange' | 'content' | 'draggable' | 'color'
> & {
  children?: ReactNode;
  currentSlide?: number;
  defaultSlide?: number;
  onSlideChange?: (index: number) => void;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  loop?: boolean;
  draggable?: boolean;
  dragThreshold?: number;
  transitionMs?: number;
  pauseOnHover?: boolean;
  color?: TPaletteColor;
  sliderRef?: Ref<TSliderHandle>;
};

export type TSSliderProps = {
  // reserved for styled props if needed
};
