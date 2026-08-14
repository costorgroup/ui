import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { sliderControlsClasses } from './classes';
import { SSliderControls } from './styles';
import { TSliderControlsProps } from './types';

const SliderControls = forwardRef<HTMLDivElement, TSliderControlsProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <SSliderControls ref={ref} {...props}
        className={mergeClasses(
          sliderControlsClasses.root,
          className,
        )}>
        {children}
      </SSliderControls>
    );
  },
);

SliderControls.displayName = 'SliderControls';

export { sliderControlsClasses } from './classes';
export { SliderControls };
export default SliderControls;
