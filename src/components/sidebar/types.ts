import { ElementType, ReactNode } from 'react';
import type { TPolymorphicProps } from '../../helpers/polymorphic';
import { TGap, TPaletteColor, TThemeRadius } from '../../theme/types';

export type TSidebarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TSidebarRadius = keyof TThemeRadius;

/** Item idle / hover / active look. See sidebar-item/variant-styles. */
export type TSidebarVariant = 'subtle' | 'solid' | 'surface' | 'outline' | 'plain';

/** Theme gap key, spacing multiplier (number) or any CSS length. */
export type TSidebarSpacing = TGap | number | (string & {});

/** When an item's trailing slot is visible. `hover` also covers keyboard
 * focus and touch devices (no hover there, so it's always shown). Pass an
 * array to combine, e.g. `['hover', 'active']`. */
export type TSidebarTrailingVisibility = 'always' | 'hover' | 'active';

export type TSidebarShowTrailing =
  | TSidebarTrailingVisibility
  | TSidebarTrailingVisibility[];

export type TSidebarOwnProps = {
  children?: ReactNode;
  size?: TSidebarSize;
  /** Active item tint. Omit for the neutral chrome fill. */
  color?: TPaletteColor;
  /** Item corner radius (hover / active fill, focus ring). Default `sm`;
   * items can override. */
  radius?: TSidebarRadius;
  /** Item look: `subtle` (default) tinted fill, `solid` full fill,
   * `surface` tint + border, `outline` border only, `plain` text only.
   * Items can override. */
  variant?: TSidebarVariant;
  /** Space between items. None by default. */
  gap?: TSidebarSpacing;
  /** Inner padding. None by default — wrap in Panel for surface styling. */
  padding?: TSidebarSpacing;
  /** Default for every item; items can override. */
  showTrailing?: TSidebarShowTrailing;
  /** Icons only: every item becomes a square icon cell. Title/description
   * stay in the DOM (screen readers, Tooltip) but are visually hidden;
   * trailing slots are removed. */
  collapsed?: boolean;
};

export type TSidebarProps<C extends ElementType = 'nav'> = TPolymorphicProps<
  C,
  TSidebarOwnProps
>;

export type TSSidebarProps = {
  size: TSidebarSize;
  gap?: TSidebarSpacing;
  padding?: TSidebarSpacing;
  collapsed: boolean;
};
