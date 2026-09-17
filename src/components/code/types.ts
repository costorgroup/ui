import { ElementType, ReactNode } from 'react';
import type { TPolymorphicProps } from '../../helpers/polymorphic';
import { TPaletteColor } from '../../theme/types';
import type { TStaticVariant } from '../../helpers/variant-styles/types';

export type TCodeVariant = TStaticVariant;

export type TCodeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TCodeOwnProps = {
  children?: ReactNode;
  variant?: TCodeVariant;
  size?: TCodeSize;
  color?: TPaletteColor;
};

export type TCodeProps<C extends ElementType = 'code'> = TPolymorphicProps<
  C,
  TCodeOwnProps
>;
