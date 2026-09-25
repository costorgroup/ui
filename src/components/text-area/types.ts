import { ReactNode, RefAttributes, TextareaHTMLAttributes } from 'react';
import type { TFieldSlotProps } from '../form-control/types';
import type { TInputWrapperProps } from '../input/input-wrapper/types';
import type { TInputSize, TInputVariant } from '../input/input-wrapper/types';
import type { TPaletteColor } from '../../theme/types';

export type TTextAreaSlotProps = TFieldSlotProps<{
  wrapper: TInputWrapperProps;
  input: TextareaHTMLAttributes<HTMLTextAreaElement> &
    RefAttributes<HTMLTextAreaElement>;
}>;

export type TTextAreaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'color' | 'size'
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
  autoGrow?: boolean;
  actionBar?: ReactNode;
  slotProps?: TTextAreaSlotProps;
};
