import { CSSProperties, ElementType, ReactNode } from 'react';
import type { TPolymorphicProps } from '../../../helpers/polymorphic';
import { TBreakpoint, TGap } from '../../../theme/types';

export type TGridGap = TGap | number | (string & {});
export type TGridTrack = number | 'auto';
export type TGridTemplateTrack = string | number;
export type TGridTemplate =
  | CSSProperties['gridTemplateColumns']
  | readonly TGridTemplateTrack[];

export type TGridOwnProps = {
  children?: ReactNode;
  columns?: TGridTrack;
  rows?: TGridTrack;
  /** CSS template or track list. Overrides `columns` when set. */
  templateColumns?: TGridTemplate;
  /** CSS template or track list. Overrides `rows` when set. */
  templateRows?: TGridTemplate;
  gap?: TGridGap;
  alignItems?: CSSProperties['alignItems'];
  justifyItems?: CSSProperties['justifyItems'];
  /** Below this breakpoint, every child spans one full row (ignores cell spans). */
  minChildWidth?: TBreakpoint;
};

export type TGridProps<C extends ElementType = 'div'> = TPolymorphicProps<
  C,
  TGridOwnProps
>;
