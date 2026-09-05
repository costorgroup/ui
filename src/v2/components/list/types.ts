import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../../theme/types';
import { TWindowRadius } from '../window/types';
import { TListVariant } from './variant-styles';

export type TListSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TListProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
  children?: ReactNode;
  color?: TPaletteColor;
  variant?: TListVariant;
  size?: TListSize;
  radius?: TWindowRadius;
};

export type TSListProps = {
  color: TPaletteColor;
  variant: TListVariant;
  radius: TWindowRadius;
};
