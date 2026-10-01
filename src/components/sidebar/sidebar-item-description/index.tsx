import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { sidebarItemDescriptionClasses } from './classes';
import { SSidebarItemDescription } from './styles';
import { TSidebarItemDescriptionProps } from './types';

const SidebarItemDescription = forwardRef<HTMLSpanElement, TSidebarItemDescriptionProps>(
  ({ children, className, ...props }, ref) => (
    <SSidebarItemDescription
      ref={ref}
      {...props}
      className={mergeClasses(sidebarItemDescriptionClasses.root, className)}
    >
      {children}
    </SSidebarItemDescription>
  ),
);

SidebarItemDescription.displayName = 'SidebarItemDescription';

export type { TSidebarItemDescriptionProps } from './types';
export { sidebarItemDescriptionClasses } from './classes';
export { SidebarItemDescription };
export default SidebarItemDescription;
