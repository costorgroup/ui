import { createContext } from 'react';
import { TPaletteColor } from '../../theme/types';
import { TButtonVariant } from '../button/types';

export type TButtonGroupContextValue = {
  color?: TPaletteColor;
  variant?: TButtonVariant;
};

export const ButtonGroupContext = createContext<TButtonGroupContextValue | null>(
  null,
);
