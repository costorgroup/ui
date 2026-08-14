import { ReactNode } from 'react';
import type { TInputAutoCompleteProps } from '../input/input-auto-complete/types';
import type { TInputSize, TInputVariant } from '../input/input-wrapper/types';
import type { TPaletteColor } from '../../theme/types';

export type TAutoCompleteProps = Omit<
  TInputAutoCompleteProps,
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
