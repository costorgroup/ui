import { HTMLAttributes } from 'react';
import { TPaletteColor } from '../../theme/types';

export type TStatusSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TStatusProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  'color' | 'children'
> & {
  color?: TPaletteColor;
  size?: TStatusSize;
  /** Animated ring around the dot, e.g. for live / online states. */
  pulse?: boolean;
};

export type TSStatusProps = {
  color: TPaletteColor;
  size: TStatusSize;
  pulse: boolean;
};
