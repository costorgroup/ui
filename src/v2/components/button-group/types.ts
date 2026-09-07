import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../../theme/types';
import { TButtonAppearance, TButtonSize, TButtonVariant } from '../button/types';
import { TButtonGroupOrientation } from './context';

export type TButtonGroupProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color'
> & {
  children?: ReactNode;
  orientation?: TButtonGroupOrientation;
  color?: TPaletteColor;
  variant?: TButtonVariant;
  appearance?: TButtonAppearance;
  size?: TButtonSize;
  disabled?: boolean;
};

export type TSButtonGroupProps = {
  orientation: TButtonGroupOrientation;
};
