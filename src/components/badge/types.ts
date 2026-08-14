import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../theme/types';

export type TBadgeVariant =
  | 'solid'
  | 'subtle'
  | 'surface'
  | 'outline'
  | 'ghost'
  | 'plain';

export type TBadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TBadgeOverlap = 'rectangular' | 'circular';

export type TBadgeAnchorOrigin = {
  vertical?: 'top' | 'bottom';
  horizontal?: 'left' | 'right';
};

export type TBadgeProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  'color' | 'children'
> & {
  children?: ReactNode;
  badgeContent?: ReactNode;
  color?: TPaletteColor;
  variant?: TBadgeVariant;
  size?: TBadgeSize;
  max?: number;
  showZero?: boolean;
  invisible?: boolean;
  overlap?: TBadgeOverlap;
  anchorOrigin?: TBadgeAnchorOrigin;
};

export type TSBadgeProps = {
  color: TPaletteColor;
  variant: TBadgeVariant;
  size: TBadgeSize;
  isDot: boolean;
  invisible: boolean;
  overlap: TBadgeOverlap;
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'right';
};
