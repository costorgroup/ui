import React, { forwardRef } from 'react';
import { SBreadcrumbLink } from './styles';
import { TBreadcrumbLinkProps } from './types';

const BreadcrumbLink = forwardRef<HTMLAnchorElement, TBreadcrumbLinkProps>(
  ({ children, ...props }, ref) => {
    return (
      <SBreadcrumbLink ref={ref} {...props}>
        {children}
      </SBreadcrumbLink>
    );
  },
);

BreadcrumbLink.displayName = 'BreadcrumbLink';

export type { TBreadcrumbLinkProps };
export { BreadcrumbLink };
export default BreadcrumbLink;
