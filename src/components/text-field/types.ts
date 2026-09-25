import { InputHTMLAttributes, ReactNode, RefAttributes } from 'react';
import type { TFieldSlotProps } from '../form-control/types';
import type { TInputIconProps } from '../input/input-icon/types';
import type { TInputWrapperProps } from '../input/input-wrapper/types';
import type { TInputSize, TInputVariant } from '../input/input-wrapper/types';
import type { TPaletteColor } from '../../theme/types';

export type TTextFieldSlotProps = TFieldSlotProps<{
  wrapper: TInputWrapperProps;
  input: InputHTMLAttributes<HTMLInputElement> &
    RefAttributes<HTMLInputElement>;
  startIcon: TInputIconProps;
  endIcon: TInputIconProps;
}>;

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
  actionBar?: ReactNode;
  slotProps?: TTextFieldSlotProps;
};
