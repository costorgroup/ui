import { HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import type { TInputSize, TInputVariant } from '../input-wrapper/types';
import type { TPaletteColor } from '../../../theme/types';
import type { TSlotProps } from '../../../helpers/slot-props';

export type TInputPinFieldType = 'numeric' | 'alphanumeric' | 'alphabetic';

export type TInputPinFieldSlotProps = TSlotProps<{
  group: HTMLAttributes<HTMLDivElement>;
  hiddenInput: InputHTMLAttributes<HTMLInputElement>;
  cell: HTMLAttributes<HTMLDivElement>;
  input: InputHTMLAttributes<HTMLInputElement>;
}>;

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
  actionBar?: ReactNode;
  slotProps?: TInputPinFieldSlotProps;
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
