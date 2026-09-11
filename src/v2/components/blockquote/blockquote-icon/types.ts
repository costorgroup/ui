import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../../../theme/types';

export type TBlockquoteIconProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  'color'
> & {
  children?: ReactNode;
  color?: TPaletteColor;
};

export type TSBlockquoteIconProps = {
  color: TPaletteColor;
};
