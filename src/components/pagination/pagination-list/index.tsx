import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { paginationListClasses } from './classes';
import { SPaginationList } from './styles';
import { TPaginationListProps } from './types';

const PaginationList = forwardRef<HTMLUListElement, TPaginationListProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <SPaginationList ref={ref} {...props}
        className={mergeClasses(
          paginationListClasses.root,
          className,
        )}>
        {children}
      </SPaginationList>
    );
  },
);

PaginationList.displayName = 'PaginationList';

export type { TPaginationListProps };
export { paginationListClasses } from './classes';
export { PaginationList };
export default PaginationList;
