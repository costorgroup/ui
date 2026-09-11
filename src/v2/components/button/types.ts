import { ButtonHTMLAttributes, ReactNode } from 'react';
import { TPaletteColor, TThemeRadius } from '../../../theme/types';
import type { TAppearance, TInteractiveVariant } from '../../variant-types';

export type TButtonVariant = TInteractiveVariant;
export type TButtonAppearance = TAppearance;
export type TButtonRadius = keyof TThemeRadius;

export type TButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & {
  children?: ReactNode;
  variant?: TButtonVariant;
  appearance?: TButtonAppearance;
  size?: TButtonSize;
  color?: TPaletteColor;
  radius?: TButtonRadius;
};
