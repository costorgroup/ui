import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../../theme/types';
import { TButtonSize, TButtonVariant } from '../button/types';
import { TButtonGroupOrientation } from './context';

export type TButtonGroupProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color'
> & {
  children?: ReactNode;
  orientation?: TButtonGroupOrientation;
  color?: TPaletteColor;
  variant?: TButtonVariant;
  size?: TButtonSize;
  disabled?: boolean;
};

export type TSButtonGroupProps = {
  orientation: TButtonGroupOrientation;
};
