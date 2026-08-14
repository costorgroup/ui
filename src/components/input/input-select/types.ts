import { HTMLAttributes, ReactNode } from 'react';
import { TInputSize, TInputVariant } from '../input-wrapper/types';
import { TPaletteColor } from '../../../theme/types';

export type TInputSelectProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color' | 'children' | 'onChange'
> & {
  children?: ReactNode;
  renderValue?: () => ReactNode;
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

export type TSInputSelectTriggerProps = {
  variant: TInputVariant;
  size: TInputSize;
  color: TPaletteColor;
  open: boolean;
};

export type TSInputSelectDropdownProps = {
  top: number;
  left: number;
  width: number;
  visible: boolean;
  placement: 'top' | 'bottom';
};
