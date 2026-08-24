import React, { forwardRef, useContext } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { StepContext, TStepContextValue } from '../context';
import { stepStatusClasses } from './classes';
import { SStepStatus } from './styles';
import { TStepStatusProps, TStepStatusRender } from './types';

const resolve = (
  value: TStepStatusRender | undefined,
  ctx: TStepContextValue,
) => {
  if (typeof value === 'function') {
    return value(ctx);
  }
  return value;
};

const StepStatus = forwardRef<HTMLSpanElement, TStepStatusProps>(
  ({ complete, incomplete, active, className, ...props }, ref) => {
    const step = useContext(StepContext);
    if (!step) {
      throw new Error('StepStatus must be used within Step');
    }

    let content;
    if (step.status === 'complete') {
      content = resolve(complete, step);
    } else if (step.status === 'active') {
      content = resolve(active, step);
    } else {
      content = resolve(incomplete, step);
    }

    return (
      <SStepStatus
        ref={ref}
        {...props}
        className={mergeClasses(stepStatusClasses.root, className)}
      >
        {content}
      </SStepStatus>
    );
  },
);

StepStatus.displayName = 'StepStatus';

export type { TStepStatusProps, TStepStatusRender } from './types';
export { stepStatusClasses } from './classes';
export { StepStatus };
export default StepStatus;
