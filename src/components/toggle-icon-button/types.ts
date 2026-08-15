import { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { TPaletteColor } from '../../theme/types';
import { TIconButtonSize, TIconButtonVariant } from '../icon-button/types';
import { TToggleButtonValue } from '../toggle-button-group/context';

export type TToggleIconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'color' | 'value' | 'onChange'
> & {
  children?: ReactNode;
  value?: TToggleButtonValue;
  active?: boolean;
  defaultActive?: boolean;
  variant?: TIconButtonVariant;
  size?: TIconButtonSize;
  color?: TPaletteColor;
  rounded?: boolean;
  onChange?: (event: MouseEvent<HTMLButtonElement>, active: boolean) => void;
};
