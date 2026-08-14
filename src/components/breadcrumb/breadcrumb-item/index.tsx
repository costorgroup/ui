import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { breadcrumbItemClasses } from './classes';
import { SBreadcrumbItem } from './styles';
import { TBreadcrumbItemProps } from './types';

const BreadcrumbItem = forwardRef<HTMLLIElement, TBreadcrumbItemProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <SBreadcrumbItem ref={ref} {...props}
        className={mergeClasses(
          breadcrumbItemClasses.root,
          className,
        )}>
        {children}
      </SBreadcrumbItem>
    );
  },
);

BreadcrumbItem.displayName = 'BreadcrumbItem';

export type { TBreadcrumbItemProps };
export { breadcrumbItemClasses } from './classes';
export { BreadcrumbItem };
export default BreadcrumbItem;
