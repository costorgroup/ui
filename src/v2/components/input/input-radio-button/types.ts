import { InputHTMLAttributes } from 'react';
import { TPaletteColor } from '../../../../theme/types';
import { TInputSize, TInputVariant } from '../input-wrapper/types';

export type TInputRadioButtonVariant = TInputVariant;

export type TInputRadioButtonProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'size' | 'type'
> & {
  variant?: TInputRadioButtonVariant;
  size?: TInputSize;
  color?: TPaletteColor;
};
