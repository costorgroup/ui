import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { dockItemClasses } from './classes';
import { SDockItem } from './styles';
import { TDockItemProps } from './types';

const DockItem = forwardRef<HTMLButtonElement, TDockItemProps>(
  ({ children, variant = 'solid', color = 'default', className, ...props }, ref) => (
    <SDockItem
      ref={ref}
      size="xl"
      variant={variant}
      color={color}
      {...props}
      className={mergeClasses(dockItemClasses.root, className)}
    >
      {children}
    </SDockItem>
  ),
);

DockItem.displayName = 'DockItem';

export type { TDockItemProps } from './types';
export { dockItemClasses } from './classes';
export { DockItem };
export default DockItem;
