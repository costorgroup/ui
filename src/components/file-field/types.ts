import { ReactNode } from 'react';
import type { TInputSize, TInputVariant } from '../input/input-wrapper/types';
import type { TPaletteColor } from '../../theme/types';

export type TFileFieldProps = {
  label?: ReactNode;
  description?: ReactNode;
  helperText?: ReactNode;
  required?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  size?: TInputSize;
  variant?: TInputVariant;
  color?: TPaletteColor;
  value?: File[];
  defaultValue?: File[];
  onChange?: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  modalTitle?: ReactNode;
  modalDescription?: ReactNode;
};
