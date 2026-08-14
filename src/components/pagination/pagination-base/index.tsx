import React, { forwardRef } from 'react';
import { SPaginationBase } from './styles';
import { TPaginationBaseProps } from './types';

const PaginationBase = forwardRef<HTMLElement, TPaginationBaseProps>(
  ({ children, 'aria-label': ariaLabel = 'pagination navigation', ...props }, ref) => {
    return (
      <SPaginationBase ref={ref} aria-label={ariaLabel} {...props}>
        {children}
      </SPaginationBase>
    );
  },
);

PaginationBase.displayName = 'PaginationBase';

export type { TPaginationBaseProps };
export { PaginationBase };
export default PaginationBase;
