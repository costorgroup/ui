import { InputHTMLAttributes, ReactNode } from 'react';
import type { TInputControlDirection } from '../input/input-base/types';
import type { TInputSize } from '../input/input-wrapper/types';
import type { TInputSwitchVariant } from '../input/input-switch/types';
import type { TPaletteColor } from '../../theme/types';
import type { TFieldSlotProps } from '../form-control/types';
import type { TInputSwitchSlotProps } from '../input/input-switch/types';
import type { RefAttributes } from 'react';

export type TSwitchDirection = TInputControlDirection;

export type TSwitchSlotProps = TFieldSlotProps<
  Required<TInputSwitchSlotProps> & {
    input: InputHTMLAttributes<HTMLInputElement> &
      RefAttributes<HTMLInputElement>;
  }
>;

export type TSwitchProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'size' | 'type'
> & {
  label?: ReactNode;
  description?: ReactNode;
  helperText?: ReactNode;
  error?: boolean;
  fullWidth?: boolean;
  direction?: TSwitchDirection;
  size?: TInputSize;
  variant?: TInputSwitchVariant;
  color?: TPaletteColor;
  slotProps?: TSwitchSlotProps;
};
