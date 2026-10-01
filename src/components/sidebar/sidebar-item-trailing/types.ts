import { HTMLAttributes, ReactNode } from 'react';
import { TSidebarShowTrailing } from '../types';

export type TSidebarItemTrailingProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  /** Overrides the item's `showTrailing` for this slot — e.g. a count chip
   * that's always shown next to actions that only appear on hover. */
  show?: TSidebarShowTrailing;
};
