import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { TableContext } from './context';
import { tableBaseClasses } from './classes';
import { STableBase } from './styles';
import { TTableBaseProps } from './types';

const TableBase = forwardRef<HTMLTableElement, TTableBaseProps>(
  ({ children, size = 'md', color = 'default', className, ...props }, ref) => {
    return (
      <TableContext.Provider value={{ size, color }}>
        <STableBase
          ref={ref}
          size={size}
          color={color}
          {...props}
          className={mergeClasses(tableBaseClasses.root, className)}
        >
          {children}
        </STableBase>
      </TableContext.Provider>
    );
  },
);

TableBase.displayName = 'TableBase';

export type { TTableBaseProps } from './types';
export type { TTableSize } from './context';
export { tableBaseClasses } from './classes';
export { TableBase };
export default TableBase;
