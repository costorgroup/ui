import { ElementType, ReactNode } from 'react';
import type { TPolymorphicProps } from '../../../helpers/polymorphic';
import { TTextSize } from '../../text/types';

export type TBlockquoteContentOwnProps = {
  children?: ReactNode;
  size?: TTextSize;
};

export type TBlockquoteContentProps<C extends ElementType = 'p'> = TPolymorphicProps<
  C,
  TBlockquoteContentOwnProps
>;
