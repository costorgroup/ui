import { InputHTMLAttributes, ReactNode } from 'react';
import type { TInputControlDirection } from '../input/input-base/types';
import type { TInputSize } from '../input/input-wrapper/types';
import type { TInputSwitchVariant } from '../input/input-switch/types';
import type { TPaletteColor } from '../../theme/types';

export type TSwitchDirection = TInputControlDirection;

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
};
