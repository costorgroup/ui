import { createContext, useContext } from 'react';
import type { TPaletteColor } from '../../theme/types';
import type { TInputSize, TInputVariant } from '../input/input-wrapper/types';
import { defaultIsValueEqual } from './value';

export type TFormControlContextValue<T = unknown> = {
  error: boolean;
  disabled: boolean;
  required: boolean;
  focused: boolean;
  filled: boolean;
  fullWidth: boolean;
  size: TInputSize;
  color: TPaletteColor;
  variant: TInputVariant;
  id: string;
  labelId: string;
  helperId: string;
  value: T | undefined;
  setFocused: (focused: boolean) => void;
  onChange: (event: unknown, value: T) => void;
  isValueEqual: (a: T, b: T) => boolean;
};

export const FormControlContext =
  createContext<TFormControlContextValue | null>(null);

export const useFormControl = <T = unknown>() =>
  useContext(FormControlContext) as TFormControlContextValue<T> | null;

export type TFormControlSlotOverrides = {
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  size?: TInputSize;
  color?: TPaletteColor;
  variant?: TInputVariant;
  fullWidth?: boolean;
  id?: string;
  focused?: boolean;
};

export const useFormControlState = (overrides: TFormControlSlotOverrides = {}) => {
  const form = useFormControl();

  return {
    error: overrides.error ?? form?.error ?? false,
    disabled: overrides.disabled ?? form?.disabled ?? false,
    required: overrides.required ?? form?.required ?? false,
    size: overrides.size ?? form?.size ?? 'md',
    color: overrides.color ?? form?.color ?? 'primary',
    variant: overrides.variant ?? form?.variant ?? 'surface',
    fullWidth: overrides.fullWidth ?? form?.fullWidth ?? true,
    id: overrides.id ?? form?.id,
    labelId: form?.labelId,
    helperId: form?.helperId,
    focused: overrides.focused ?? form?.focused ?? false,
    filled: form?.filled ?? false,
    setFocused: form?.setFocused,
    onChange: form?.onChange,
    value: form?.value,
    isValueEqual: form?.isValueEqual ?? defaultIsValueEqual,
  };
};
