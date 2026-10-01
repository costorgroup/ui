import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { sidebarItemIconClasses } from './classes';
import { SSidebarItemIcon } from './styles';
import { TSidebarItemIconProps } from './types';

const SidebarItemIcon = forwardRef<HTMLSpanElement, TSidebarItemIconProps>(
  ({ children, className, ...props }, ref) => (
    <SSidebarItemIcon
      ref={ref}
      {...props}
      className={mergeClasses(sidebarItemIconClasses.root, className)}
    >
      {children}
    </SSidebarItemIcon>
  ),
);

SidebarItemIcon.displayName = 'SidebarItemIcon';

export type { TSidebarItemIconProps } from './types';
export { sidebarItemIconClasses } from './classes';
export { SidebarItemIcon };
export default SidebarItemIcon;
