import { InputHTMLAttributes, ReactNode } from 'react';
import type { TInputControlDirection } from '../input/input-base/types';
import type { TInputSize } from '../input/input-wrapper/types';
import type { TInputCheckBoxVariant } from '../input/input-check-box/types';
import type { TPaletteColor } from '../../theme/types';
import type { TFieldSlotProps } from '../form-control/types';
import type { TInputCheckBoxSlotProps } from '../input/input-check-box/types';
import type { RefAttributes } from 'react';

export type TCheckBoxDirection = TInputControlDirection;

export type TCheckBoxSlotProps = TFieldSlotProps<
  Required<TInputCheckBoxSlotProps> & {
    input: InputHTMLAttributes<HTMLInputElement> &
      RefAttributes<HTMLInputElement>;
  }
>;

export type TCheckBoxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'size' | 'type'
> & {
  label?: ReactNode;
  description?: ReactNode;
  helperText?: ReactNode;
  error?: boolean;
  fullWidth?: boolean;
  direction?: TCheckBoxDirection;
  size?: TInputSize;
  variant?: TInputCheckBoxVariant;
  color?: TPaletteColor;
  slotProps?: TCheckBoxSlotProps;
};
