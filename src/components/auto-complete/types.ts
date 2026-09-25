import { ReactNode } from 'react';
import type { TInputAutoCompleteProps } from '../input/input-auto-complete/types';
import type { TInputSize, TInputVariant } from '../input/input-wrapper/types';
import type { TPaletteColor } from '../../theme/types';
import type { TFieldSlotProps } from '../form-control/types';
import type { TInputAutoCompleteSlotProps } from '../input/input-auto-complete/types';

export type TAutoCompleteSlotProps = TFieldSlotProps<
  Required<TInputAutoCompleteSlotProps>
>;

export type TAutoCompleteProps<T = unknown> = Omit<
  TInputAutoCompleteProps<T>,
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
  slotProps?: TAutoCompleteSlotProps;
};
