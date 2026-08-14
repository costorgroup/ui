import React, { forwardRef } from 'react';
import { SSliderActions } from './styles';
import { TSliderActionsProps } from './types';

const SliderActions = forwardRef<HTMLDivElement, TSliderActionsProps>(
  ({ children, ...props }, ref) => {
    return (
      <SSliderActions ref={ref} {...props}>
        {children}
      </SSliderActions>
    );
  },
);

SliderActions.displayName = 'SliderActions';

export { SliderActions };
export default SliderActions;
