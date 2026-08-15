import { HTMLAttributes } from 'react';
import { TPaletteColor, TThemeRadius } from '../../theme/types';

export type TViewportRadius = keyof TThemeRadius;

export type TViewportVariant =
  | 'solid'
  | 'subtle'
  | 'surface'
  | 'outline'
  | 'ghost'
  | 'plain';

export type TViewportProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
  radius?: TViewportRadius;
  color?: TPaletteColor;
  variant?: TViewportVariant;
};
