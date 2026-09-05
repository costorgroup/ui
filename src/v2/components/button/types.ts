import { ButtonHTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../../theme/types';
import type { TInteractiveVariant } from '../../variant-types';

export type TButtonVariant = TInteractiveVariant;

export type TButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & {
  children?: ReactNode;
  variant?: TButtonVariant;
  size?: TButtonSize;
  color?: TPaletteColor;
};
