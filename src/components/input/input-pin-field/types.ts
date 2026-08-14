import { HTMLAttributes } from 'react';
import type { TInputSize, TInputVariant } from '../input-wrapper/types';
import type { TPaletteColor } from '../../../theme/types';

export type TInputPinFieldType = 'numeric' | 'alphanumeric' | 'alphabetic';

export type TInputPinFieldProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'color' | 'defaultValue'
> & {
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  type?: TInputPinFieldType;
  pattern?: string;
  mask?: boolean;
  placeholder?: string;
  otp?: boolean;
  name?: string;
  id?: string;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  blurOnComplete?: boolean;
  attached?: boolean;
  variant?: TInputVariant;
  size?: TInputSize;
  color?: TPaletteColor;
};

export type TSInputPinFieldProps = {
  attached?: boolean;
  size?: TInputSize;
};

export type TSInputPinFieldCellProps = {
  variant?: TInputVariant;
  size?: TInputSize;
  color?: TPaletteColor;
  attached?: boolean;
};
