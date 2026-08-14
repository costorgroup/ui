import React, { forwardRef } from 'react';
import { AppBarBase } from './app-bar-base';
import { AppBarLogo } from './app-bar-logo';
import { AppBarItems } from './app-bar-items';
import { TAppBarProps } from './types';

const AppBar = forwardRef<HTMLElement, TAppBarProps>(
  (
    {
      logo,
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
      <AppBarBase
        ref={ref}
        color={color}
        variant={variant}
        size={size}
        position={position}
        {...props}
      >
        {logo != null ? <AppBarLogo>{logo}</AppBarLogo> : null}
        {children != null ? <AppBarItems>{children}</AppBarItems> : null}
      </AppBarBase>
    );
  },
);

AppBar.displayName = 'AppBar';

export type { TAppBarProps } from './types';
export type {
  TAppBarVariant,
  TAppBarSize,
  TAppBarPosition,
} from './types';
export { AppBar };
export default AppBar;
