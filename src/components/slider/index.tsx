import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { sliderClasses } from './classes';
import { SSlider } from './styles';
import { TSliderProps } from './types';

const Slider = forwardRef<HTMLDivElement, TSliderProps>(
  ({ className, ...props }, ref) => (
    <SSlider
      ref={ref}
      data-slot="slider"
      {...props}
      className={mergeClasses(sliderClasses.root, className)}
    />
  ),
);

Slider.displayName = 'Slider';

export type { TSliderProps, TSliderHandle } from './types';
export type {
  TUseSliderOptions,
  TUseSliderReturn,
  TUseSliderSliderProps,
} from '../../hooks/use-slider';
export { sliderClasses } from './classes';
export { useSlider } from '../../hooks/use-slider';
export { SliderSlides } from './slider-slides';
export type { TSliderSlidesProps } from './slider-slides/types';
export { sliderSlidesClasses } from './slider-slides';
export { SliderSlide } from './slider-slide';
export type { TSliderSlideProps } from './slider-slide/types';
export { sliderSlideClasses } from './slider-slide';
export { SlidePermanentContent } from './slide-permanent-content';
export type { TSlidePermanentContentProps } from './slide-permanent-content/types';
export { slidePermanentContentClasses } from './slide-permanent-content';
export { SliderControls } from './slider-controls';
export type { TSliderControlsProps } from './slider-controls/types';
export { sliderControlsClasses } from './slider-controls';
export { SliderControl } from './slider-control';
export type {
  TSliderControlProps,
  TSliderControlDirection,
} from './slider-control/types';
export { sliderControlClasses } from './slider-control';
export { SliderPagination } from './slider-pagination';
export type { TSliderPaginationProps } from './slider-pagination/types';
export { sliderPaginationClasses } from './slider-pagination';
export { Slider };
export default Slider;
