import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../../theme/types';
import { TInputSize, TInputVariant } from '../input-wrapper/types';

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
};

export type TSInputFileFieldTriggerProps = {
  variant: TInputVariant;
  size: TInputSize;
  color: TPaletteColor;
  open: boolean;
};
