import { createContext, SyntheticEvent } from 'react';
import { TPaletteColor } from '../../theme/types';

export type TTreeViewSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TTreeViewValue = string | number;

export type TTreeViewContextValue = {
  level: number;
  selected: TTreeViewValue | null;
  select: (event: SyntheticEvent | Event, value?: TTreeViewValue | null) => void;
  size: TTreeViewSize;
  color: TPaletteColor;
};

export const TreeViewContext = createContext<TTreeViewContextValue | null>(
  null,
);
