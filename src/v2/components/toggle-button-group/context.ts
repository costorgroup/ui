import { createContext, MouseEvent, useContext } from 'react';
import { TPaletteColor } from '../../../theme/types';
import {
  TButtonAppearance,
  TButtonSize,
  TButtonVariant,
} from '../button/types';

export type TToggleButtonValue = string | number;

export type TToggleButtonGroupOrientation = 'horizontal' | 'vertical';

export type TToggleButtonGroupContextValue = {
  color?: TPaletteColor;
  variant?: TButtonVariant;
  appearance?: TButtonAppearance;
  size?: TButtonSize;
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

export const useToggleButtonGroupContext = () =>
  useContext(ToggleButtonGroupContext);
