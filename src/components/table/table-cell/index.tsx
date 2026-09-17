import React, { forwardRef, useContext } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { TableSectionContext } from '../table-root/context';
import { tableCellClasses } from './classes';
import { STableCell } from './styles';
import { TTableCellProps } from './types';

const TableCell = forwardRef<HTMLTableCellElement, TTableCellProps>(
  ({ children, as: asProp, align = 'left', scope, className, ...props }, ref) => {
    const section = useContext(TableSectionContext);
    const as = asProp ?? (section?.isHead ? 'th' : 'td');
    const resolvedScope = as === 'th' ? scope ?? 'col' : scope;

    return (
      <STableCell
        ref={ref}
        as={as}
        align={align}
        scope={resolvedScope}
        data-slot="table-cell"
        {...props}
        className={mergeClasses(tableCellClasses.root, className)}
      >
        {children}
      </STableCell>
    );
  },
);

TableCell.displayName = 'TableCell';

export type { TTableCellProps, TTableCellAs, TTableCellAlign } from './types';
export { tableCellClasses } from './classes';
export { TableCell };
export default TableCell;
