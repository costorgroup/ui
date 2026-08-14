import React, { forwardRef } from 'react';
import { BreadcrumbBase, BreadcrumbList } from './breadcrumb-base';
import { TBreadcrumbProps } from './types';

const Breadcrumb = forwardRef<HTMLElement, TBreadcrumbProps>(
  ({ children, size = 'md', color = 'primary', ...props }, ref) => {
    return (
      <BreadcrumbBase ref={ref} size={size} color={color} {...props}>
        <BreadcrumbList>{children}</BreadcrumbList>
      </BreadcrumbBase>
    );
  },
);

Breadcrumb.displayName = 'Breadcrumb';

export type { TBreadcrumbProps, TBreadcrumbSize } from './types';
export { Breadcrumb };
export default Breadcrumb;
