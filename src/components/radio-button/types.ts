import { InputHTMLAttributes, ReactNode } from 'react';
import type { TInputControlDirection } from '../input/input-base/types';
import type { TInputSize } from '../input/input-wrapper/types';
import type { TInputRadioButtonVariant } from '../input/input-radio-button/types';
import type { TPaletteColor } from '../../theme/types';

export type TRadioButtonDirection = TInputControlDirection;

export type TRadioButtonProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'size' | 'type'
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
};
