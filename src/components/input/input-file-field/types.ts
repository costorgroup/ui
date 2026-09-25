import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from 'react';
import { TPaletteColor } from '../../../theme/types';
import { TInputSize, TInputVariant } from '../input-wrapper/types';
import type { TSlotProps } from '../../../helpers/slot-props';
import type { TInputWrapperProps } from '../input-wrapper/types';
import type { TInputButtonProps } from '../input-button/types';
import type { TInputFileFieldModalProps } from '../input-file-field-modal/types';

export type TInputFileFieldSlotProps = TSlotProps<{
  fileInput: InputHTMLAttributes<HTMLInputElement>;
  wrapper: TInputWrapperProps;
  trigger: ButtonHTMLAttributes<HTMLButtonElement>;
  value: HTMLAttributes<HTMLSpanElement>;
  text: HTMLAttributes<HTMLSpanElement>;
  placeholder: HTMLAttributes<HTMLSpanElement>;
  clearButton: TInputButtonProps;
  modal: Omit<TInputFileFieldModalProps, 'files' | 'onConfirm' | 'onCancel'>;
}>;

export type TInputFileFieldProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color' | 'defaultValue' | 'onChange'
> & {
  value?: File[];
  defaultValue?: File[];
  onChange?: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  variant?: TInputVariant;
  size?: TInputSize;
  color?: TPaletteColor;
  modalTitle?: ReactNode;
  modalDescription?: ReactNode;
  slotProps?: TInputFileFieldSlotProps;
};

export type TSInputFileFieldTriggerProps = {
  size: TInputSize;
};
