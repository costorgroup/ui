import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { drawerBaseClasses } from './classes';
import { SDrawerBase } from './styles';
import { TDrawerBaseProps } from './types';

const DrawerBase = forwardRef<HTMLDivElement, TDrawerBaseProps>(
  (
    {
      children,
      size = 'md',
      anchor = 'left',
      scrollable = true,
      role = 'dialog',
      onClick,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <SDrawerBase
        ref={ref}
        size={size}
        scrollable={scrollable}
        anchor={anchor}
        role={role}
        aria-modal="true"
        onClick={(event: React.MouseEvent<HTMLDivElement>) => {
          event.stopPropagation();
          onClick?.(event);
        }}
        {...props}
        className={mergeClasses(
          drawerBaseClasses.root,
          className,
        )}
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
} from './types';
export { drawerBaseClasses } from './classes';
export { DrawerBase };
export default DrawerBase;
