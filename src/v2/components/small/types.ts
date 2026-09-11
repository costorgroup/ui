import { ElementType, ReactNode } from 'react';
import type { TPolymorphicProps } from '../../../helpers/polymorphic';
import { TPaletteColor } from '../../../theme/types';

export type TSmallOwnProps = {
  children?: ReactNode;
  color?: TPaletteColor;
};

export type TSmallProps<C extends ElementType = 'small'> = TPolymorphicProps<
  C,
  TSmallOwnProps
>;
