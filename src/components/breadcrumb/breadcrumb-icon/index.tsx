import React, { forwardRef } from 'react';
import { SBreadcrumbIcon } from './styles';
import { TBreadcrumbIconProps } from './types';

const BreadcrumbIcon = forwardRef<HTMLSpanElement, TBreadcrumbIconProps>(
  ({ children, ...props }, ref) => {
    return (
      <SBreadcrumbIcon ref={ref} {...props}>
        {children}
      </SBreadcrumbIcon>
    );
  },
);

BreadcrumbIcon.displayName = 'BreadcrumbIcon';

export type { TBreadcrumbIconProps };
export { BreadcrumbIcon };
export default BreadcrumbIcon;
