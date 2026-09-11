import { createContext, useContext } from 'react';
import type { TTreeViewAppearance } from './types';

export const defaultTreeViewAppearance: TTreeViewAppearance = {
  size: 'md',
  variant: 'subtle',
  color: 'primary',
};

export const TreeViewAppearanceContext = createContext<TTreeViewAppearance>(
  defaultTreeViewAppearance,
);

export const useTreeViewAppearance = () => useContext(TreeViewAppearanceContext);
