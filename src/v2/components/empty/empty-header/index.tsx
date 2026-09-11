import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { emptyHeaderClasses } from './classes';
import { SEmptyHeader } from './styles';
import { TEmptyHeaderProps } from './types';

const EmptyHeader = forwardRef<HTMLDivElement, TEmptyHeaderProps>(
  ({ children, className, ...props }, ref) => (
    <SEmptyHeader
      ref={ref}
      {...props}
      className={mergeClasses(emptyHeaderClasses.root, className)}
    >
      {children}
    </SEmptyHeader>
  ),
);

EmptyHeader.displayName = 'EmptyHeader';

export type { TEmptyHeaderProps } from './types';
export { emptyHeaderClasses } from './classes';
export { EmptyHeader };
export default EmptyHeader;
