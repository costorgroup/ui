import { ElementType, ReactNode } from 'react';
import type { TPolymorphicProps } from '../../helpers/polymorphic';
import { TPaletteColor } from '../../theme/types';

export type TShimmerOwnProps = {
  children?: ReactNode;
  /** `default` sweeps from muted to full ink — pass an accent to sweep
   * from muted to that color instead. */
  color?: TPaletteColor;
  /** Sweep duration in ms. */
  duration?: number;
};

export type TShimmerProps<C extends ElementType = 'span'> = TPolymorphicProps<
  C,
  TShimmerOwnProps
>;

export type TSShimmerProps = {
  color: TPaletteColor;
  duration: number;
};
