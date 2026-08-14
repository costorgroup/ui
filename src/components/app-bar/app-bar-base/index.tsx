import React, { forwardRef } from 'react';
import { SAppBarBase } from './styles';
import { TAppBarBaseProps } from './types';

const AppBarBase = forwardRef<HTMLElement, TAppBarBaseProps>(
  (
    {
      children,
      color = 'primary',
      variant = 'subtle',
      size = 'md',
      position = 'static',
      ...props
    },
    ref,
  ) => {
    return (
      <SAppBarBase
        ref={ref}
        color={color}
        variant={variant}
        size={size}
        position={position}
        {...props}
      >
        {children}
      </SAppBarBase>
    );
  },
);

AppBarBase.displayName = 'AppBarBase';

export type {
  TAppBarBaseProps,
  TAppBarVariant,
  TAppBarSize,
  TAppBarPosition,
} from './types';
export { AppBarBase };
export default AppBarBase;
