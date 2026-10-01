import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { useSidebarItemContext } from '../sidebar-item/context';
import { sidebarItemTrailingClasses } from './classes';
import { SSidebarItemTrailing } from './styles';
import { TSidebarItemTrailingProps } from './types';

const SidebarItemTrailing = forwardRef<
  HTMLDivElement,
  TSidebarItemTrailingProps
>(({ children, show: showProp, className, ...props }, ref) => {
  const item = useSidebarItemContext();
  const show = showProp ?? item?.showTrailing ?? 'always';
  const modes = Array.isArray(show) ? show : [show];

  return (
    <SSidebarItemTrailing
      ref={ref}
      data-show-always={modes.includes('always') ? '' : undefined}
      data-show-hover={modes.includes('hover') ? '' : undefined}
      data-show-active={modes.includes('active') ? '' : undefined}
      {...props}
      className={mergeClasses(sidebarItemTrailingClasses.root, className)}
    >
      {children}
    </SSidebarItemTrailing>
  );
});

SidebarItemTrailing.displayName = 'SidebarItemTrailing';

export type { TSidebarItemTrailingProps } from './types';
export { sidebarItemTrailingClasses } from './classes';
export { SidebarItemTrailing };
export default SidebarItemTrailing;
