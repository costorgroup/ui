import { createContext } from 'react';
import { TPaletteColor } from '../../../theme/types';

export type TSectionAlign = 'left' | 'center' | 'right';

/** Path chrome on the section rail. */
export type TSectionVariant =
  /** Solid path nodes, no outer ring. */
  | 'dot'
  /** Path nodes with a soft double-size ring behind them. */
  | 'halo'
  /** Connector only — no path nodes. */
  | 'line'
  /** No path chrome (no nodes, no connector). */
  | 'none';

export type TSectionGroupContextValue = {
  align: TSectionAlign;
  color: TPaletteColor;
  variant: TSectionVariant;
  index: number;
  count: number;
};

export const SectionGroupContext =
  createContext<TSectionGroupContextValue | null>(null);
