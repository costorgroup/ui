import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../theme/types';
import { TButtonVariant } from '../button/types';

export type TInputGroupOrientation = 'horizontal' | 'vertical';

export type TInputGroupProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color'
> & {
  children?: ReactNode;
  orientation?: TInputGroupOrientation;
  color?: TPaletteColor;
  variant?: TButtonVariant;
};
