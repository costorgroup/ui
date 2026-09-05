import { createContext, useContext } from 'react';
import type { TreeNode } from './collection';
import type {
  TTreeViewNodeProviderProps,
  TTreeViewNodeState,
  TUseTreeViewReturn,
} from './types';

export type TTreeViewNodeContextValue<T extends TreeNode = TreeNode> = {
  node: T;
  indexPath: number[];
  nodeState: TTreeViewNodeState;
};

export const TreeViewStoreContext = createContext<TUseTreeViewReturn | null>(
  null,
);

export const TreeViewNodeContext = createContext<TTreeViewNodeContextValue | null>(
  null,
);

export const useTreeViewContext = () => {
  const value = useContext(TreeViewStoreContext);

  if (!value) {
    throw new Error('TreeView components must be used within TreeView.Root');
  }

  return value;
};

export const useTreeViewNodeContext = () => {
  const value = useContext(TreeViewNodeContext);

  if (!value) {
    throw new Error(
      'TreeView node parts must be used within TreeView.NodeProvider',
    );
  }

  return value;
};

export type { TTreeViewNodeProviderProps };
