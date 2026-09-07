import { ReactNode, TextareaHTMLAttributes } from 'react';
import type { TInputSize, TInputVariant } from '../input/input-wrapper/types';
import type { TPaletteColor } from '../../../theme/types';

export type TActionFieldProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'color' | 'size' | 'children'
> & {
  children?: ReactNode;
  label?: ReactNode;
  description?: ReactNode;
  helperText?: ReactNode;
  required?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  size?: TInputSize;
  variant?: TInputVariant;
  color?: TPaletteColor;
  autoGrow?: boolean;
};
