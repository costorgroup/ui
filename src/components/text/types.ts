import { ElementType, ReactNode } from 'react';
import type { TPolymorphicProps } from '../../helpers/polymorphic';
import { TPaletteColor } from '../../theme/types';

export type TTextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TTextOwnProps = {
  children?: ReactNode;
  color?: TPaletteColor;
  size?: TTextSize;
};

export type TTextProps<C extends ElementType = 'p'> = TPolymorphicProps<
  C,
  TTextOwnProps
>;
