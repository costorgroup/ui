import { ElementType, ReactNode } from 'react';
import type { TPolymorphicProps } from '../../helpers/polymorphic';
import { TPaletteColor } from '../../theme/types';

export type TEmOwnProps = {
  children?: ReactNode;
  color?: TPaletteColor;
};

export type TEmProps<C extends ElementType = 'em'> = TPolymorphicProps<
  C,
  TEmOwnProps
>;
