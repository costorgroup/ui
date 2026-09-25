import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
} from 'react';
import { TInputSize, TInputVariant } from '../input-wrapper/types';
import { TPaletteColor } from '../../../theme/types';
import type { TOptionRenderState } from '../list-options';
import type { TSlotProps } from '../../../helpers/slot-props';
import type { TInputWrapperProps } from '../input-wrapper/types';

export type TInputSelectChangeHandler<T> = (
  event: MouseEvent<HTMLButtonElement>,
  value: T | T[],
) => void;

export type TInputSelectSlotProps = TSlotProps<{
  wrapper: TInputWrapperProps;
  trigger: ButtonHTMLAttributes<HTMLButtonElement>;
  value: HTMLAttributes<HTMLSpanElement>;
  placeholder: HTMLAttributes<HTMLSpanElement>;
  chevron: HTMLAttributes<HTMLSpanElement>;
  dropdown: HTMLAttributes<HTMLDivElement>;
  listbox: HTMLAttributes<HTMLDivElement>;
  empty: HTMLAttributes<HTMLDivElement>;
  /** Applied to every option rendered from `options`. */
  option: ButtonHTMLAttributes<HTMLButtonElement>;
}>;

export type TInputSelectProps<T = unknown> = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color' | 'children' | 'onChange' | 'defaultValue'
> & {
  children?: ReactNode;
  options?: T[];
  getOptionLabel?: (option: T) => string;
  getOptionKey?: (option: T, index: number) => string;
  renderOption?: (option: T, state: TOptionRenderState) => ReactNode;
  value?: T | T[];
  defaultValue?: T | T[];
  onChange?: TInputSelectChangeHandler<T>;
  isValueEqual?: (a: T, b: T) => boolean;
  renderValue?: (value: T | T[] | undefined) => ReactNode;
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
  slotProps?: TInputSelectSlotProps;
};

export type TSInputSelectTriggerProps = {
  size: TInputSize;
};

export type TSInputSelectDropdownProps = {
  top: number;
  left: number;
  width: number;
  visible: boolean;
  placement: 'top' | 'bottom';
  color: TPaletteColor;
  variant: TInputVariant;
};
