import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { useDockContext } from '../context';
import { dockItemClasses } from './classes';
import { SDockItem } from './styles';
import { TDockItemProps } from './types';

const DockItem = forwardRef<HTMLButtonElement, TDockItemProps>(
  (
    {
      children,
      variant = 'solid',
      color = 'default',
      size: sizeProp,
      active = false,
      className,
      ...props
    },
    ref,
  ) => {
    const dock = useDockContext();
    const size = sizeProp ?? dock?.size ?? 'md';

    return (
      <SDockItem
        ref={ref}
        size={size}
        variant={variant}
        color={color}
        {...props}
        active={active}
        aria-pressed={active || undefined}
        className={mergeClasses(
          dockItemClasses.root,
          active && dockItemClasses.active,
          className,
        )}
      >
        {children}
      </SDockItem>
    );
  },
);

DockItem.displayName = 'DockItem';

export type { TDockItemProps } from './types';
export { dockItemClasses } from './classes';
export { DockItem };
export default DockItem;
