import { InputHTMLAttributes } from 'react';
import { TPaletteColor } from '../../../theme/types';
import { TInputSize } from '../input-wrapper/types';

export type TInputSwitchVariant = 'subtle' | 'surface' | 'outline';

export type TInputSwitchProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'color' | 'size' | 'type'
> & {
  variant?: TInputSwitchVariant;
  size?: TInputSize;
  color?: TPaletteColor;
};
