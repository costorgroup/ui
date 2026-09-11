import { InputHTMLAttributes } from 'react';
import { TPaletteColor } from '../../../../theme/types';
import { TInputSize, TInputVariant } from '../input-wrapper/types';

export type TInputRadioButtonVariant = TInputVariant;

export type TInputRadioButtonProps<T = unknown> = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'size' | 'type' | 'value'
> & {
  variant?: TInputRadioButtonVariant;
  size?: TInputSize;
  color?: TPaletteColor;
  value?: T;
};
