import { HTMLAttributes } from 'react';
import { TPaletteColor } from '../../theme/types';
import type { TSlotProps } from '../../helpers/slot-props';

export type TStatusSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TStatusSlotProps = TSlotProps<{
  dot: HTMLAttributes<HTMLSpanElement>;
}>;

export type TStatusProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  'color' | 'children'
> & {
  color?: TPaletteColor;
  size?: TStatusSize;
  /** Animated ring around the dot, e.g. for live / online states. */
  pulse?: boolean;
  slotProps?: TStatusSlotProps;
};

export type TSStatusProps = {
  color: TPaletteColor;
  size: TStatusSize;
  pulse: boolean;
};
