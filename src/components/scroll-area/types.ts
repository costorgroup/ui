import { ElementType, ReactNode } from 'react';
import type { TPolymorphicProps } from '../../helpers/polymorphic';
import { TPaletteColor } from '../../theme/types';

export type TScrollAreaMode = 'always' | 'hover';

export type TScrollAreaOwnProps = {
  children?: ReactNode;
  mode?: TScrollAreaMode;
  color?: TPaletteColor;
};

export type TScrollAreaProps<C extends ElementType = 'div'> = TPolymorphicProps<
  C,
  TScrollAreaOwnProps
>;
