import { ElementType, ReactNode } from 'react';
import type { TPolymorphicProps } from '../../../helpers/polymorphic';
import { TPaletteColor } from '../../../theme/types';

export type THighlightVariant = 'solid' | 'subtle' | 'surface';

export type THighlightOwnProps = {
  children?: ReactNode;
  color?: TPaletteColor;
  variant?: THighlightVariant;
};

export type THighlightProps<C extends ElementType = 'span'> = TPolymorphicProps<
  C,
  THighlightOwnProps
>;
