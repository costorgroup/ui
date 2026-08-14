import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { paginationBaseClasses } from './classes';
import { SPaginationBase } from './styles';
import { TPaginationBaseProps } from './types';

const PaginationBase = forwardRef<HTMLElement, TPaginationBaseProps>(
  ({ children, 'aria-label': ariaLabel = 'pagination navigation', className, ...props }, ref) => {
    return (
      <SPaginationBase ref={ref} aria-label={ariaLabel} {...props}
        className={mergeClasses(
          paginationBaseClasses.root,
          className,
        )}>
        {children}
      </SPaginationBase>
    );
  },
);

PaginationBase.displayName = 'PaginationBase';

export type { TPaginationBaseProps };
export { paginationBaseClasses } from './classes';
export { PaginationBase };
export default PaginationBase;
