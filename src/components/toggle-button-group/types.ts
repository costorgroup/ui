import { HTMLAttributes, MouseEvent, ReactNode } from 'react';
import { TPaletteColor } from '../../theme/types';
import { TButtonVariant } from '../button/types';
import { TToggleButtonValue } from './context';

export type TToggleButtonGroupOrientation = 'horizontal' | 'vertical';

export type TToggleButtonGroupProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color' | 'onChange' | 'defaultValue'
> & {
  children?: ReactNode;
  orientation?: TToggleButtonGroupOrientation;
  color?: TPaletteColor;
  variant?: TButtonVariant;
  disabled?: boolean;
  exclusive?: boolean;
  value?: TToggleButtonValue | TToggleButtonValue[] | null;
  defaultValue?: TToggleButtonValue | TToggleButtonValue[] | null;
  onChange?: (
    event: MouseEvent<HTMLButtonElement>,
    value: TToggleButtonValue | TToggleButtonValue[] | null,
  ) => void;
};
