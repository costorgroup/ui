import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../theme/types';

export type TBlockquoteProps = Omit<HTMLAttributes<HTMLQuoteElement>, 'color'> & {
  children?: ReactNode;
  caption?: ReactNode;
  color?: TPaletteColor;
};
