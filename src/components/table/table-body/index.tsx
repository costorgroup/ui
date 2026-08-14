import React, { forwardRef } from 'react';
import { TableSectionContext } from '../table-base/context';
import { STableBody } from './styles';
import { TTableBodyProps } from './types';

const TableBody = forwardRef<HTMLTableSectionElement, TTableBodyProps>(
  ({ children, ...props }, ref) => {
    return (
      <TableSectionContext.Provider value={{ isHead: false }}>
        <STableBody ref={ref} {...props}>
          {children}
        </STableBody>
      </TableSectionContext.Provider>
    );
  },
);

TableBody.displayName = 'TableBody';

export type { TTableBodyProps } from './types';
export { TableBody };
export default TableBody;
