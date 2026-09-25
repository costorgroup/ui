import { HTMLAttributes, SVGAttributes } from 'react';
import { TPaletteColor } from '../../theme/types';
import type { TTrackVariant } from '../../helpers/variant-styles/track-variant-styles';
import type { TSlotProps } from '../../helpers/slot-props';

export type TCircularProgressVariant = TTrackVariant;

export type TCircularProgressSlotProps = TSlotProps<{
  track: SVGAttributes<SVGPathElement>;
  indicator: SVGAttributes<SVGCircleElement>;
}>;

export type TCircularProgressProps = Omit<
  HTMLAttributes<SVGSVGElement>,
  'color' | 'width' | 'height'
> & {
  width?: number | string;
  height?: number | string;
  color?: TPaletteColor;
  variant?: TCircularProgressVariant;
  thickness?: number;
  slotProps?: TCircularProgressSlotProps;
};

export type TSCircularProgressProps = {
  color: TPaletteColor;
  variant: TCircularProgressVariant;
  thickness: number;
};
