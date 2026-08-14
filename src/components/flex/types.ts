import { CSSProperties, ElementType, ReactNode } from 'react';
import type { TPolymorphicProps } from '../../helpers/polymorphic';
import { TGap } from '../../theme/types';

export type TFlexGap = TGap | number | (string & {});

export type TFlexOwnProps = {
  children?: ReactNode;
  direction?: CSSProperties['flexDirection'];
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  wrap?: CSSProperties['flexWrap'];
  alignContent?: CSSProperties['alignContent'];
  grow?: CSSProperties['flexGrow'];
  shrink?: CSSProperties['flexShrink'];
  basis?: CSSProperties['flexBasis'];
  gap?: TFlexGap;
  inline?: boolean;
};

export type TFlexProps<C extends ElementType = 'div'> = TPolymorphicProps<
  C,
  TFlexOwnProps
>;
