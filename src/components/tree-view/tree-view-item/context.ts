import { createContext, SyntheticEvent } from 'react';

export type TTreeViewItemContextValue = {
  expanded: boolean;
  toggle: (event: SyntheticEvent) => void;
  disabled: boolean;
};

export const TreeViewItemContext =
  createContext<TTreeViewItemContextValue | null>(null);
