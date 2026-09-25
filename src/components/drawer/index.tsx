import React, {
  forwardRef,
  HTMLAttributes,
  isValidElement,
  ReactNode,
} from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { Portal } from '../portal';
import { Backdrop } from '../backdrop';
import type { TBackdropAlign, TBackdropJustify } from '../backdrop/types';
import { drawerClasses } from './classes';
import { DrawerActions } from './drawer-actions';
import { DrawerBase } from './drawer-base';
import { DrawerBody } from './drawer-body';
import { DrawerDescription } from './drawer-description';
import { DrawerHeader } from './drawer-header';
import { DrawerHeaderActions } from './drawer-header-actions';
import { DrawerTitle } from './drawer-title';
import { TDrawerAnchor, TDrawerProps } from './types';
import { mergeSlotProps } from '../../helpers/slot-props';

const wrapSlot = (
  value: ReactNode,
  Slot: typeof DrawerTitle | typeof DrawerDescription,
  slotProps?: Omit<HTMLAttributes<HTMLElement>, 'color'>,
) => {
  if (value == null) {
    return null;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return <Slot {...slotProps}>{value}</Slot>;
  }

  if (isValidElement(value)) {
    return value;
  }

  return <Slot {...slotProps}>{value}</Slot>;
};

const backdropAlign = (
  anchor: TDrawerAnchor,
  scrollable: boolean,
): TBackdropAlign => {
  if (anchor === 'top') return 'start';
  if (anchor === 'bottom') return 'end';
  return scrollable ? 'stretch' : 'start';
};

const backdropJustify = (anchor: TDrawerAnchor): TBackdropJustify => {
  if (anchor === 'left') return 'start';
  if (anchor === 'right') return 'end';
  return 'stretch';
};

const Drawer = forwardRef<HTMLDivElement, TDrawerProps>(
  (
    {
      children,
      title,
      description,
      headerActions,
      actions,
      size = 'md',
      anchor = 'left',
      variant = 'surface',
      scrollable = true,
      open = true,
      onClose,
      className,
      slotProps,
      ...props
    },
    ref,
  ) => (
    <Portal>
      <Backdrop
        {...mergeSlotProps(
          {
            scrollable,
            align: backdropAlign(anchor, scrollable),
            justify: backdropJustify(anchor),
            layer: 'drawer',
            lockScroll: true,
            open,
            onClose,
          },
          slotProps?.backdrop,
        )}
      >
        <DrawerBase
          ref={ref}
          size={size}
          scrollable={scrollable}
          anchor={anchor}
          variant={variant}
          {...props}
          className={mergeClasses(drawerClasses.root, className)}
        >
          {title != null || description != null || headerActions != null ? (
            <DrawerHeader {...slotProps?.header}>
              {wrapSlot(title, DrawerTitle, slotProps?.title)}
              {wrapSlot(description, DrawerDescription, slotProps?.description)}
              {headerActions != null ? (
                <DrawerHeaderActions {...slotProps?.headerActions}>
                  {headerActions}
                </DrawerHeaderActions>
              ) : null}
            </DrawerHeader>
          ) : null}
          {children != null ? (
            <DrawerBody
              {...mergeSlotProps(
                {
                  scrollable,
                },
                slotProps?.body,
              )}
            >{children}</DrawerBody>
          ) : null}
          {actions != null ? (
            <DrawerActions {...slotProps?.actions}>{actions}</DrawerActions>
          ) : null}
        </DrawerBase>
      </Backdrop>
    </Portal>
  ),
);

Drawer.displayName = 'Drawer';

export type {
  TDrawerProps,
  TDrawerSlotProps,
  TDrawerSize,
  TDrawerAnchor,
  TDrawerVariant,
} from './types';
export { drawerClasses } from './classes';
export { DrawerBase, drawerBaseClasses } from './drawer-base';
export type { TDrawerBaseProps } from './drawer-base';
export { DrawerHeader, drawerHeaderClasses } from './drawer-header';
export type { TDrawerHeaderProps } from './drawer-header';
export {
  DrawerHeaderActions,
  drawerHeaderActionsClasses,
} from './drawer-header-actions';
export type { TDrawerHeaderActionsProps } from './drawer-header-actions';
export { DrawerBody, drawerBodyClasses } from './drawer-body';
export type { TDrawerBodyProps } from './drawer-body';
export { DrawerActions, drawerActionsClasses } from './drawer-actions';
export type { TDrawerActionsProps } from './drawer-actions';
export { DrawerTitle, drawerTitleClasses } from './drawer-title';
export type {
  TDrawerTitleProps,
  TDrawerTitleOwnProps,
  TDrawerTitleAs,
} from './drawer-title';
export { DrawerDescription, drawerDescriptionClasses } from './drawer-description';
export type { TDrawerDescriptionProps } from './drawer-description';
export { Drawer };
export default Drawer;
