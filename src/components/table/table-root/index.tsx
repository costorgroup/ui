import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { tableClasses } from './classes';
import { TableContext } from './context';
import { STable } from './styles';
import { TTableProps } from './types';

const Table = forwardRef<HTMLTableElement, TTableProps>(
  ({ children, size = 'md', color = 'default', className, ...props }, ref) => {
    return (
      <TableContext.Provider value={{ size, color }}>
        <STable
          ref={ref}
          size={size}
          color={color}
          data-slot="table"
          {...props}
          className={mergeClasses(tableClasses.root, className)}
        >
          {children}
        </STable>
      </TableContext.Provider>
    );
  },
);

Table.displayName = 'Table';

export type { TTableProps } from './types';
export type { TTableSize } from './context';
export { tableClasses } from './classes';
export { Table };
export default Table;
