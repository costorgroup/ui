import { createContext, useContext } from 'react';
import { TPaletteColor } from '../../../theme/types';
import { TButtonAppearance, TButtonSize, TButtonVariant } from '../button/types';

export type TButtonGroupOrientation = 'horizontal' | 'vertical';

export type TButtonGroupContextValue = {
  orientation: TButtonGroupOrientation;
  color?: TPaletteColor;
  variant?: TButtonVariant;
  appearance?: TButtonAppearance;
  size?: TButtonSize;
};

export const ButtonGroupContext =
  createContext<TButtonGroupContextValue | null>(null);

export const useButtonGroupContext = () => useContext(ButtonGroupContext);
