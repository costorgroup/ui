import { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { TPaletteColor } from '../../theme/types';
import { TButtonSize, TButtonVariant } from '../button/types';
import { TToggleButtonValue } from '../toggle-button-group/context';

export type TToggleButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'color' | 'value' | 'onChange'
> & {
  children?: ReactNode;
  value?: TToggleButtonValue;
  active?: boolean;
  defaultActive?: boolean;
  variant?: TButtonVariant;
  size?: TButtonSize;
  color?: TPaletteColor;
  onChange?: (event: MouseEvent<HTMLButtonElement>, active: boolean) => void;
};
