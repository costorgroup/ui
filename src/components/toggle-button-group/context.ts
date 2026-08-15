import { createContext, MouseEvent } from 'react';
import { TPaletteColor } from '../../theme/types';
import { TButtonVariant } from '../button/types';

export type TToggleButtonValue = string | number;

export type TToggleButtonGroupContextValue = {
  color?: TPaletteColor;
  variant?: TButtonVariant;
  disabled?: boolean;
  exclusive: boolean;
  value: TToggleButtonValue | TToggleButtonValue[] | null;
  onSelect: (
    event: MouseEvent<HTMLButtonElement>,
    buttonValue: TToggleButtonValue | undefined,
  ) => void;
};

export const ToggleButtonGroupContext =
  createContext<TToggleButtonGroupContextValue | null>(null);
