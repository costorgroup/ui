import { THeadingAs, THeadingOwnProps } from '../../heading/types';
import type { TPolymorphicProps } from '../../../helpers/polymorphic';

export type TCardTitleAs = THeadingAs;

export type TCardTitleOwnProps = THeadingOwnProps;

export type TCardTitleProps<C extends TCardTitleAs = 'h3'> = TPolymorphicProps<
  C,
  TCardTitleOwnProps
>;
