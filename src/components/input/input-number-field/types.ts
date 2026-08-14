import { InputHTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../../theme/types';
import { TInputSize, TInputVariant } from '../input-wrapper/types';

export type TInputNumberFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'size' | 'type'
> & {
  size?: TInputSize;
  variant?: TInputVariant;
  color?: TPaletteColor;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  spinner?: boolean;
  step?: number;
  min?: number;
  max?: number;
};
