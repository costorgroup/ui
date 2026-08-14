import React, { forwardRef } from 'react';
import { SSliderContent } from './styles';
import { TSliderContentProps } from './types';

const SliderContent = forwardRef<HTMLDivElement, TSliderContentProps>(
  ({ children, ...props }, ref) => {
    return (
      <SSliderContent ref={ref} {...props}>
        {children}
      </SSliderContent>
    );
  },
);

SliderContent.displayName = 'SliderContent';

export { SliderContent };
export default SliderContent;
