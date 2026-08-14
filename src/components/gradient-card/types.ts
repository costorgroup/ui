import { HTMLAttributes, ReactNode } from 'react';
import type { TCardRadius } from '../card/types';
import type { TGap, TPaletteColor } from '../../theme/types';

export type { TCardRadius };

export type TGradientCardProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  radius?: TCardRadius;
  color?: TPaletteColor;
  padding?: TGap;
};

export type TSGradientCardProps = {
  radius: TCardRadius;
  color: TPaletteColor;
  padding: TGap;
};
