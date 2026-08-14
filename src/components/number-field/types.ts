import { ReactNode } from 'react';
import type { TInputSize, TInputVariant } from '../input/input-wrapper/types';
import type { TInputNumberFieldProps } from '../input/input-number-field/types';
import type { TPaletteColor } from '../../theme/types';

export type TNumberFieldProps = Omit<
  TInputNumberFieldProps,
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
