import { ReactNode } from 'react';
import type { TInputSize, TInputVariant } from '../input/input-wrapper/types';
import type { TPaletteColor } from '../../theme/types';
import type { TColorFormat } from '../../helpers/color';
import type { TFieldSlotProps } from '../form-control/types';
import type { TInputColorFieldSlotProps } from '../input/input-color-field/types';

export type { TColorFormat };

export type TColorPickerFieldSlotProps = TFieldSlotProps<
  Required<TInputColorFieldSlotProps>
>;

export type TColorPickerFieldProps = {
  label?: ReactNode;
  description?: ReactNode;
  helperText?: ReactNode;
  required?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  size?: TInputSize;
  variant?: TInputVariant;
  color?: TPaletteColor;
  value?: string;
  defaultValue?: string;
  format?: TColorFormat;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
  actionBar?: ReactNode;
  slotProps?: TColorPickerFieldSlotProps;
};
