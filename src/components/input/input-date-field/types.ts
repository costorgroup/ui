import { HTMLAttributes } from 'react';
import type { TDateAdapter } from '../../../helpers/date-adapter';
import { TPaletteColor } from '../../../theme/types';
import { TInputSize, TInputVariant } from '../input-wrapper/types';

export type TDatePickerMode = 'date' | 'time' | 'datetime';
export type TDatePickerDisplayType = 'calendar' | 'wheel';
export type TTimePickerDisplayType = 'wheel';

export type TInputDateFieldProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color' | 'defaultValue' | 'onChange'
> & {
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
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  name?: string;
  disabled?: boolean;
  variant?: TInputVariant;
  size?: TInputSize;
  color?: TPaletteColor;
};

export type TSInputDateFieldTriggerProps = {
  variant: TInputVariant;
  size: TInputSize;
  color: TPaletteColor;
  open: boolean;
};

export type TSInputDateFieldDropdownProps = {
  top: number;
  left: number;
  width: number;
  visible: boolean;
  placement: 'top' | 'bottom';
};

export type TSInputDateFieldDayProps = {
  selected: boolean;
  today: boolean;
  outside: boolean;
  disabled: boolean;
  color: TPaletteColor;
  variant: TInputVariant;
};

export type TSInputDateFieldWeekdayProps = {
  color: TPaletteColor;
};

export type TSInputDateFieldTimeWheelHighlightProps = {
  color: TPaletteColor;
  variant: TInputVariant;
};

export type TSInputDateFieldTimeWheelItemProps = {
  color: TPaletteColor;
  variant: TInputVariant;
};
