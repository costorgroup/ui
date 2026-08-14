import { InputHTMLAttributes } from 'react';
import { TPaletteColor } from '../../../theme/types';
import { TInputSize } from '../input-wrapper/types';

export type TInputRadioButtonVariant = 'subtle' | 'surface' | 'outline';

export type TInputRadioButtonProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'size' | 'type'
> & {
  variant?: TInputRadioButtonVariant;
  size?: TInputSize;
  color?: TPaletteColor;
};
