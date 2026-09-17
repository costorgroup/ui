import { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { TPaletteColor } from '../../theme/types';
import {
  TButtonAppearance,
  TButtonRadius,
  TButtonSize,
  TButtonVariant,
} from '../button/types';
import { TToggleButtonValue } from '../toggle-button-group/context';

export type TToggleButtonVariant = TButtonVariant;
export type TToggleButtonAppearance = TButtonAppearance;
export type TToggleButtonSize = TButtonSize;
export type TToggleButtonRadius = TButtonRadius;

export type TToggleButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'color' | 'value' | 'onChange'
> & {
  children?: ReactNode;
  value?: TToggleButtonValue;
  active?: boolean;
  defaultActive?: boolean;
  variant?: TToggleButtonVariant;
  appearance?: TToggleButtonAppearance;
  size?: TToggleButtonSize;
  color?: TPaletteColor;
  radius?: TToggleButtonRadius;
  onChange?: (event: MouseEvent<HTMLButtonElement>, active: boolean) => void;
};
