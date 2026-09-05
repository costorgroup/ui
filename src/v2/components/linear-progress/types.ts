import { HTMLAttributes } from 'react';
import { TPaletteColor } from '../../../theme/types';
import type { TTrackVariant } from '../../track-variant-styles';

export type TLinearProgressVariant = TTrackVariant;

export type TLinearProgressProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
  width?: number | string;
  height?: number | string;
  color?: TPaletteColor;
  variant?: TLinearProgressVariant;
  value?: number;
  max?: number;
  animated?: boolean;
};

export type TSLinearProgressProps = {
  width: number | string;
  height: number | string;
  color: TPaletteColor;
  variant: TLinearProgressVariant;
};

export type TSLinearProgressFillProps = {
  size: string;
};

export type TSLinearProgressGapProps = {
  size: string;
};
