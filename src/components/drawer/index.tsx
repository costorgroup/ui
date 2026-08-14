import React, { forwardRef } from 'react';
import { Backdrop } from '../backdrop';
import type { TBackdropAlign, TBackdropJustify } from '../backdrop/types';
import { Portal } from '../portal';
import { DrawerBase } from './drawer-base';
import { DrawerHead } from './drawer-head';
import { DrawerBody } from './drawer-body';
import { DrawerActions } from './drawer-actions';
import { TDrawerAnchor, TDrawerProps } from './types';

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
      actions,
      size = 'md',
      anchor = 'left',
      scrollable = true,
      onClose,
      ...props
    },
    ref,
  ) => {
    return (
      <Portal>
        <Backdrop
          scrollable={scrollable}
          align={backdropAlign(anchor, scrollable)}
          justify={backdropJustify(anchor)}
          layer="drawer"
          lockScroll
          onClose={onClose}
        >
          <DrawerBase
            ref={ref}
            size={size}
            scrollable={scrollable}
            anchor={anchor}
            {...props}
          >
            {title != null ? <DrawerHead>{title}</DrawerHead> : null}
            {children != null ? (
              <DrawerBody scrollable={scrollable}>{children}</DrawerBody>
            ) : null}
            {actions != null ? <DrawerActions>{actions}</DrawerActions> : null}
          </DrawerBase>
        </Backdrop>
      </Portal>
    );
  },
);

Drawer.displayName = 'Drawer';

export type { TDrawerProps, TDrawerSize, TDrawerAnchor } from './types';
export { Drawer };
export default Drawer;
