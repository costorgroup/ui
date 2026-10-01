import { ElementType, ReactNode } from 'react';
import type { TPolymorphicProps } from '../../../helpers/polymorphic';
import { TPaletteColor } from '../../../theme/types';
import { TTabsAppearance, TTabsOrientation, TTabsVariant } from '../context';

export type TTabOwnProps = {
  value: string;
  children?: ReactNode;
  /** Buttons get the native attribute; other tags (links) get
   * `aria-disabled`, are removed from tab order and swallow clicks. */
  disabled?: boolean;
  /** Owned by Tabs. */
  color?: never;
  /** Owned by Tabs (`Tabs.draggable`). */
  draggable?: never;
};

/**
 * Render `as={Link}` (Next, React Router, …) to make the tab a navigation
 * link — clicks and indicator drags both go through the link's own click
 * handling, so the router navigates. Drive `Tabs.value` from the current
 * pathname.
 */
export type TTabProps<C extends ElementType = 'button'> = TPolymorphicProps<
  C,
  TTabOwnProps
>;

export type STabProps = {
  active: boolean;
  appearance: TTabsAppearance;
  variant: TTabsVariant;
  orientation: TTabsOrientation;
  fullWidth: boolean;
  draggable: boolean;
  dragging: boolean;
  selected: boolean;
  color?: TPaletteColor;
};
