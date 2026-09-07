import { ButtonHTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../../theme/types';
import { TButtonAppearance, TButtonSize, TButtonVariant } from '../button/types';

export type TIconButtonVariant = TButtonVariant;
export type TIconButtonAppearance = TButtonAppearance;
export type TIconButtonSize = TButtonSize;

export type TIconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'color'
> & {
  children?: ReactNode;
  variant?: TIconButtonVariant;
  appearance?: TIconButtonAppearance;
  size?: TIconButtonSize;
  color?: TPaletteColor;
  rounded?: boolean;
};
