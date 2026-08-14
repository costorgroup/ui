import { createContext } from 'react';
import { TPaletteColor } from '../../theme/types';
import { TButtonVariant } from '../button/types';

export type TInputGroupContextValue = {
  color?: TPaletteColor;
  variant?: TButtonVariant;
};

export const InputGroupContext = createContext<TInputGroupContextValue | null>(
  null,
);
