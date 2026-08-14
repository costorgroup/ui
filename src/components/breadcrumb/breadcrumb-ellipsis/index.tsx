import React, { forwardRef } from 'react';
import { MoreHorizontalIcon } from '../../../icons';
import { SBreadcrumbEllipsis } from './styles';
import { TBreadcrumbEllipsisProps } from './types';

const BreadcrumbEllipsis = forwardRef<HTMLSpanElement, TBreadcrumbEllipsisProps>(
  (props, ref) => {
    return (
      <SBreadcrumbEllipsis
        ref={ref}
        data-ellipsis=""
        role="presentation"
        aria-hidden="true"
        {...props}
      >
        <MoreHorizontalIcon aria-hidden="true" />
      </SBreadcrumbEllipsis>
    );
  },
);

BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';

export type { TBreadcrumbEllipsisProps };
export { BreadcrumbEllipsis };
export default BreadcrumbEllipsis;
