import { HTMLAttributes } from 'react';
import { TPaletteColor } from '../../../theme/types';
import { TInputSize, TInputVariant } from '../input-wrapper/types';
import type { TColorFormat } from '../../../helpers/color';

export type { TColorFormat };

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
};

export type TSInputColorFieldTriggerProps = {
  variant: TInputVariant;
  size: TInputSize;
  color: TPaletteColor;
  open: boolean;
};

export type TSInputColorFieldDropdownProps = {
  top: number;
  left: number;
  width: number;
  visible: boolean;
  placement: 'top' | 'bottom';
};
