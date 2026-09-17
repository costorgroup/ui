import { ElementType, ReactNode } from 'react';
import type { TPolymorphicProps } from '../../../helpers/polymorphic';

export type TNavigationItemOwnProps = {
  children?: ReactNode;
  active?: boolean;
  disabled?: boolean;
  /** Renders the item as an expandable trigger that reveals this content
   * in a dropdown panel instead of navigating directly. */
  content?: ReactNode;
};

export type TNavigationItemProps<C extends ElementType = 'a'> =
  TPolymorphicProps<C, TNavigationItemOwnProps>;

export type TSNavigationItemPanelProps = {
  open: boolean;
  top: number;
  left: number;
};
