import { createContext } from 'react';
import { TPaletteColor } from '../../../theme/types';

export type TTableSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TTableContextValue = {
  size: TTableSize;
  color: TPaletteColor;
};

export type TTableSectionContextValue = {
  isHead: boolean;
};

export const TableContext = createContext<TTableContextValue | null>(null);

export const TableSectionContext =
  createContext<TTableSectionContextValue | null>(null);
