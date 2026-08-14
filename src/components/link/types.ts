import { ElementType, ReactNode } from 'react';
import type { TPolymorphicProps } from '../../helpers/polymorphic';
import { TPaletteColor } from '../../theme/types';

export type TLinkVariant = 'underline' | 'hover' | 'plain';
export type TLinkSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TLinkOwnProps = {
  children?: ReactNode;
  color?: TPaletteColor;
  variant?: TLinkVariant;
  size?: TLinkSize;
};

export type TLinkProps<C extends ElementType = 'a'> = TPolymorphicProps<
  C,
  TLinkOwnProps
>;
