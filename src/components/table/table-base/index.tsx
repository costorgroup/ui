import React, { forwardRef } from 'react';
import { TableContext } from './context';
import { STableBase } from './styles';
import { TTableBaseProps } from './types';

const TableBase = forwardRef<HTMLTableElement, TTableBaseProps>(
  ({ children, size = 'md', color = 'default', ...props }, ref) => {
    return (
      <TableContext.Provider value={{ size, color }}>
        <STableBase ref={ref} size={size} color={color} {...props}>
          {children}
        </STableBase>
      </TableContext.Provider>
    );
  },
);

TableBase.displayName = 'TableBase';

export type { TTableBaseProps } from './types';
export type { TTableSize } from './context';
export { TableBase };
export default TableBase;
