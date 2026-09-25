import { InputHTMLAttributes, ReactNode } from 'react';
import type { TInputControlDirection } from '../input/input-base/types';
import type { TInputSize } from '../input/input-wrapper/types';
import type { TInputRadioButtonVariant } from '../input/input-radio-button/types';
import type { TPaletteColor } from '../../theme/types';
import type { TFieldSlotProps } from '../form-control/types';
import type { TInputRadioButtonSlotProps } from '../input/input-radio-button/types';
import type { RefAttributes } from 'react';

export type TRadioButtonDirection = TInputControlDirection;

export type TRadioButtonSlotProps = TFieldSlotProps<
  Required<TInputRadioButtonSlotProps> & {
    input: InputHTMLAttributes<HTMLInputElement> &
      RefAttributes<HTMLInputElement>;
  }
>;

export type TRadioButtonProps<T = unknown> = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'size' | 'type' | 'value'
> & {
  label?: ReactNode;
  description?: ReactNode;
  helperText?: ReactNode;
  error?: boolean;
  fullWidth?: boolean;
  direction?: TRadioButtonDirection;
  size?: TInputSize;
  variant?: TInputRadioButtonVariant;
  color?: TPaletteColor;
  value?: T;
  slotProps?: TRadioButtonSlotProps;
};
