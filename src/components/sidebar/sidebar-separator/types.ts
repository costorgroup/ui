import { CSSProperties } from 'react';
import type { TDividerProps } from '../../divider/types';
import { TSidebarSize } from '../types';

/** Divider props (variant, size, color, optional label as children). The
 * line is 1px (`size="xs"`) by default. */
export type TSidebarSeparatorProps = Omit<TDividerProps, 'orientation'> & {
  /** Applied to the spacing wrapper, not the line. */
  className?: string;
  /** Applied to the spacing wrapper, not the line. */
  style?: CSSProperties;
};

export type TSSidebarSeparatorProps = {
  size: TSidebarSize;
  collapsed: boolean;
};
