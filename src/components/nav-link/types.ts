import { ElementType, ReactNode } from 'react';
import type { TPolymorphicProps } from '../../helpers/polymorphic';

export type TNavLinkOwnProps = {
  children?: ReactNode;
  /** Marks this as the current page — sets `aria-current="page"`, which is
   * what components like Button react to for their "selected" look when
   * rendered `as={NavLink}`. */
  active?: boolean;
};

export type TNavLinkProps<C extends ElementType = 'a'> = TPolymorphicProps<
  C,
  TNavLinkOwnProps
>;
