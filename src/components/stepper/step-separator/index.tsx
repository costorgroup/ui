import React, { forwardRef, useContext } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { StepContext, StepperContext } from '../context';
import { stepSeparatorClasses } from './classes';
import { SStepSeparator } from './styles';
import { TStepSeparatorProps } from './types';

const StepSeparator = forwardRef<HTMLDivElement, TStepSeparatorProps>(
  ({ className, ...props }, ref) => {
    const stepper = useContext(StepperContext);
    const step = useContext(StepContext);
    if (!stepper || !step) {
      throw new Error('StepSeparator must be used within Stepper > Step');
    }

    const orientation = stepper.orientation;
    const status = step.status;

    return (
      <SStepSeparator
        ref={ref}
        orientation={orientation}
        status={status}
        aria-hidden
        {...props}
        className={mergeClasses(
          stepSeparatorClasses.root,
          orientation === 'horizontal'
            ? stepSeparatorClasses.horizontal
            : stepSeparatorClasses.vertical,
          status === 'complete' && stepSeparatorClasses.complete,
          status === 'active' && stepSeparatorClasses.active,
          className,
        )}
      />
    );
  },
);

StepSeparator.displayName = 'StepSeparator';

export type { TStepSeparatorProps } from './types';
export { stepSeparatorClasses } from './classes';
export { StepSeparator };
export default StepSeparator;
