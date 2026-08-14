import React, { forwardRef } from 'react';
import { STableRow } from './styles';
import { TTableRowProps } from './types';

const TableRow = forwardRef<HTMLTableRowElement, TTableRowProps>(
  ({ children, ...props }, ref) => {
    return (
      <STableRow ref={ref} {...props}>
        {children}
      </STableRow>
    );
  },
);

TableRow.displayName = 'TableRow';

export type { TTableRowProps } from './types';
export { TableRow };
export default TableRow;
