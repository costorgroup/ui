import { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react';
import type { TPolymorphicProps } from '../../../helpers/polymorphic';
import type { TSlotProps } from '../../../helpers/slot-props';
import { TPaletteColor } from '../../../theme/types';
import {
  TSidebarRadius,
  TSidebarShowTrailing,
  TSidebarSize,
  TSidebarVariant,
} from '../types';

export type TSidebarItemSlotProps = TSlotProps<{
  /** The row wrapper — holds the clickable element and the trailing slot
   * side by side (so trailing buttons are never nested inside it). */
  root: HTMLAttributes<HTMLDivElement>;
}>;

export type TSidebarItemOwnProps = {
  children?: ReactNode;
  /** Current route / selected item. Sets `aria-current`. */
  active?: boolean;
  /** Buttons get the native attribute; links get `aria-disabled`, leave the
   * tab order and swallow clicks. */
  disabled?: boolean;
  /** When `SidebarItemTrailing` shows. Defaults to Sidebar's (`always`). */
  showTrailing?: TSidebarShowTrailing;
  /** Overrides Sidebar's `variant` (default `subtle`). */
  variant?: TSidebarVariant;
  /** Overrides Sidebar's `radius` (default `sm`). */
  radius?: TSidebarRadius;
  /** Overrides Sidebar's `color`. */
  color?: TPaletteColor;
  /** Applied to the row wrapper, not the clickable element. */
  className?: string;
  /** Applied to the row wrapper, not the clickable element. */
  style?: CSSProperties;
  slotProps?: TSidebarItemSlotProps;
};

/**
 * A button by default (`onClick`), or `as={Link}` (Next, React Router, …)
 * with `href`/`to` to navigate — or both. All props except `className`,
 * `style` and `slotProps` go to that clickable element, including `ref`.
 */
export type TSidebarItemProps<C extends ElementType = 'button'> =
  TPolymorphicProps<C, TSidebarItemOwnProps>;

export type TSSidebarItemProps = {
  radius: TSidebarRadius;
  variant: TSidebarVariant;
  size: TSidebarSize;
  color?: TPaletteColor;
};
