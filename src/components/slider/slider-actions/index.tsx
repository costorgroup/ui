import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { sliderActionsClasses } from './classes';
import { SSliderActions } from './styles';
import { TSliderActionsProps } from './types';

const SliderActions = forwardRef<HTMLDivElement, TSliderActionsProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <SSliderActions ref={ref} {...props}
        className={mergeClasses(
          sliderActionsClasses.root,
          className,
        )}>
        {children}
      </SSliderActions>
    );
  },
);

SliderActions.displayName = 'SliderActions';

export { sliderActionsClasses } from './classes';
export { SliderActions };
export default SliderActions;
