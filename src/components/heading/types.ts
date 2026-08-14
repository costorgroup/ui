import { ReactNode } from 'react';
import type { TPolymorphicProps } from '../../helpers/polymorphic';
import { TPaletteColor } from '../../theme/types';

export type THeadingAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type THeadingOwnProps = {
  children?: ReactNode;
  color?: TPaletteColor;
};

export type THeadingProps<C extends THeadingAs = 'h1'> = TPolymorphicProps<
  C,
  THeadingOwnProps
>;
