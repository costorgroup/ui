import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../../theme/types';

export type TAppBarVariant =
  | 'solid'
  | 'subtle'
  | 'surface'
  | 'outline'
  | 'ghost'
  | 'plain';

export type TAppBarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TAppBarPosition = 'static' | 'sticky' | 'fixed';

export type TAppBarBaseProps = Omit<
  HTMLAttributes<HTMLElement>,
  'color' | 'children'
> & {
  children?: ReactNode;
  color?: TPaletteColor;
  variant?: TAppBarVariant;
  size?: TAppBarSize;
  position?: TAppBarPosition;
};

export type TSAppBarBaseProps = {
  color: TPaletteColor;
  variant: TAppBarVariant;
  size: TAppBarSize;
  position: TAppBarPosition;
};
