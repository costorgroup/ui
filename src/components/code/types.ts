import { ElementType, ReactNode } from 'react';
import type { TPolymorphicProps } from '../../helpers/polymorphic';
import { TPaletteColor } from '../../theme/types';

export type TCodeVariant = 'solid' | 'subtle' | 'surface' | 'outline' | 'plain';

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
