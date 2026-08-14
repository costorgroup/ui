import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { breadcrumbIconClasses } from './classes';
import { SBreadcrumbIcon } from './styles';
import { TBreadcrumbIconProps } from './types';

const BreadcrumbIcon = forwardRef<HTMLSpanElement, TBreadcrumbIconProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <SBreadcrumbIcon ref={ref} {...props}
        className={mergeClasses(
          breadcrumbIconClasses.root,
          className,
        )}>
        {children}
      </SBreadcrumbIcon>
    );
  },
);

BreadcrumbIcon.displayName = 'BreadcrumbIcon';

export type { TBreadcrumbIconProps };
export { breadcrumbIconClasses } from './classes';
export { BreadcrumbIcon };
export default BreadcrumbIcon;
