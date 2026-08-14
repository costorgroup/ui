import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { appBarBaseClasses } from './classes';
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
      className,
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
        className={mergeClasses(
          appBarBaseClasses.root,
          className,
        )}
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
export { appBarBaseClasses } from './classes';
export { AppBarBase };
export default AppBarBase;
