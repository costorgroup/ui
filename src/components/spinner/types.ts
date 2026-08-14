import { HTMLAttributes } from 'react';
import { TPaletteColor } from '../../theme/types';

export type TSpinnerProps = Omit<HTMLAttributes<SVGSVGElement>, 'color' | 'width' | 'height'> & {
  width?: number | string;
  height?: number | string;
  color?: TPaletteColor;
  thickness?: number;
};

export type TSSpinnerProps = {
  color: TPaletteColor;
  thickness: number;
};
