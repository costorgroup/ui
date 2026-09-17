import { InputHTMLAttributes } from 'react';
import { TPaletteColor } from '../../../theme/types';
import { TInputSize, TInputVariant } from '../input-wrapper/types';

export type TInputSwitchVariant = TInputVariant;

export type TInputSwitchProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'size' | 'type'
> & {
  variant?: TInputSwitchVariant;
  size?: TInputSize;
  color?: TPaletteColor;
};
