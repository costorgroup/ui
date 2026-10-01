import React, {
  Children,
  ElementType,
  forwardRef,
  HTMLAttributes,
  isValidElement,
  ReactNode,
  useMemo,
} from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import type { TPolymorphicComponent } from '../../../helpers/polymorphic';
import { mergeSlotProps } from '../../../helpers/slot-props';
import { useSidebarContext } from '../context';
import { SidebarItemIcon } from '../sidebar-item-icon';
import { SidebarItemTrailing } from '../sidebar-item-trailing';
import { TSidebarShowTrailing } from '../types';
import { sidebarItemClasses } from './classes';
import { SidebarItemContext } from './context';
import {
  SSidebarItem,
  SSidebarItemContent,
  SSidebarItemMain,
  SSidebarItemTrailingGroup,
} from './styles';
import { TSidebarItemOwnProps, TSidebarItemProps } from './types';

// Concrete props for the render function: `TSidebarItemProps<ElementType>`
// carries an index signature that breaks forwardRef inference. Callers are
// typed per `as` through the TPolymorphicComponent cast below.
type TSidebarItemRenderProps = TSidebarItemOwnProps &
  Omit<HTMLAttributes<HTMLElement>, keyof TSidebarItemOwnProps> & {
    as?: ElementType;
  };

// Trailing must render outside the clickable element (a button cannot hold
// buttons, a link cannot hold links), so slots are sorted by type: icons,
// then title/description stacked in the content column, then trailing.
const partitionChildren = (children: ReactNode) => {
  const icons: ReactNode[] = [];
  const content: ReactNode[] = [];
  const trailing: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === SidebarItemIcon) {
      icons.push(child);
    } else if (isValidElement(child) && child.type === SidebarItemTrailing) {
      trailing.push(child);
    } else if (child != null && typeof child !== 'boolean') {
      content.push(child);
    }
  });

  return { icons, content, trailing };
};

const SidebarItem = forwardRef(function SidebarItem(
  {
    as,
    children,
    active = false,
    disabled = false,
    showTrailing: showTrailingProp,
    color: colorProp,
    radius: radiusProp,
    variant: variantProp,
    className,
    style,
    slotProps,
    onClick,
    ...props
  }: TSidebarItemRenderProps,
  ref: React.Ref<Element>,
) {
  const sidebar = useSidebarContext();
  const size = sidebar?.size ?? 'md';
  const color = colorProp ?? sidebar?.color;
  const radius = radiusProp ?? sidebar?.radius ?? 'sm';
  const variant = variantProp ?? sidebar?.variant ?? 'subtle';
  const showTrailing: TSidebarShowTrailing =
    showTrailingProp ?? sidebar?.showTrailing ?? 'always';
  const collapsed = sidebar?.collapsed ?? false;
  const tag = as ?? 'button';
  const isButton = tag === 'button';
  const { icons, content, trailing } = partitionChildren(children);
  // A lone icon (or a collapsed sidebar) makes the item a square cell, so
  // icon-only items line up at identical width and height.
  const iconOnly =
    icons.length > 0 &&
    (collapsed || (content.length === 0 && trailing.length === 0));

  const itemContext = useMemo(() => ({ showTrailing }), [showTrailing]);

  return (
    <SidebarItemContext.Provider value={itemContext}>
      <SSidebarItem
        {...mergeSlotProps(
          {
            size,
            color,
            radius,
            variant,
            'data-active': active ? '' : undefined,
            'data-disabled': disabled ? '' : undefined,
            'data-icon-only': iconOnly ? '' : undefined,
            'data-collapsed': collapsed ? '' : undefined,
            className: mergeClasses(
              sidebarItemClasses.root,
              active && sidebarItemClasses.active,
              disabled && sidebarItemClasses.disabled,
              iconOnly && sidebarItemClasses.iconOnly,
              className,
            ),
            style,
          },
          slotProps?.root,
        )}
      >
        <SSidebarItemMain
          as={tag}
          ref={ref as React.Ref<HTMLButtonElement>}
          type={isButton ? 'button' : undefined}
          aria-current={active ? (isButton ? 'true' : 'page') : undefined}
          aria-disabled={!isButton && disabled ? true : undefined}
          tabIndex={!isButton && disabled ? -1 : undefined}
          {...props}
          color={color}
          disabled={isButton ? disabled : undefined}
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            if (disabled) {
              event.preventDefault();
              return;
            }

            onClick?.(event);
          }}
          className={sidebarItemClasses.main}
        >
          {icons}
          {content.length > 0 && (
            <SSidebarItemContent className={sidebarItemClasses.content}>
              {content}
            </SSidebarItemContent>
          )}
        </SSidebarItemMain>
        {!collapsed && trailing.length > 0 && (
          <SSidebarItemTrailingGroup className={sidebarItemClasses.trailing}>
            {trailing}
          </SSidebarItemTrailingGroup>
        )}
      </SSidebarItem>
    </SidebarItemContext.Provider>
  );
}) as TPolymorphicComponent<'button', TSidebarItemOwnProps>;

SidebarItem.displayName = 'SidebarItem';

export type {
  TSidebarItemProps,
  TSidebarItemOwnProps,
  TSidebarItemSlotProps,
} from './types';
export { sidebarItemClasses } from './classes';
export { SidebarItem };
export default SidebarItem;
