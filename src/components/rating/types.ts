import { HTMLAttributes, ReactNode, SyntheticEvent } from 'react';
import { TPaletteColor } from '../../theme/types';

export type TRatingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TRatingVariant =
  | 'solid'
  | 'subtle'
  | 'surface'
  | 'outline'
  | 'ghost'
  | 'plain';

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
};
