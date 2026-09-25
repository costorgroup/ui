import { ReactNode } from 'react';
import type { TDateAdapter } from '../../helpers/date-adapter';
import type { TPaletteColor } from '../../theme/types';
import type {
  TDatePickerDisplayType,
  TDatePickerMode,
  TTimePickerDisplayType,
} from '../input/input-date-field/types';
import type { TInputSize, TInputVariant } from '../input/input-wrapper/types';
import type { TFieldSlotProps } from '../form-control/types';
import type { TInputDateFieldSlotProps } from '../input/input-date-field/types';

export type {
  TDatePickerMode,
  TDatePickerDisplayType,
  TTimePickerDisplayType,
};

export type TDatePickerFieldSlotProps = TFieldSlotProps<
  Required<TInputDateFieldSlotProps>
>;

export type TDatePickerFieldProps = {
  label?: ReactNode;
  description?: ReactNode;
  helperText?: ReactNode;
  required?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  size?: TInputSize;
  variant?: TInputVariant;
  color?: TPaletteColor;
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (value: Date | null) => void;
  mode?: TDatePickerMode;
  datePickerDisplayType?: TDatePickerDisplayType;
  timePickerDisplayType?: TTimePickerDisplayType;
  minDate?: Date | null;
  maxDate?: Date | null;
  adapter?: TDateAdapter;
  ampm?: boolean;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
  actionBar?: ReactNode;
  slotProps?: TDatePickerFieldSlotProps;
};

