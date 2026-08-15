import React, { forwardRef, useContext, useMemo } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { TreeViewContext } from '../context';
import { TreeViewItemContext } from '../tree-view-item/context';
import { treeViewBranchClasses } from './classes';
import { STreeViewBranch } from './styles';
import { TTreeViewBranchProps } from './types';

const TreeViewBranch = forwardRef<HTMLUListElement, TTreeViewBranchProps>(
  ({ children, className, hidden, ...props }, ref) => {
    const tree = useContext(TreeViewContext);
    const item = useContext(TreeViewItemContext);
    const expanded = item?.expanded ?? true;

    const nested = useMemo(
      () =>
        tree
          ? {
              ...tree,
              level: tree.level + 1,
            }
          : null,
      [tree],
    );
    const level = nested?.level ?? 1;

    const branch = (
      <STreeViewBranch
        ref={ref}
        role="group"
        level={level}
        hidden={hidden ?? !expanded}
        {...props}
        className={mergeClasses(treeViewBranchClasses.root, className)}
      >
        {children}
      </STreeViewBranch>
    );

    if (!nested) {
      return branch;
    }

    return (
      <TreeViewContext.Provider value={nested}>{branch}</TreeViewContext.Provider>
    );
  },
);

TreeViewBranch.displayName = 'TreeViewBranch';

export type { TTreeViewBranchProps };
export { treeViewBranchClasses } from './classes';
export { TreeViewBranch };
export default TreeViewBranch;
