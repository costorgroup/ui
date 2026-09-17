import { InputHTMLAttributes } from 'react';
import { TPaletteColor } from '../../../theme/types';
import { TInputSize, TInputVariant } from '../input-wrapper/types';

export type TInputCheckBoxVariant = TInputVariant;

export type TInputCheckBoxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'size' | 'type'
> & {
  variant?: TInputCheckBoxVariant;
  size?: TInputSize;
  color?: TPaletteColor;
};
