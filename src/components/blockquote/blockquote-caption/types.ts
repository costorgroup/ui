import { ElementType, ReactNode } from 'react';
import type { TPolymorphicProps } from '../../../helpers/polymorphic';
import { TTextSize } from '../../text/types';

export type TBlockquoteCaptionOwnProps = {
  children?: ReactNode;
  size?: TTextSize;
};

export type TBlockquoteCaptionProps<C extends ElementType = 'p'> = TPolymorphicProps<
  C,
  TBlockquoteCaptionOwnProps
>;
