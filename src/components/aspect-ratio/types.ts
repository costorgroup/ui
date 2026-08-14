import { ElementType, ReactNode } from 'react';
import type { TPolymorphicProps } from '../../helpers/polymorphic';

export type TAspectRatioOwnProps = {
  children?: ReactNode;
  ratio?: number;
  maxWidth?: number | string;
  maxHeight?: number | string;
};

export type TAspectRatioProps<C extends ElementType = 'div'> =
  TPolymorphicProps<C, TAspectRatioOwnProps>;
