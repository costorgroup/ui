import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { overlayState, useOverlayOpen } from '../../../motion';
import { drawerBaseClasses } from './classes';
import { SDrawerBase } from './styles';
import { TDrawerBaseProps } from './types';

const DrawerBase = forwardRef<HTMLDivElement, TDrawerBaseProps>(
  (
    {
      children,
      size = 'md',
      anchor = 'left',
      variant = 'surface',
      scrollable = true,
      role = 'dialog',
      onClick,
      className,
      ...props
    },
    ref,
  ) => {
    const open = useOverlayOpen();

    return (
      <SDrawerBase
        ref={ref}
        size={size}
        scrollable={scrollable}
        anchor={anchor}
        variant={variant}
        elevation={1}
        radius="xl"
        role={role}
        aria-modal="true"
        onClick={(event: React.MouseEvent<HTMLDivElement>) => {
          event.stopPropagation();
          onClick?.(event);
        }}
        {...props}
        {...overlayState(open)}
        className={mergeClasses(drawerBaseClasses.root, className)}
      >
        {children}
      </SDrawerBase>
    );
  },
);

DrawerBase.displayName = 'DrawerBase';

export type {
  TDrawerBaseProps,
  TDrawerSize,
  TDrawerAnchor,
  TDrawerVariant,
} from './types';
export { drawerBaseClasses } from './classes';
export { DrawerBase };
export default DrawerBase;
