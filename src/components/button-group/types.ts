import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../theme/types';
import { TButtonVariant } from '../button/types';

export type TButtonGroupOrientation = 'horizontal' | 'vertical';

export type TButtonGroupProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color'
> & {
  children?: ReactNode;
  orientation?: TButtonGroupOrientation;
  color?: TPaletteColor;
  variant?: TButtonVariant;
};
