import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../../theme/types';

export type TInputVariant = 'subtle' | 'surface' | 'outline';
export type TInputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TInputWrapperProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
  children?: ReactNode;
  variant?: TInputVariant;
  size?: TInputSize;
  color?: TPaletteColor;
  error?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
};
