import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from 'react';
import { TPaletteColor } from '../../../theme/types';
import { TInputSize, TInputVariant } from '../input-wrapper/types';
import type { TColorFormat } from '../../../helpers/color';
import type { TSlotProps } from '../../../helpers/slot-props';
import type { TInputWrapperProps } from '../input-wrapper/types';
import type { TIconButtonProps } from '../../icon-button/types';

export type { TColorFormat };

export type TInputColorFieldSlotProps = TSlotProps<{
  hiddenInput: InputHTMLAttributes<HTMLInputElement>;
  wrapper: TInputWrapperProps;
  trigger: ButtonHTMLAttributes<HTMLButtonElement>;
  value: HTMLAttributes<HTMLSpanElement>;
  swatch: HTMLAttributes<HTMLSpanElement>;
  text: HTMLAttributes<HTMLSpanElement>;
  placeholder: HTMLAttributes<HTMLSpanElement>;
  chevron: HTMLAttributes<HTMLSpanElement>;
  dropdown: HTMLAttributes<HTMLDivElement>;
  picker: HTMLAttributes<HTMLDivElement>;
  spectrum: HTMLAttributes<HTMLDivElement>;
  controls: HTMLAttributes<HTMLDivElement>;
  eyeDropperButton: TIconButtonProps;
  preview: HTMLAttributes<HTMLSpanElement>;
  sliders: HTMLAttributes<HTMLDivElement>;
  hue: HTMLAttributes<HTMLDivElement>;
  alpha: HTMLAttributes<HTMLDivElement>;
}>;

export type TInputColorFieldProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color' | 'defaultValue' | 'onChange'
> & {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  format?: TColorFormat;
  placeholder?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  name?: string;
  disabled?: boolean;
  variant?: TInputVariant;
  size?: TInputSize;
  color?: TPaletteColor;
  actionBar?: ReactNode;
  slotProps?: TInputColorFieldSlotProps;
};

export type TSInputColorFieldDropdownProps = {
  top: number;
  left: number;
  width: number;
  visible: boolean;
  placement: 'top' | 'bottom';
};
