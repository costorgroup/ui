import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { tableHeadClasses } from './classes';
import { TableSectionContext } from '../table-base/context';
import { STableHead } from './styles';
import { TTableHeadProps } from './types';

const TableHead = forwardRef<HTMLTableSectionElement, TTableHeadProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <TableSectionContext.Provider value={{ isHead: true }}>
        <STableHead ref={ref} {...props}
        className={mergeClasses(
          tableHeadClasses.root,
          className,
        )}>
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
