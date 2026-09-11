import { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { TPaletteColor } from '../../../theme/types';
import {
  TIconButtonAppearance,
  TIconButtonRadius,
  TIconButtonSize,
  TIconButtonVariant,
} from '../icon-button/types';
import { TToggleButtonValue } from '../toggle-button-group/context';

export type TToggleIconButtonVariant = TIconButtonVariant;
export type TToggleIconButtonAppearance = TIconButtonAppearance;
export type TToggleIconButtonSize = TIconButtonSize;
export type TToggleIconButtonRadius = TIconButtonRadius;

export type TToggleIconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'color' | 'value' | 'onChange'
> & {
  children?: ReactNode;
  value?: TToggleButtonValue;
  active?: boolean;
  defaultActive?: boolean;
  variant?: TToggleIconButtonVariant;
  appearance?: TToggleIconButtonAppearance;
  size?: TToggleIconButtonSize;
  color?: TPaletteColor;
  radius?: TToggleIconButtonRadius;
  onChange?: (event: MouseEvent<HTMLButtonElement>, active: boolean) => void;
};
