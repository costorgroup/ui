import { ReactNode } from 'react';
import type { TPolymorphicProps } from '../../../../helpers/polymorphic';
import type { THeadingAs } from '../../heading/types';
import { TPaletteColor } from '../../../../theme/types';

export type TModalTitleAs = THeadingAs;

export type TModalTitleOwnProps = {
  children?: ReactNode;
  color?: TPaletteColor;
};

export type TModalTitleProps<C extends TModalTitleAs = 'h4'> =
  TPolymorphicProps<C, TModalTitleOwnProps>;
