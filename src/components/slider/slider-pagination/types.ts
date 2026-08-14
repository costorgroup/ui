import { HTMLAttributes } from 'react';
import { TPaletteColor } from '../../../theme/types';

export type TSliderPaginationProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color' | 'onChange'
> & {
  color?: TPaletteColor;
};

export type TSSliderPaginationDotProps = {
  active: boolean;
  color: TPaletteColor;
};
