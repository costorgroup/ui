import { ChangeEvent, HTMLAttributes, ReactNode } from 'react';
import { TInputSize, TInputVariant } from '../input-wrapper/types';
import { TPaletteColor } from '../../../theme/types';

export type TInputAutoCompleteProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color' | 'children' | 'onChange'
> & {
  children?: ReactNode;
  renderValue?: () => ReactNode;
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
};

export type TSInputAutoCompleteTriggerProps = {
  variant: TInputVariant;
  size: TInputSize;
  color: TPaletteColor;
  open: boolean;
};

export type TSInputAutoCompleteDropdownProps = {
  top: number;
  left: number;
  width: number;
  visible: boolean;
  placement: 'top' | 'bottom';
};
