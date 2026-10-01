import React, { ElementType, forwardRef, useMemo } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import type { TPolymorphicComponent } from '../../helpers/polymorphic';
import { sidebarClasses } from './classes';
import { SidebarContext } from './context';
import { SSidebar } from './styles';
import { TSidebarOwnProps, TSidebarProps } from './types';

const Sidebar = forwardRef(function Sidebar<C extends ElementType = 'nav'>(
  {
    as,
    children,
    size = 'md',
    color,
    radius = 'sm',
    variant = 'subtle',
    gap,
    padding,
    showTrailing = 'always',
    collapsed = false,
    className,
    ...props
  }: TSidebarProps<C>,
  ref: React.Ref<Element>,
) {
  const contextValue = useMemo(
    () => ({ size, color, radius, variant, showTrailing, collapsed }),
    [size, color, radius, variant, showTrailing, collapsed],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <SSidebar
        as={as ?? 'nav'}
        ref={ref as React.Ref<HTMLElement>}
        size={size}
        gap={gap}
        padding={padding}
        collapsed={collapsed}
        data-collapsed={collapsed ? '' : undefined}
        {...props}
        className={mergeClasses(
          sidebarClasses.root,
          sidebarClasses[size],
          collapsed && sidebarClasses.collapsed,
          className,
        )}
      >
        {children}
      </SSidebar>
    </SidebarContext.Provider>
  );
}) as TPolymorphicComponent<'nav', TSidebarOwnProps>;

Sidebar.displayName = 'Sidebar';

export type {
  TSidebarProps,
  TSidebarOwnProps,
  TSidebarSize,
  TSidebarRadius,
  TSidebarVariant,
  TSidebarSpacing,
  TSidebarShowTrailing,
  TSidebarTrailingVisibility,
} from './types';
export type {
  TSidebarItemProps,
  TSidebarItemOwnProps,
} from './sidebar-item';
export type { TSidebarItemIconProps } from './sidebar-item-icon';
export type { TSidebarItemTitleProps } from './sidebar-item-title';
export type { TSidebarItemDescriptionProps } from './sidebar-item-description';
export type { TSidebarItemTrailingProps } from './sidebar-item-trailing';
export type { TSidebarSeparatorProps } from './sidebar-separator';
export { sidebarClasses } from './classes';
export { SidebarContext, useSidebarContext } from './context';
export { SidebarItem, sidebarItemClasses } from './sidebar-item';
export { SidebarItemIcon, sidebarItemIconClasses } from './sidebar-item-icon';
export { SidebarItemTitle, sidebarItemTitleClasses } from './sidebar-item-title';
export {
  SidebarItemDescription,
  sidebarItemDescriptionClasses,
} from './sidebar-item-description';
export {
  SidebarItemTrailing,
  sidebarItemTrailingClasses,
} from './sidebar-item-trailing';
export {
  SidebarSeparator,
  sidebarSeparatorClasses,
} from './sidebar-separator';
export { Sidebar };
export default Sidebar;
