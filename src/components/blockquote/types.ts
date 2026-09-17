import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../theme/types';
import type { TStaticVariant } from '../../helpers/variant-styles/types';

export type TBlockquoteVariant = TStaticVariant;

export type TBlockquoteProps = Omit<HTMLAttributes<HTMLQuoteElement>, 'color'> & {
  children?: ReactNode;
  color?: TPaletteColor;
  variant?: TBlockquoteVariant;
};
