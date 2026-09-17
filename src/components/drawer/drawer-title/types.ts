import { ReactNode } from 'react';
import type { TPolymorphicProps } from '../../../helpers/polymorphic';
import type { THeadingAs } from '../../heading/types';
import { TPaletteColor } from '../../../theme/types';

export type TDrawerTitleAs = THeadingAs;

export type TDrawerTitleOwnProps = {
  children?: ReactNode;
  color?: TPaletteColor;
};

export type TDrawerTitleProps<C extends TDrawerTitleAs = 'h4'> =
  TPolymorphicProps<C, TDrawerTitleOwnProps>;
