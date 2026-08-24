import React, { forwardRef, useContext } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { StepContext } from '../context';
import { stepNumberClasses } from './classes';
import { SStepNumber } from './styles';
import { TStepNumberProps } from './types';

const StepNumber = forwardRef<HTMLSpanElement, TStepNumberProps>(
  ({ className, children, ...props }, ref) => {
    const step = useContext(StepContext);
    if (!step) {
      throw new Error('StepNumber must be used within Step');
    }

    return (
      <SStepNumber
        ref={ref}
        {...props}
        className={mergeClasses(stepNumberClasses.root, className)}
      >
        {children ?? step.index + 1}
      </SStepNumber>
    );
  },
);

StepNumber.displayName = 'StepNumber';

export type { TStepNumberProps } from './types';
export { stepNumberClasses } from './classes';
export { StepNumber };
export default StepNumber;
