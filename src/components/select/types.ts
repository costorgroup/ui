import { ReactNode } from 'react';
import type { TInputSelectProps } from '../input/input-select/types';
import type { TInputSize, TInputVariant } from '../input/input-wrapper/types';
import type { TPaletteColor } from '../../theme/types';

export type TSelectProps = Omit<
  TInputSelectProps,
  'color' | 'size' | 'variant'
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
