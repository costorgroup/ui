import { ElementType, ReactNode } from 'react';
import type { TPolymorphicProps } from '../../helpers/polymorphic';
import { TBreakpoint } from '../../theme/types';

export type TContainerMaxWidth = TBreakpoint | false;

export type TContainerOwnProps = {
  children?: ReactNode;
  maxWidth?: TContainerMaxWidth;
  fixed?: boolean;
  disableGutters?: boolean;
};

export type TContainerProps<C extends ElementType = 'div'> = TPolymorphicProps<
  C,
  TContainerOwnProps
>;

export type TSContainerProps = {
  maxWidth: TContainerMaxWidth;
  fixed: boolean;
  disableGutters: boolean;
};
