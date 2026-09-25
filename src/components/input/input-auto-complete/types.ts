import {
  ButtonHTMLAttributes,
  ChangeEvent,
  HTMLAttributes,
  InputHTMLAttributes,
  MouseEvent,
  ReactNode,
  RefAttributes,
} from 'react';
import { TInputSize, TInputVariant } from '../input-wrapper/types';
import { TPaletteColor } from '../../../theme/types';
import type { TFilterOptions, TOptionRenderState } from '../list-options';
import type { TInputSelectChangeHandler } from '../input-select/types';
import type { TSlotProps } from '../../../helpers/slot-props';
import type { TInputWrapperProps } from '../input-wrapper/types';

export type TInputAutoCompleteChangeHandler<T> = TInputSelectChangeHandler<T>;

export type TInputAutoCompleteSlotProps = TSlotProps<{
  wrapper: TInputWrapperProps;
  trigger: HTMLAttributes<HTMLDivElement>;
  value: HTMLAttributes<HTMLDivElement>;
  input: InputHTMLAttributes<HTMLInputElement> &
    RefAttributes<HTMLInputElement>;
  chevron: HTMLAttributes<HTMLSpanElement>;
  dropdown: HTMLAttributes<HTMLDivElement>;
  listbox: HTMLAttributes<HTMLDivElement>;
  empty: HTMLAttributes<HTMLDivElement>;
  option: ButtonHTMLAttributes<HTMLButtonElement>;
}>;

export type TInputAutoCompleteProps<T = unknown> = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color' | 'children' | 'onChange' | 'defaultValue'
> & {
  children?: ReactNode;
  options?: T[];
  getOptionLabel?: (option: T) => string;
  getOptionKey?: (option: T, index: number) => string;
  renderOption?: (option: T, state: TOptionRenderState) => ReactNode;
  filterOptions?: TFilterOptions<T>;
  value?: T | T[];
  defaultValue?: T | T[];
  onChange?: (event: MouseEvent<HTMLButtonElement> | unknown, value: T | T[]) => void;
  isValueEqual?: (a: T, b: T) => boolean;
  renderValue?: (value: T | T[] | undefined) => ReactNode;
  inputValue?: string;
  defaultInputValue?: string;
  onInputChange?: (
    value: string,
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
  onRemoveLast?: () => void;
  placeholder?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  multiSelect?: boolean;
  closeOnSelect?: boolean;
  hideSelectedOptions?: boolean;
  noOptionsText?: ReactNode;
  variant?: TInputVariant;
  size?: TInputSize;
  color?: TPaletteColor;
  disabled?: boolean;
  actionBar?: ReactNode;
  slotProps?: TInputAutoCompleteSlotProps;
};

export type TSInputAutoCompleteDropdownProps = {
  top: number;
  left: number;
  width: number;
  visible: boolean;
  placement: 'top' | 'bottom';
  color: TPaletteColor;
  variant: TInputVariant;
};
