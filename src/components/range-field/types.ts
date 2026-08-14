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

export type TRangeFieldProps = Omit<
  TInputRangeFieldProps,
  'variant' | 'size' | 'color'
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
