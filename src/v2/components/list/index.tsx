import React, { forwardRef, useMemo } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { listClasses } from './classes';
import { ListContext } from './context';
import { SList } from './styles';
import { TListProps } from './types';

const List = forwardRef<HTMLDivElement, TListProps>(
  (
    {
      children,
      color = 'default',
      variant = 'subtle',
      size = 'md',
      radius = 'md',
      className,
      ...props
    },
    ref,
  ) => {
    const contextValue = useMemo(
      () => ({ color, variant, size }),
      [color, size, variant],
    );

    return (
      <ListContext.Provider value={contextValue}>
        <SList
          ref={ref}
          color={color}
          variant={variant}
          radius={radius}
          {...props}
          className={mergeClasses(listClasses.root, className)}
        >
          {children}
        </SList>
      </ListContext.Provider>
    );
  },
);

List.displayName = 'List';

export type { TListProps, TListSize, TListRadius } from './types';
export type { TListVariant } from './variant-styles';
export { listClasses } from './classes';
export { ListContext, useListContext } from './context';
export { List };
export default List;
