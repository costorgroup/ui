import { ElementType, ReactNode } from 'react';
import type { TPolymorphicProps } from '../../helpers/polymorphic';
import { TThemeRadius } from '../../theme/types';

export type TCardRadius = keyof TThemeRadius;

export type TCardOwnProps = {
  children?: ReactNode;
  radius?: TCardRadius;
};

export type TCardProps<C extends ElementType = 'div'> = TPolymorphicProps<
  C,
  TCardOwnProps
>;

export type TSCardProps = {
  radius: TCardRadius;
};
