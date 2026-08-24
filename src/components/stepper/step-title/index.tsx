import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { stepTitleClasses } from './classes';
import { SStepTitle } from './styles';
import { TStepTitleProps } from './types';

const StepTitle = forwardRef<HTMLParagraphElement, TStepTitleProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <SStepTitle
        ref={ref}
        {...props}
        className={mergeClasses(stepTitleClasses.root, className)}
      >
        {children}
      </SStepTitle>
    );
  },
);

StepTitle.displayName = 'StepTitle';

export type { TStepTitleProps } from './types';
export { stepTitleClasses } from './classes';
export { StepTitle };
export default StepTitle;
