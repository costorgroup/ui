import { HTMLAttributes, ReactNode } from 'react';
import { TPaletteColor } from '../../theme/types';
import { TListSize } from '../list/types';
import { TListVariant } from '../list/variant-styles';

export type TListItemProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
  children?: ReactNode;
};

export type TSListItemProps = {
  color: TPaletteColor;
  variant: TListVariant;
  size: TListSize;
};
