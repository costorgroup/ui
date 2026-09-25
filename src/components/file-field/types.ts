import { ReactNode } from 'react';
import type { TInputSize, TInputVariant } from '../input/input-wrapper/types';
import type { TInputFileFieldProps } from '../input/input-file-field/types';
import type { TPaletteColor } from '../../theme/types';
import type { TFieldSlotProps } from '../form-control/types';
import type { TInputFileFieldSlotProps } from '../input/input-file-field/types';

export type TFileFieldSlotProps = TFieldSlotProps<
  Required<TInputFileFieldSlotProps>
>;

export type TFileFieldProps = Omit<
  TInputFileFieldProps,
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
  slotProps?: TFileFieldSlotProps;
};
