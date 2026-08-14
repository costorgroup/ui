import { ChangeEvent, createContext } from 'react';
import type { TInputSize } from '../input/input-wrapper/types';
import type { TInputRadioButtonVariant } from '../input/input-radio-button/types';
import type { TPaletteColor } from '../../theme/types';

export type TRadioButtonGroupContextValue = {
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  size?: TInputSize;
  variant?: TInputRadioButtonVariant;
  color?: TPaletteColor;
  error?: boolean;
  disabled?: boolean;
};

export const RadioButtonGroupContext =
  createContext<TRadioButtonGroupContextValue | null>(null);
