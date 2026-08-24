import React, { forwardRef, useContext } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { StepContext, StepperContext } from '../context';
import { stepContentClasses } from './classes';
import { SStepContent } from './styles';
import { TStepContentProps } from './types';

const StepContent = forwardRef<HTMLDivElement, TStepContentProps>(
  ({ children, className, ...props }, ref) => {
    const stepper = useContext(StepperContext);
    const step = useContext(StepContext);
    if (!stepper || !step) {
      throw new Error('StepContent must be used within Stepper > Step');
    }

    if (stepper.orientation === 'horizontal') {
      return null;
    }

    if (step.status !== 'active') {
      return null;
    }

    return (
      <SStepContent
        ref={ref}
        {...props}
        className={mergeClasses(stepContentClasses.root, className)}
      >
        {children}
      </SStepContent>
    );
  },
);

StepContent.displayName = 'StepContent';

export type { TStepContentProps } from './types';
export { stepContentClasses } from './classes';
export { StepContent };
export default StepContent;
