import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { Divider } from '../../divider';
import { useSidebarContext } from '../context';
import { sidebarSeparatorClasses } from './classes';
import { SSidebarSeparator } from './styles';
import { TSidebarSeparatorProps } from './types';

const SidebarSeparator = forwardRef<HTMLDivElement, TSidebarSeparatorProps>(
  ({ children, size = 'xs', className, style, ...props }, ref) => {
    const sidebar = useSidebarContext();
    const collapsed = sidebar?.collapsed ?? false;
    // Collapsed has no room for a label: keep it as the accessible name.
    const label =
      collapsed && typeof children === 'string' ? children : undefined;

    return (
      <SSidebarSeparator
        size={sidebar?.size ?? 'md'}
        collapsed={collapsed}
        className={mergeClasses(sidebarSeparatorClasses.root, className)}
        style={style}
      >
        <Divider
          ref={ref}
          size={size}
          aria-label={label}
          {...props}
          className={sidebarSeparatorClasses.divider}
        >
          {collapsed ? null : children}
        </Divider>
      </SSidebarSeparator>
    );
  },
);

SidebarSeparator.displayName = 'SidebarSeparator';

export type { TSidebarSeparatorProps } from './types';
export { sidebarSeparatorClasses } from './classes';
export { SidebarSeparator };
export default SidebarSeparator;
