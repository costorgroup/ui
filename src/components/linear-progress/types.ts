import { HTMLAttributes } from 'react';
import { TPaletteColor } from '../../theme/types';
import type { TTrackVariant } from '../../helpers/variant-styles/track-variant-styles';
import type { TSlotProps } from '../../helpers/slot-props';

export type TLinearProgressVariant = TTrackVariant;

export type TLinearProgressSlotProps = TSlotProps<{
  rail: HTMLAttributes<HTMLDivElement>;
  bar: HTMLAttributes<HTMLDivElement>;
  gap: HTMLAttributes<HTMLDivElement>;
}>;

export type TLinearProgressProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
  width?: number | string;
  height?: number | string;
  color?: TPaletteColor;
  variant?: TLinearProgressVariant;
  value?: number;
  max?: number;
  animated?: boolean;
  slotProps?: TLinearProgressSlotProps;
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
