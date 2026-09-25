import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from 'react';
import { TPaletteColor } from '../../../theme/types';
import { TInputSize, TInputVariant } from '../input-wrapper/types';
import type { TEmojiCategory, TEmojiItem } from './data';
import type { TSlotProps } from '../../../helpers/slot-props';
import type { TInputWrapperProps } from '../input-wrapper/types';
import type { TIconButtonProps } from '../../icon-button/types';
import type { TTextFieldProps } from '../../text-field/types';

export type { TEmojiCategory, TEmojiCategoryId, TEmojiItem } from './data';

export type TInputEmojiFieldSlotProps = TSlotProps<{
  hiddenInput: InputHTMLAttributes<HTMLInputElement>;
  customTrigger: HTMLAttributes<HTMLSpanElement>;
  wrapper: TInputWrapperProps;
  trigger: ButtonHTMLAttributes<HTMLButtonElement>;
  value: HTMLAttributes<HTMLSpanElement>;
  glyph: HTMLAttributes<HTMLSpanElement>;
  text: HTMLAttributes<HTMLSpanElement>;
  placeholder: HTMLAttributes<HTMLSpanElement>;
  chevron: HTMLAttributes<HTMLSpanElement>;
  dropdown: HTMLAttributes<HTMLDivElement>;
  search: TTextFieldProps;
  clearButton: TIconButtonProps;
  categories: HTMLAttributes<HTMLDivElement>;
  grid: HTMLAttributes<HTMLDivElement>;
  option: ButtonHTMLAttributes<HTMLButtonElement>;
  empty: HTMLAttributes<HTMLDivElement>;
}>;

export type TInputEmojiFieldProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color' | 'defaultValue' | 'onChange'
> & {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  name?: string;
  disabled?: boolean;
  variant?: TInputVariant;
  size?: TInputSize;
  color?: TPaletteColor;
  emojis?: TEmojiItem[];
  categories?: TEmojiCategory[];
  trigger?: ReactNode;
  actionBar?: ReactNode;
  slotProps?: TInputEmojiFieldSlotProps;
};

export type TSInputEmojiFieldDropdownProps = {
  top: number;
  left: number;
  width: number;
  visible: boolean;
  placement: 'top' | 'bottom';
};

