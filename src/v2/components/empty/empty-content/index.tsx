import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { emptyContentClasses } from './classes';
import { SEmptyContent } from './styles';
import { TEmptyContentProps } from './types';

const EmptyContent = forwardRef<HTMLDivElement, TEmptyContentProps>(
  ({ children, className, ...props }, ref) => (
    <SEmptyContent
      ref={ref}
      {...props}
      className={mergeClasses(emptyContentClasses.root, className)}
    >
      {children}
    </SEmptyContent>
  ),
);

EmptyContent.displayName = 'EmptyContent';

export type { TEmptyContentProps } from './types';
export { emptyContentClasses } from './classes';
export { EmptyContent };
export default EmptyContent;
