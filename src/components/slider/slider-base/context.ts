import { createContext } from 'react';
import type { TPaletteColor } from '../../../theme/types';

export type TSliderContextValue = {
  currentSlide: number;
  slideCount: number;
  offset: number;
  loop: boolean;
  draggable: boolean;
  dragThreshold: number;
  dragging: boolean;
  setDragging: (dragging: boolean) => void;
  transitioning: boolean;
  transitionMs: number;
  disableTransition: boolean;
  color: TPaletteColor;
  viewportWidth: number;
  setViewportWidth: (width: number) => void;
  setSlideCount: (count: number) => void;
  setOffset: (offset: number) => void;
  shiftBy: (delta: number) => void;
  beginSettle: (delta: number) => void;
  completeSettle: (delta?: number) => void;
  setSlide: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  onTrackTransitionEnd: () => void;
};

export const SliderContext = createContext<TSliderContextValue | null>(null);
