import type { CSSObject } from '@emotion/react';
import { ElementType, ReactNode } from 'react';
import type { TPolymorphicProps } from '../../helpers/polymorphic';
import type { TTheme } from '../../theme/types';

export type TCStyle = CSSObject | ((theme: TTheme) => CSSObject);

export type TBoxOwnProps = {
  children?: ReactNode;
  cStyle?: TCStyle;
};

export type TBoxProps<C extends ElementType = 'div'> = TPolymorphicProps<
  C,
  TBoxOwnProps
>;
