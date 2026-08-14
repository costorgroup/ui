import React, { forwardRef } from 'react';
import { SBreadcrumbItem } from './styles';
import { TBreadcrumbItemProps } from './types';

const BreadcrumbItem = forwardRef<HTMLLIElement, TBreadcrumbItemProps>(
  ({ children, ...props }, ref) => {
    return (
      <SBreadcrumbItem ref={ref} {...props}>
        {children}
      </SBreadcrumbItem>
    );
  },
);

BreadcrumbItem.displayName = 'BreadcrumbItem';

export type { TBreadcrumbItemProps };
export { BreadcrumbItem };
export default BreadcrumbItem;
