import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../../../theme/types';
import type { TBlockquoteVariant } from '../types';

export type TBlockquoteBaseProps = Omit<
  HTMLAttributes<HTMLQuoteElement>,
  'color'
> & {
  children?: ReactNode;
  color?: TPaletteColor;
  variant?: TBlockquoteVariant;
};
