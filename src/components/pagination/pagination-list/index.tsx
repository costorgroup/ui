import React, { forwardRef } from 'react';
import { SPaginationList } from './styles';
import { TPaginationListProps } from './types';

const PaginationList = forwardRef<HTMLUListElement, TPaginationListProps>(
  ({ children, ...props }, ref) => {
    return (
      <SPaginationList ref={ref} {...props}>
        {children}
      </SPaginationList>
    );
  },
);

PaginationList.displayName = 'PaginationList';

export type { TPaginationListProps };
export { PaginationList };
export default PaginationList;
