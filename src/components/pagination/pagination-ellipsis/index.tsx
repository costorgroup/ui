import React, { forwardRef } from 'react';
import { MoreHorizontalIcon } from '../../../icons';
import { SPaginationEllipsis } from './styles';
import { TPaginationEllipsisProps } from './types';

const PaginationEllipsis = forwardRef<HTMLSpanElement, TPaginationEllipsisProps>(
  ({ size = 'md', ...props }, ref) => {
    return (
      <SPaginationEllipsis
        ref={ref}
        size={size}
        data-ellipsis=""
        role="presentation"
        aria-hidden="true"
        {...props}
      >
        <MoreHorizontalIcon aria-hidden="true" width="1em" height="1em" />
      </SPaginationEllipsis>
    );
  },
);

PaginationEllipsis.displayName = 'PaginationEllipsis';

export type { TPaginationEllipsisProps };
export { PaginationEllipsis };
export default PaginationEllipsis;
