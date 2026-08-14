import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { breadcrumbEllipsisClasses } from './classes';
import { MoreHorizontalIcon } from '../../../icons';
import { SBreadcrumbEllipsis } from './styles';
import { TBreadcrumbEllipsisProps } from './types';

const BreadcrumbEllipsis = forwardRef<HTMLSpanElement, TBreadcrumbEllipsisProps>(
  ({ className, ...props }, ref) => {
    return (
      <SBreadcrumbEllipsis
        ref={ref}
        data-ellipsis=""
        role="presentation"
        aria-hidden="true"
        {...props}
        className={mergeClasses(
          breadcrumbEllipsisClasses.root,
          className,
        )}
      >
        <MoreHorizontalIcon aria-hidden="true" />
      </SBreadcrumbEllipsis>
    );
  },
);

BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';

export type { TBreadcrumbEllipsisProps };
export { breadcrumbEllipsisClasses } from './classes';
export { BreadcrumbEllipsis };
export default BreadcrumbEllipsis;
