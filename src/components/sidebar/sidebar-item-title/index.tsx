import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { sidebarItemTitleClasses } from './classes';
import { SSidebarItemTitle } from './styles';
import { TSidebarItemTitleProps } from './types';

const SidebarItemTitle = forwardRef<HTMLSpanElement, TSidebarItemTitleProps>(
  ({ children, className, ...props }, ref) => (
    <SSidebarItemTitle
      ref={ref}
      {...props}
      className={mergeClasses(sidebarItemTitleClasses.root, className)}
    >
      {children}
    </SSidebarItemTitle>
  ),
);

SidebarItemTitle.displayName = 'SidebarItemTitle';

export type { TSidebarItemTitleProps } from './types';
export { sidebarItemTitleClasses } from './classes';
export { SidebarItemTitle };
export default SidebarItemTitle;
