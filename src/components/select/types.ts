import { ReactNode } from 'react';
import type { TInputSelectProps } from '../input/input-select/types';
import type { TInputSize, TInputVariant } from '../input/input-wrapper/types';
import type { TPaletteColor } from '../../theme/types';
import type { TFieldSlotProps } from '../form-control/types';
import type { TInputSelectSlotProps } from '../input/input-select/types';

export type TSelectSlotProps = TFieldSlotProps<
  Required<TInputSelectSlotProps>
>;

export type TSelectProps<T = unknown> = Omit<
  TInputSelectProps<T>,
  'color' | 'size' | 'variant' | 'slotProps'
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
  slotProps?: TSelectSlotProps;
};
