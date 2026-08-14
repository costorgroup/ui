import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { breadcrumbLinkClasses } from './classes';
import { SBreadcrumbLink } from './styles';
import { TBreadcrumbLinkProps } from './types';

const BreadcrumbLink = forwardRef<HTMLAnchorElement, TBreadcrumbLinkProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <SBreadcrumbLink ref={ref} {...props}
        className={mergeClasses(
          breadcrumbLinkClasses.root,
          className,
        )}>
        {children}
      </SBreadcrumbLink>
    );
  },
);

BreadcrumbLink.displayName = 'BreadcrumbLink';

export type { TBreadcrumbLinkProps };
export { breadcrumbLinkClasses } from './classes';
export { BreadcrumbLink };
export default BreadcrumbLink;
