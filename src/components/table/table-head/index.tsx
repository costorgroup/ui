import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { TableSectionContext } from '../table-root/context';
import { tableHeadClasses } from './classes';
import { STableHead } from './styles';
import { TTableHeadProps } from './types';

const TableHead = forwardRef<HTMLTableSectionElement, TTableHeadProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <TableSectionContext.Provider value={{ isHead: true }}>
        <STableHead
          ref={ref}
          data-slot="table-head"
          {...props}
          className={mergeClasses(tableHeadClasses.root, className)}
        >
          {children}
        </STableHead>
      </TableSectionContext.Provider>
    );
  },
);

TableHead.displayName = 'TableHead';

export type { TTableHeadProps } from './types';
export { tableHeadClasses } from './classes';
export { TableHead };
export default TableHead;
