import React, { ElementType, forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { gridClasses } from './classes';
import type { TPolymorphicComponent } from '../../helpers/polymorphic';
import { SGrid } from './styles';
import { TGridOwnProps, TGridProps } from './types';

const Grid = forwardRef(function Grid<C extends ElementType = 'div'>(
  {
    as,
    children,
    columns = 3,
    rows = 'auto',
    templateColumns,
    templateRows,
    gap,
    alignItems,
    justifyItems,
    minChildWidth,
    className, ...props
  }: TGridProps<C>,
  ref: React.Ref<Element>,
) {
  return (
    <SGrid
      as={as}
      ref={ref as React.Ref<HTMLDivElement>}
      columns={columns}
      rows={rows}
      templateColumns={templateColumns}
      templateRows={templateRows}
      gap={gap}
      alignItems={alignItems}
      justifyItems={justifyItems}
      minChildWidth={minChildWidth}
      {...props}
        className={mergeClasses(
          gridClasses.root,
          className,
        )}
    >
      {children}
    </SGrid>
  );
}) as TPolymorphicComponent<'div', TGridOwnProps>;

Grid.displayName = 'Grid';

export type { TGridProps, TGridOwnProps, TGridGap, TGridTrack } from './types';
export { gridClasses } from './classes';
export { Grid };
export default Grid;
