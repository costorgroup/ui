import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { tableBodyClasses } from './classes';
import { TableSectionContext } from '../table-base/context';
import { STableBody } from './styles';
import { TTableBodyProps } from './types';

const TableBody = forwardRef<HTMLTableSectionElement, TTableBodyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <TableSectionContext.Provider value={{ isHead: false }}>
        <STableBody ref={ref} {...props}
        className={mergeClasses(
          tableBodyClasses.root,
          className,
        )}>
          {children}
        </STableBody>
      </TableSectionContext.Provider>
    );
  },
);

TableBody.displayName = 'TableBody';

export type { TTableBodyProps } from './types';
export { tableBodyClasses } from './classes';
export { TableBody };
export default TableBody;
