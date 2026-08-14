import { ButtonHTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../theme/types';

export type TIconButtonVariant =
  | 'solid'
  | 'subtle'
  | 'surface'
  | 'outline'
  | 'ghost'
  | 'plain';
export type TIconButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TIconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'color'
> & {
  children?: ReactNode;
  variant?: TIconButtonVariant;
  size?: TIconButtonSize;
  color?: TPaletteColor;
  rounded?: boolean;
};
