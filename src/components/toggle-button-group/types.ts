import { HTMLAttributes, MouseEvent, ReactNode } from 'react';
import { TPaletteColor } from '../../theme/types';
import {
  TButtonAppearance,
  TButtonSize,
  TButtonVariant,
} from '../button/types';
import {
  TToggleButtonGroupOrientation,
  TToggleButtonValue,
} from './context';

export type TToggleButtonGroupProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color' | 'onChange' | 'defaultValue'
> & {
  children?: ReactNode;
  orientation?: TToggleButtonGroupOrientation;
  color?: TPaletteColor;
  variant?: TButtonVariant;
  appearance?: TButtonAppearance;
  size?: TButtonSize;
  disabled?: boolean;
  rounded?: boolean;
  fullWidth?: boolean;
  exclusive?: boolean;
  value?: TToggleButtonValue | TToggleButtonValue[] | null;
  defaultValue?: TToggleButtonValue | TToggleButtonValue[] | null;
  onChange?: (
    event: MouseEvent<HTMLButtonElement>,
    value: TToggleButtonValue | TToggleButtonValue[] | null,
  ) => void;
};

export type TSToggleButtonGroupProps = {
  orientation: TToggleButtonGroupOrientation;
  variant?: TButtonVariant;
  color: TPaletteColor;
  rounded?: boolean;
  fullWidth?: boolean;
};
