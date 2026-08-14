import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { breadcrumbClasses } from './classes';
import { BreadcrumbBase, BreadcrumbList } from './breadcrumb-base';
import { TBreadcrumbProps } from './types';

const Breadcrumb = forwardRef<HTMLElement, TBreadcrumbProps>(
  ({ children, size = 'md', color = 'primary', className, ...props }, ref) => {
    return (
      <BreadcrumbBase ref={ref} size={size} color={color} {...props}
        className={mergeClasses(
          breadcrumbClasses.root,
          className,
        )}>
        <BreadcrumbList>{children}</BreadcrumbList>
      </BreadcrumbBase>
    );
  },
);

Breadcrumb.displayName = 'Breadcrumb';

export type { TBreadcrumbProps, TBreadcrumbSize } from './types';
export { breadcrumbClasses } from './classes';
export { Breadcrumb };
export default Breadcrumb;
