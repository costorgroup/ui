import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor, TThemeRadius } from '../../theme/types';
import { TListVariant } from './variant-styles';

export type TListSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TListRadius = keyof TThemeRadius;

export type TListProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
  children?: ReactNode;
  color?: TPaletteColor;
  variant?: TListVariant;
  size?: TListSize;
  radius?: TListRadius;
};

export type TSListProps = {
  color: TPaletteColor;
  variant: TListVariant;
  radius: TListRadius;
};
