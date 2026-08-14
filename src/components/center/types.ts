import { ElementType, ReactNode } from 'react';
import type { TPolymorphicProps } from '../../helpers/polymorphic';

export type TCenterAxis = 'horizontal' | 'vertical' | 'both';

export type TCenterOwnProps = {
  children?: ReactNode;
  absolute?: boolean;
  axis?: TCenterAxis;
  inline?: boolean;
};

export type TCenterProps<C extends ElementType = 'div'> = TPolymorphicProps<
  C,
  TCenterOwnProps
>;
