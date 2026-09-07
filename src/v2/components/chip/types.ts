import { ButtonHTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../../theme/types';
import type { TAppearance, TInteractiveVariant } from '../../variant-types';

export type TChipVariant = TInteractiveVariant;
export type TChipAppearance = TAppearance;

export type TChipSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TChipProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & {
  children?: ReactNode;
  variant?: TChipVariant;
  appearance?: TChipAppearance;
  size?: TChipSize;
  color?: TPaletteColor;
  rounded?: boolean;
};
