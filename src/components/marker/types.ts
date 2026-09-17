import { ElementType, ReactNode } from 'react';
import type { TPolymorphicProps } from '../../helpers/polymorphic';
import { TPaletteColor } from '../../theme/types';

export type TMarkerVariant = 'default' | 'border' | 'separator';

export type TMarkerOwnProps = {
  children?: ReactNode;
  variant?: TMarkerVariant;
  color?: TPaletteColor;
};

export type TMarkerProps<C extends ElementType = 'div'> = TPolymorphicProps<
  C,
  TMarkerOwnProps
>;

export type TSMarkerProps = {
  variant: TMarkerVariant;
  color: TPaletteColor;
};
