import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { sliderContentClasses } from './classes';
import { SSliderContent } from './styles';
import { TSliderContentProps } from './types';

const SliderContent = forwardRef<HTMLDivElement, TSliderContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <SSliderContent ref={ref} {...props}
        className={mergeClasses(
          sliderContentClasses.root,
          className,
        )}>
        {children}
      </SSliderContent>
    );
  },
);

SliderContent.displayName = 'SliderContent';

export { sliderContentClasses } from './classes';
export { SliderContent };
export default SliderContent;
