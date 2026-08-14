import { ElementType, ReactNode } from 'react';
import type { TPolymorphicProps } from '../../helpers/polymorphic';
import { TGap } from '../../theme/types';

export type TFixedInset = TGap | number | (string & {});

export type TFixedOwnProps = {
  children?: ReactNode;
  top?: TFixedInset;
  right?: TFixedInset;
  bottom?: TFixedInset;
  left?: TFixedInset;
};

export type TFixedProps<C extends ElementType = 'div'> = TPolymorphicProps<
  C,
  TFixedOwnProps
>;
