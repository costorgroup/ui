import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../../theme/types';

export type TBlockquoteBaseProps = Omit<
  HTMLAttributes<HTMLQuoteElement>,
  'color'
> & {
  children?: ReactNode;
  color?: TPaletteColor;
};

export type TSBlockquoteBaseProps = {
  color: TPaletteColor;
};
