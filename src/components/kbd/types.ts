import { ElementType, ReactNode } from 'react';
import type { TPolymorphicProps } from '../../helpers/polymorphic';
import { TPaletteColor } from '../../theme/types';

export type TKbdVariant = 'raised' | 'outline' | 'subtle' | 'plain';

export type TKbdSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TKbdOwnProps = {
  children?: ReactNode;
  variant?: TKbdVariant;
  size?: TKbdSize;
  color?: TPaletteColor;
};

export type TKbdProps<C extends ElementType = 'kbd'> = TPolymorphicProps<
  C,
  TKbdOwnProps
>;
