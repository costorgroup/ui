import React, { ElementType, forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { gridCellClasses } from './classes';
import type { TPolymorphicComponent } from '../../helpers/polymorphic';
import { SGridCell } from './styles';
import { TGridCellOwnProps, TGridCellProps } from './types';

const GridCell = forwardRef(function GridCell<C extends ElementType = 'div'>(
  {
    as,
    children,
    colSpan = 1,
    rowSpan = 1,
    alignSelf,
    justifySelf,
    className, ...props
  }: TGridCellProps<C>,
  ref: React.Ref<Element>,
) {
  return (
    <SGridCell
      as={as}
      ref={ref as React.Ref<HTMLDivElement>}
      colSpan={colSpan}
      rowSpan={rowSpan}
      alignSelf={alignSelf}
      justifySelf={justifySelf}
      {...props}
        className={mergeClasses(
          gridCellClasses.root,
          className,
        )}
    >
      {children}
    </SGridCell>
  );
}) as TPolymorphicComponent<'div', TGridCellOwnProps>;

GridCell.displayName = 'GridCell';

export type { TGridCellProps, TGridCellOwnProps } from './types';
export { gridCellClasses } from './classes';
export { GridCell };
export default GridCell;
