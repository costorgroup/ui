import { createContext } from 'react';
import type { TInputSize } from '../input/input-wrapper/types';
import type { TInputRadioButtonVariant } from '../input/input-radio-button/types';
import type { TPaletteColor } from '../../../theme/types';
import { defaultIsValueEqual } from '../form-control/value';

export type TRadioButtonGroupContextValue<T = unknown> = {
  name: string;
  value: T | undefined;
  onSelect: (event: unknown, value: T) => void;
  isValueEqual: (a: T, b: T) => boolean;
  size?: TInputSize;
  variant?: TInputRadioButtonVariant;
  color?: TPaletteColor;
  error?: boolean;
  disabled?: boolean;
};

export const RadioButtonGroupContext =
  createContext<TRadioButtonGroupContextValue | null>(null);

export { defaultIsValueEqual };
