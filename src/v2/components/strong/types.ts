import { ElementType, ReactNode } from 'react';
import type { TPolymorphicProps } from '../../../helpers/polymorphic';

export type TStrongOwnProps = {
  children?: ReactNode;
};

export type TStrongProps<C extends ElementType = 'strong'> = TPolymorphicProps<
  C,
  TStrongOwnProps
>;
