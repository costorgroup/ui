import {
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  SyntheticEvent,
} from 'react';
import { TPaletteColor } from '../../theme/types';
import type { TSlotProps } from '../../helpers/slot-props';

export type TRatingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TRatingVariant =
  | 'solid'
  | 'subtle'
  | 'surface'
  | 'outline'
  | 'ghost'
  | 'plain';

export type TRatingSlotProps = TSlotProps<{
  item: HTMLAttributes<HTMLSpanElement>;
  emptyIcon: HTMLAttributes<HTMLSpanElement>;
  filledIcon: HTMLAttributes<HTMLSpanElement>;
  label: LabelHTMLAttributes<HTMLLabelElement>;
  input: InputHTMLAttributes<HTMLInputElement>;
}>;

export type TRatingProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  'color' | 'onChange' | 'defaultValue'
> & {
  name?: string;
  value?: number | null;
  defaultValue?: number | null;
  max?: number;
  precision?: number;
  readOnly?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  emptyIcon?: ReactNode;
  color?: TPaletteColor;
  variant?: TRatingVariant;
  size?: TRatingSize;
  highlightSelectedOnly?: boolean;
  getLabelText?: (value: number) => string;
  onChange?: (event: SyntheticEvent, value: number | null) => void;
  onChangeActive?: (event: SyntheticEvent, value: number) => void;
  slotProps?: TRatingSlotProps;
};
