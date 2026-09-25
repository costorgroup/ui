import { HTMLAttributes, InputHTMLAttributes } from 'react';
import { TPaletteColor } from '../../../theme/types';
import { TInputSize, TInputVariant } from '../input-wrapper/types';
import type { TSlotProps } from '../../../helpers/slot-props';

export type TInputCheckBoxVariant = TInputVariant;

export type TInputCheckBoxSlotProps = TSlotProps<{
  container: HTMLAttributes<HTMLSpanElement>;
  control: HTMLAttributes<HTMLSpanElement>;
}>;

export type TInputCheckBoxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'size' | 'type'
> & {
  variant?: TInputCheckBoxVariant;
  size?: TInputSize;
  color?: TPaletteColor;
  slotProps?: TInputCheckBoxSlotProps;
};
