import { InputHTMLAttributes, ReactNode } from 'react';
import type { TInputSize, TInputVariant } from '../input/input-wrapper/types';
import type { TPaletteColor } from '../../theme/types';

export type TTextFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'color'
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
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};
