import React, { forwardRef } from 'react';
import { SSliderSlide } from './styles';
import { TSliderSlideProps } from './types';

const SliderSlide = forwardRef<HTMLDivElement, TSliderSlideProps>(
  ({ children, ...props }, ref) => {
    return (
      <SSliderSlide ref={ref} role="group" aria-roledescription="slide" {...props}>
        {children}
      </SSliderSlide>
    );
  },
);

SliderSlide.displayName = 'SliderSlide';

export { SliderSlide };
export default SliderSlide;
