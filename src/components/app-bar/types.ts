import { HTMLAttributes, ReactNode } from 'react';
import type {
  TAppBarPosition,
  TAppBarSize,
  TAppBarVariant,
} from './app-bar-base/types';
import type { TPaletteColor } from '../../theme/types';

export type { TAppBarPosition, TAppBarSize, TAppBarVariant };

export type TAppBarProps = Omit<
  HTMLAttributes<HTMLElement>,
  'color' | 'children' | 'title'
> & {
  logo?: ReactNode;
  children?: ReactNode;
  color?: TPaletteColor;
  variant?: TAppBarVariant;
  size?: TAppBarSize;
  position?: TAppBarPosition;
};
