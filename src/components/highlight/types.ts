import { ElementType, ReactNode } from 'react';
import type { TPolymorphicProps } from '../../helpers/polymorphic';
import { TPaletteColor } from '../../theme/types';

export type THighlightOwnProps = {
  children?: ReactNode;
  color?: TPaletteColor;
};

export type THighlightProps<C extends ElementType = 'span'> = TPolymorphicProps<
  C,
  THighlightOwnProps
>;
