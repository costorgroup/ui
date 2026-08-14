import { ButtonHTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../theme/types';

export type TChipVariant =
  | 'solid'
  | 'subtle'
  | 'surface'
  | 'outline'
  | 'ghost'
  | 'plain';

export type TChipSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TChipProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & {
  children?: ReactNode;
  variant?: TChipVariant;
  size?: TChipSize;
  color?: TPaletteColor;
  rounded?: boolean;
};
