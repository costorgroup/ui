import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { tableRowClasses } from './classes';
import { STableRow } from './styles';
import { TTableRowProps } from './types';

const TableRow = forwardRef<HTMLTableRowElement, TTableRowProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <STableRow ref={ref} {...props}
        className={mergeClasses(
          tableRowClasses.root,
          className,
        )}>
        {children}
      </STableRow>
    );
  },
);

TableRow.displayName = 'TableRow';

export type { TTableRowProps } from './types';
export { tableRowClasses } from './classes';
export { TableRow };
export default TableRow;
