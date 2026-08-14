import { InputHTMLAttributes } from 'react';
import { TPaletteColor } from '../../../theme/types';
import { TInputSize } from '../input-wrapper/types';

export type TInputCheckBoxVariant = 'subtle' | 'surface' | 'outline';

export type TInputCheckBoxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'size' | 'type'
> & {
  variant?: TInputCheckBoxVariant;
  size?: TInputSize;
  color?: TPaletteColor;
};
