import { HTMLAttributes, ReactNode } from 'react';
import type { TPaletteColor } from '../../theme/types';
import type { TInputFieldDirection } from '../input/input-base/types';
import type { TInputSize, TInputVariant } from '../input/input-wrapper/types';

export type TFormControlChangeHandler<T> = (
  event: unknown,
  value: T,
) => void;

export type TFormControlProps<T = unknown> = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color' | 'onChange' | 'defaultValue'
> & {
  children?: ReactNode;
  label?: ReactNode;
  description?: ReactNode;
  helperText?: ReactNode;
  direction?: TInputFieldDirection;
  value?: T;
  defaultValue?: T;
  onChange?: TFormControlChangeHandler<T>;
  isValueEqual?: (a: T, b: T) => boolean;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  focused?: boolean;
  fullWidth?: boolean;
  size?: TInputSize;
  color?: TPaletteColor;
  variant?: TInputVariant;
};
