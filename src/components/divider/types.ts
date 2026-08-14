import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../theme/types';

export type TDividerOrientation = 'horizontal' | 'vertical';
export type TDividerVariant = 'solid' | 'dashed' | 'dotted';
export type TDividerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TDividerProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color' | 'children'
> & {
  children?: ReactNode;
  orientation?: TDividerOrientation;
  variant?: TDividerVariant;
  size?: TDividerSize;
  color?: TPaletteColor;
};

export type TSDividerProps = {
  orientation: TDividerOrientation;
  variant: TDividerVariant;
  size: TDividerSize;
  color: TPaletteColor;
  labeled: boolean;
};
