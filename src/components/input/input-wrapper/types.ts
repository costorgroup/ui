import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../../theme/types';

export const INPUT_VARIANTS = ['subtle', 'surface', 'outline'] as const;

export type TInputVariant = (typeof INPUT_VARIANTS)[number];
export type TInputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TInputWrapperProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
  children?: ReactNode;
  variant?: TInputVariant;
  size?: TInputSize;
  color?: TPaletteColor;
  error?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  /** Dropdown / popover open — keeps active chrome on the wrapper. */
  open?: boolean;
  /** Pointer cursor for button-style triggers (select, date, …). */
  trigger?: boolean;
  /** Column layout for rich-text and similar stacked shells. */
  stacked?: boolean;
  /** Actions rendered under the field, inside the chrome. */
  actionBar?: ReactNode;
};
