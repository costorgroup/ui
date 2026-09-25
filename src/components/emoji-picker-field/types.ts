import { ReactNode } from 'react';
import type { TInputSize, TInputVariant } from '../input/input-wrapper/types';
import type { TPaletteColor } from '../../theme/types';
import type { TEmojiCategory, TEmojiItem } from '../input/input-emoji-field/data';
import type { TFieldSlotProps } from '../form-control/types';
import type { TInputEmojiFieldSlotProps } from '../input/input-emoji-field/types';

export type TEmojiPickerFieldSlotProps = TFieldSlotProps<
  Required<TInputEmojiFieldSlotProps>
>;

export type TEmojiPickerFieldProps = {
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
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
  emojis?: TEmojiItem[];
  categories?: TEmojiCategory[];
  actionBar?: ReactNode;
  slotProps?: TEmojiPickerFieldSlotProps;
};
