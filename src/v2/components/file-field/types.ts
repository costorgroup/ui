import { ReactNode } from 'react';
import type { TInputSize, TInputVariant } from '../input/input-wrapper/types';
import type { TInputFileFieldProps } from '../input/input-file-field/types';
import type { TPaletteColor } from '../../../theme/types';

export type TFileFieldProps = Omit<
  TInputFileFieldProps,
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
