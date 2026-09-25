import { HTMLAttributes, ReactNode } from 'react';
import type { TInputSize } from '../input/input-wrapper/types';
import type { TInputRadioButtonVariant } from '../input/input-radio-button/types';
import type { TPaletteColor } from '../../theme/types';
import type {
  TFieldSlotProps,
  TFormControlChangeHandler,
} from '../form-control/types';
import type { TInputBaseProps } from '../input/input-base/types';

export type TRadioButtonGroupSlotProps = TFieldSlotProps<{
  /** The `role="radiogroup"` element wrapping the radio buttons. */
  group: TInputBaseProps;
}>;

export type TRadioButtonGroupProps<T = unknown> = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color' | 'onChange' | 'defaultValue'
> & {
  children?: ReactNode;
  label?: ReactNode;
  description?: ReactNode;
  helperText?: ReactNode;
  name?: string;
  value?: T;
  defaultValue?: T;
  onChange?: TFormControlChangeHandler<T>;
  isValueEqual?: (a: T, b: T) => boolean;
  error?: boolean;
  fullWidth?: boolean;
  direction?: 'vertical' | 'horizontal';
  size?: TInputSize;
  variant?: TInputRadioButtonVariant;
  color?: TPaletteColor;
  disabled?: boolean;
  slotProps?: TRadioButtonGroupSlotProps;
};
