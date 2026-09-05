import { ButtonHTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../../theme/types';
import { TButtonSize, TButtonVariant } from '../button/types';

export type TIconButtonVariant = TButtonVariant;
export type TIconButtonSize = TButtonSize;

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
