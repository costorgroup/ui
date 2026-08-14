import { HTMLAttributes } from 'react';
import { TPaletteColor } from '../../theme/types';

export type TProgressProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
  width?: number | string;
  height?: number | string;
  color?: TPaletteColor;
  value?: number;
  max?: number;
  animated?: boolean;
};

export type TSProgressProps = {
  width: number | string;
  height: number | string;
  color: TPaletteColor;
};

export type TSProgressFillProps = {
  size: string;
};

export type TSProgressGapProps = {
  size: string;
};
