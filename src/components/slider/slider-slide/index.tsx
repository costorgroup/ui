import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { sliderSlideClasses } from './classes';
import { SSliderSlide } from './styles';
import { TSliderSlideProps } from './types';

const SliderSlide = forwardRef<HTMLDivElement, TSliderSlideProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <SSliderSlide ref={ref} role="group" aria-roledescription="slide" {...props}
        className={mergeClasses(
          sliderSlideClasses.root,
          className,
        )}>
        {children}
      </SSliderSlide>
    );
  },
);

SliderSlide.displayName = 'SliderSlide';

export { sliderSlideClasses } from './classes';
export { SliderSlide };
export default SliderSlide;
