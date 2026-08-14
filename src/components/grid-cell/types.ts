import { CSSProperties, ElementType, ReactNode } from 'react';
import type { TPolymorphicProps } from '../../helpers/polymorphic';

export type TGridCellOwnProps = {
  children?: ReactNode;
  colSpan?: number;
  rowSpan?: number;
  alignSelf?: CSSProperties['alignSelf'];
  justifySelf?: CSSProperties['justifySelf'];
};

export type TGridCellProps<C extends ElementType = 'div'> = TPolymorphicProps<
  C,
  TGridCellOwnProps
>;
