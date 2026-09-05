import { HTMLAttributes } from 'react';
import { TPaletteColor } from '../../../theme/types';
import type { TTrackVariant } from '../../track-variant-styles';

export type TCircularProgressVariant = TTrackVariant;

export type TCircularProgressProps = Omit<
  HTMLAttributes<SVGSVGElement>,
  'color' | 'width' | 'height'
> & {
  width?: number | string;
  height?: number | string;
  color?: TPaletteColor;
  variant?: TCircularProgressVariant;
  thickness?: number;
};

export type TSCircularProgressProps = {
  color: TPaletteColor;
  variant: TCircularProgressVariant;
  thickness: number;
};
