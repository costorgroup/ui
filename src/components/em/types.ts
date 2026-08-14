import { ElementType, ReactNode } from 'react';
import type { TPolymorphicProps } from '../../helpers/polymorphic';

export type TEmOwnProps = {
  children?: ReactNode;
};

export type TEmProps<C extends ElementType = 'em'> = TPolymorphicProps<
  C,
  TEmOwnProps
>;
