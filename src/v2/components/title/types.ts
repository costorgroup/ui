import { ReactNode } from 'react';
import type { TPolymorphicProps } from '../../../helpers/polymorphic';
import { TPaletteColor } from '../../../theme/types';

export type TTitleAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type TTitleOwnProps = {
  children?: ReactNode;
  color?: TPaletteColor;
};

export type TTitleProps<C extends TTitleAs = 'h1'> = TPolymorphicProps<
  C,
  TTitleOwnProps
>;
