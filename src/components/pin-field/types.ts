import { ReactNode } from 'react';
import type { TInputSize, TInputVariant } from '../input/input-wrapper/types';
import type {
  TInputPinFieldProps,
  TInputPinFieldType,
} from '../input/input-pin-field/types';
import type { TPaletteColor } from '../../theme/types';
import type { TFieldSlotProps } from '../form-control/types';
import type { TInputPinFieldSlotProps } from '../input/input-pin-field/types';

export type TPinFieldSlotProps = TFieldSlotProps<
  Required<TInputPinFieldSlotProps>
>;

export type TPinFieldProps = Omit<
  TInputPinFieldProps,
  'variant' | 'size' | 'color' | 'slotProps'
> & {
  label?: ReactNode;
  description?: ReactNode;
  helperText?: ReactNode;
  required?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  size?: TInputSize;
  variant?: TInputVariant;
  color?: TPaletteColor;
  slotProps?: TPinFieldSlotProps;
};

export type { TInputPinFieldType };
