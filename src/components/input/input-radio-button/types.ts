import { HTMLAttributes, InputHTMLAttributes } from 'react';
import { TPaletteColor } from '../../../theme/types';
import { TInputSize, TInputVariant } from '../input-wrapper/types';
import type { TSlotProps } from '../../../helpers/slot-props';

export type TInputRadioButtonVariant = TInputVariant;

export type TInputRadioButtonSlotProps = TSlotProps<{
  container: HTMLAttributes<HTMLSpanElement>;
  control: HTMLAttributes<HTMLSpanElement>;
  dot: HTMLAttributes<HTMLSpanElement>;
}>;

export type TInputRadioButtonProps<T = unknown> = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'size' | 'type' | 'value'
> & {
  variant?: TInputRadioButtonVariant;
  size?: TInputSize;
  color?: TPaletteColor;
  value?: T;
  slotProps?: TInputRadioButtonSlotProps;
};
