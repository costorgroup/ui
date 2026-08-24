import React, { forwardRef, useContext } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { StepContext, StepperContext } from '../context';
import { stepIndicatorClasses } from './classes';
import { SStepIndicator } from './styles';
import { TStepIndicatorProps } from './types';

const StepIndicator = forwardRef<HTMLDivElement, TStepIndicatorProps>(
  ({ children, className, ...props }, ref) => {
    const stepper = useContext(StepperContext);
    const step = useContext(StepContext);
    if (!stepper || !step) {
      throw new Error('StepIndicator must be used within Stepper > Step');
    }

    const { status, error } = step;

    return (
      <SStepIndicator
        ref={ref}
        status={status}
        variant={stepper.variant}
        error={error}
        {...props}
        className={mergeClasses(
          stepIndicatorClasses.root,
          status === 'complete' && stepIndicatorClasses.complete,
          status === 'active' && stepIndicatorClasses.active,
          status === 'incomplete' && stepIndicatorClasses.incomplete,
          error && stepIndicatorClasses.error,
          className,
        )}
      >
        {children}
      </SStepIndicator>
    );
  },
);

StepIndicator.displayName = 'StepIndicator';

export type { TStepIndicatorProps } from './types';
export { stepIndicatorClasses } from './classes';
export { StepIndicator };
export default StepIndicator;
