import { HTMLAttributes, InputHTMLAttributes } from 'react';
import { TPaletteColor } from '../../../theme/types';
import { TInputSize, TInputVariant } from '../input-wrapper/types';
import type { TSlotProps } from '../../../helpers/slot-props';

export type TInputSwitchVariant = TInputVariant;

export type TInputSwitchSlotProps = TSlotProps<{
  container: HTMLAttributes<HTMLSpanElement>;
  control: HTMLAttributes<HTMLSpanElement>;
  thumb: HTMLAttributes<HTMLSpanElement>;
}>;

export type TInputSwitchProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'size' | 'type'
> & {
  variant?: TInputSwitchVariant;
  size?: TInputSize;
  color?: TPaletteColor;
  slotProps?: TInputSwitchSlotProps;
};
