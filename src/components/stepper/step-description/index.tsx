import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { stepDescriptionClasses } from './classes';
import { SStepDescription } from './styles';
import { TStepDescriptionProps } from './types';

const StepDescription = forwardRef<HTMLParagraphElement, TStepDescriptionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <SStepDescription
        ref={ref}
        {...props}
        className={mergeClasses(stepDescriptionClasses.root, className)}
      >
        {children}
      </SStepDescription>
    );
  },
);

StepDescription.displayName = 'StepDescription';

export type { TStepDescriptionProps } from './types';
export { stepDescriptionClasses } from './classes';
export { StepDescription };
export default StepDescription;
