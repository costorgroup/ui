import { ReactNode } from 'react';
import type { TInputSize, TInputVariant } from '../input/input-wrapper/types';
import type {
  TInputRangeFieldProps,
  TRangeDirection,
  TRangeRenderValue,
  TRangeRenderValueProps,
  TRangeThumb,
  TRangeTrack,
  TRangeValue,
  TRangeValuePosition,
} from '../input/input-range-field/types';
import type { TPaletteColor } from '../../theme/types';
import type { TFieldSlotProps } from '../form-control/types';
import type { TInputRangeFieldSlotProps } from '../input/input-range-field/types';

export type TRangeSlotProps = TFieldSlotProps<
  Required<TInputRangeFieldSlotProps>
>;

export type TRangeProps = Omit<
  TInputRangeFieldProps,
  'variant' | 'size' | 'color' | 'slotProps'
> & {
  label?: ReactNode;
  description?: ReactNode;
  helperText?: ReactNode;
  required?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  size?: TInputSize;
  variant?: TInputVariant;
  color?: TPaletteColor;
  slotProps?: TRangeSlotProps;
};

export type {
  TRangeDirection,
  TRangeRenderValue,
  TRangeRenderValueProps,
  TRangeThumb,
  TRangeTrack,
  TRangeValue,
  TRangeValuePosition,
};
