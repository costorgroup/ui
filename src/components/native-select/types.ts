import {
  HTMLAttributes,
  OptionHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from 'react';
import type { TInputSize, TInputVariant } from '../input/input-wrapper/types';
import type { TPaletteColor } from '../../theme/types';
import type {
  TFieldSlotProps,
  TFormControlChangeHandler,
} from '../form-control/types';
import type { TInputWrapperProps } from '../input/input-wrapper/types';

export type TNativeSelectOption = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};

export type TNativeSelectChangeHandler = TFormControlChangeHandler<string>;

export type TNativeSelectSlotProps = TFieldSlotProps<{
  wrapper: TInputWrapperProps;
  container: HTMLAttributes<HTMLDivElement>;
  select: SelectHTMLAttributes<HTMLSelectElement>;
  chevron: HTMLAttributes<HTMLSpanElement>;
  /** Applied to every option rendered from `options`. */
  option: OptionHTMLAttributes<HTMLOptionElement>;
}>;

export type TNativeSelectProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color' | 'onChange' | 'defaultValue'
> & {
  options: Array<string | TNativeSelectOption>;
  value?: string;
  defaultValue?: string;
  onChange?: TNativeSelectChangeHandler;
  placeholder?: string;
  name?: SelectHTMLAttributes<HTMLSelectElement>['name'];
  autoComplete?: SelectHTMLAttributes<HTMLSelectElement>['autoComplete'];
  label?: ReactNode;
  description?: ReactNode;
  helperText?: ReactNode;
  required?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  size?: TInputSize;
  variant?: TInputVariant;
  color?: TPaletteColor;
  actionBar?: ReactNode;
  slotProps?: TNativeSelectSlotProps;
};
