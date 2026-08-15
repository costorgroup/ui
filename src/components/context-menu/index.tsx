import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { Menu } from '../menu';
import { contextMenuClasses } from './classes';
import { TContextMenuProps } from './types';

const ContextMenu = forwardRef<HTMLDivElement, TContextMenuProps>(
  (
    {
      placement = 'bottom-start',
      offset = 0,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <Menu
        ref={ref}
        placement={placement}
        offset={offset}
        {...props}
        className={mergeClasses(contextMenuClasses.root, className)}
      />
    );
  },
);

ContextMenu.displayName = 'ContextMenu';

export type { TContextMenuProps, TMenuAnchorPosition } from './types';
export { contextMenuClasses } from './classes';
export { ContextMenu };
export default ContextMenu;
