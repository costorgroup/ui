import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { emptyTitleClasses } from './classes';
import { SEmptyTitle } from './styles';
import { TEmptyTitleProps } from './types';

const EmptyTitle = forwardRef<HTMLHeadingElement, TEmptyTitleProps>(
  ({ children, className, ...props }, ref) => (
    <SEmptyTitle
      ref={ref}
      {...props}
      className={mergeClasses(emptyTitleClasses.root, className)}
    >
      {children}
    </SEmptyTitle>
  ),
);

EmptyTitle.displayName = 'EmptyTitle';

export type { TEmptyTitleProps } from './types';
export { emptyTitleClasses } from './classes';
export { EmptyTitle };
export default EmptyTitle;
