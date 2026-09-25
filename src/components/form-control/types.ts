import { HTMLAttributes, ReactNode } from 'react';
import type { TSlotProps } from '../../helpers/slot-props';
import type { TInputHelperTextProps } from '../input/input-helper-text/types';
import type { TInputLabelProps } from '../input/input-label/types';
import type { TTextOwnProps } from '../text/types';
import type { TPaletteColor } from '../../theme/types';
import type { TInputFieldDirection } from '../input/input-base/types';
import type { TInputSize, TInputVariant } from '../input/input-wrapper/types';

export type TFormControlChangeHandler<T> = (
  event: unknown,
  value: T,
) => void;

export type TFormControlSlotProps = TSlotProps<{
  label: TInputLabelProps;
  description: HTMLAttributes<HTMLParagraphElement> & TTextOwnProps;
  helperText: TInputHelperTextProps;
}>;

/** Slot props shared by every product field (`TextField`, `Select`, …). */
export type TFieldSlotProps<TSlots extends Record<string, object> = {}> =
  TFormControlSlotProps &
    TSlotProps<
      {
        root: Omit<
          HTMLAttributes<HTMLDivElement>,
          'color' | 'onChange' | 'defaultValue'
        >;
      } & TSlots
    >;

export type TFormControlProps<T = unknown> = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color' | 'onChange' | 'defaultValue'
> & {
  children?: ReactNode;
  label?: ReactNode;
  description?: ReactNode;
  helperText?: ReactNode;
  direction?: TInputFieldDirection;
  value?: T;
  defaultValue?: T;
  onChange?: TFormControlChangeHandler<T>;
  isValueEqual?: (a: T, b: T) => boolean;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  focused?: boolean;
  fullWidth?: boolean;
  size?: TInputSize;
  color?: TPaletteColor;
  variant?: TInputVariant;
  slotProps?: TFormControlSlotProps;
};
