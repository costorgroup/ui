import React, { forwardRef } from 'react';
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
export { DrawerBase };
export default DrawerBase;
