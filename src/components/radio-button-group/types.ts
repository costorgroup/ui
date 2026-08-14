import { ChangeEvent, HTMLAttributes, ReactNode } from 'react';
import type { TInputSize } from '../input/input-wrapper/types';
import type { TInputRadioButtonVariant } from '../input/input-radio-button/types';
import type { TPaletteColor } from '../../theme/types';

export type TRadioButtonGroupProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color' | 'onChange' | 'defaultValue'
> & {
  children?: ReactNode;
  label?: ReactNode;
  description?: ReactNode;
  helperText?: ReactNode;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  fullWidth?: boolean;
  direction?: 'vertical' | 'horizontal';
  size?: TInputSize;
  variant?: TInputRadioButtonVariant;
  color?: TPaletteColor;
  disabled?: boolean;
};
