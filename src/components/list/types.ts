import { HTMLAttributes, ReactNode } from 'react';
import type { THeadingAs } from '../heading/types';
import type { TPaletteColor } from '../../theme/types';

export type TListStyle = 'ordered' | 'unordered' | 'none';
export type TListSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TListProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'color' | 'title'
> & {
  children?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  titleAs?: THeadingAs;
  listStyle?: TListStyle;
  size?: TListSize;
  color?: TPaletteColor;
};

export type TSListRootProps = {
  size?: TListSize;
  color?: TPaletteColor;
};

export type TSListItemsProps = {
  listStyle: TListStyle;
  size?: TListSize;
  color?: TPaletteColor;
};
