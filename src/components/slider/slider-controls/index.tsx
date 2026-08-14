import React, { forwardRef } from 'react';
import { SSliderControls } from './styles';
import { TSliderControlsProps } from './types';

const SliderControls = forwardRef<HTMLDivElement, TSliderControlsProps>(
  ({ children, ...props }, ref) => {
    return (
      <SSliderControls ref={ref} {...props}>
        {children}
      </SSliderControls>
    );
  },
);

SliderControls.displayName = 'SliderControls';

export { SliderControls };
export default SliderControls;
