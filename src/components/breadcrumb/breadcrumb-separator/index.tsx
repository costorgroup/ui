import React, { forwardRef } from 'react';
import { ArrowRightIcon } from '../../../icons';
import { SBreadcrumbSeparator } from './styles';
import { TBreadcrumbSeparatorProps } from './types';

const BreadcrumbSeparator = forwardRef<HTMLLIElement, TBreadcrumbSeparatorProps>(
  ({ children, ...props }, ref) => {
    return (
      <SBreadcrumbSeparator
        ref={ref}
        data-separator=""
        aria-hidden="true"
        {...props}
      >
        {children ?? <ArrowRightIcon aria-hidden="true" />}
      </SBreadcrumbSeparator>
    );
  },
);

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

export type { TBreadcrumbSeparatorProps };
export { BreadcrumbSeparator };
export default BreadcrumbSeparator;
