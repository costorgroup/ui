import { ReactNode } from 'react';
import type { TInputSize, TInputVariant } from '../input/input-wrapper/types';
import type { InputHTMLAttributes, RefAttributes } from 'react';
import type {
  TInputNumberFieldProps,
  TInputNumberFieldSlotProps,
} from '../input/input-number-field/types';
import type { TFieldSlotProps } from '../form-control/types';
import type { TPaletteColor } from '../../theme/types';

export type TNumberFieldSlotProps = TFieldSlotProps<
  Required<TInputNumberFieldSlotProps> & {
    input: InputHTMLAttributes<HTMLInputElement> &
      RefAttributes<HTMLInputElement>;
  }
>;

export type TNumberFieldProps = Omit<
  TInputNumberFieldProps,
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
  slotProps?: TNumberFieldSlotProps;
};
