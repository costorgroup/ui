import React, { forwardRef } from 'react';
import { TableSectionContext } from '../table-base/context';
import { STableHead } from './styles';
import { TTableHeadProps } from './types';

const TableHead = forwardRef<HTMLTableSectionElement, TTableHeadProps>(
  ({ children, ...props }, ref) => {
    return (
      <TableSectionContext.Provider value={{ isHead: true }}>
        <STableHead ref={ref} {...props}>
          {children}
        </STableHead>
      </TableSectionContext.Provider>
    );
  },
);

TableHead.displayName = 'TableHead';

export type { TTableHeadProps } from './types';
export { TableHead };
export default TableHead;
