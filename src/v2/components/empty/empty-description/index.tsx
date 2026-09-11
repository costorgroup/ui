import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { emptyDescriptionClasses } from './classes';
import { SEmptyDescription } from './styles';
import { TEmptyDescriptionProps } from './types';

const EmptyDescription = forwardRef<HTMLParagraphElement, TEmptyDescriptionProps>(
  ({ children, className, ...props }, ref) => (
    <SEmptyDescription
      ref={ref}
      {...props}
      className={mergeClasses(emptyDescriptionClasses.root, className)}
    >
      {children}
    </SEmptyDescription>
  ),
);

EmptyDescription.displayName = 'EmptyDescription';

export type { TEmptyDescriptionProps } from './types';
export { emptyDescriptionClasses } from './classes';
export { EmptyDescription };
export default EmptyDescription;
