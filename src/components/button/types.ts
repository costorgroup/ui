import { ButtonHTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../theme/types';

export type TButtonVariant =
  | 'solid'
  | 'subtle'
  | 'surface'
  | 'outline'
  | 'ghost'
  | 'plain';
export type TButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & {
  children?: ReactNode;
  variant?: TButtonVariant;
  size?: TButtonSize;
  color?: TPaletteColor;
};
