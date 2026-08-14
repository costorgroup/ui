import { ReactNode } from 'react';
import type { TInputSize, TInputVariant } from '../input/input-wrapper/types';
import type {
  TInputPinFieldProps,
  TInputPinFieldType,
} from '../input/input-pin-field/types';
import type { TPaletteColor } from '../../theme/types';

export type TPinFieldProps = Omit<
  TInputPinFieldProps,
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

export type { TInputPinFieldType };
