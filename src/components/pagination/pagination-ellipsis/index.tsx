import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { paginationEllipsisClasses } from './classes';
import { MoreHorizontalIcon } from '../../../icons';
import { SPaginationEllipsis } from './styles';
import { TPaginationEllipsisProps } from './types';

const PaginationEllipsis = forwardRef<HTMLSpanElement, TPaginationEllipsisProps>(
  ({ size = 'md', className, ...props }, ref) => {
    return (
      <SPaginationEllipsis
        ref={ref}
        size={size}
        data-ellipsis=""
        role="presentation"
        aria-hidden="true"
        {...props}
        className={mergeClasses(
          paginationEllipsisClasses.root,
          className,
        )}
      >
        <MoreHorizontalIcon aria-hidden="true" width="1em" height="1em" />
      </SPaginationEllipsis>
    );
  },
);

PaginationEllipsis.displayName = 'PaginationEllipsis';

export type { TPaginationEllipsisProps };
export { paginationEllipsisClasses } from './classes';
export { PaginationEllipsis };
export default PaginationEllipsis;
