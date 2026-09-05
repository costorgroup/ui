import React, { cloneElement } from 'react';
import type { TreeNode } from './collection';
import { useTreeViewContext } from './context';
import {
  TreeViewBranch,
  TreeViewBranchContent,
  TreeViewNodeContextRender,
  TreeViewNodeProvider,
} from './parts';
import type { TTreeViewNodeProps } from './types';

export function TreeViewNode<T extends TreeNode>({
  render,
  indentGuide,
  renderBranch,
  branchProps,
  branchContentProps,
}: TTreeViewNodeProps<T>) {
  const tree = useTreeViewContext();

  const renderNode = (node: T, indexPath: number[]) => (
    <TreeViewNodeProvider key={indexPath.join('.')} node={node} indexPath={indexPath}>
      <TreeViewNodeContextRender>
        {(nodeState) => {
          if (nodeState.isBranch) {
            return (
              renderBranch?.({ node, indexPath, nodeState }) ?? (
                <TreeViewBranch {...branchProps}>
                  {render({ node, indexPath, nodeState })}
                  <TreeViewBranchContent {...branchContentProps}>
                    {indentGuide ? cloneElement(indentGuide) : null}
                    {tree.collection
                      .getNodeChildren(node)
                      .map((child, index) =>
                        renderNode(child as T, [...indexPath, index]),
                      )}
                  </TreeViewBranchContent>
                </TreeViewBranch>
              )
            );
          }

          return render({ node, indexPath, nodeState });
        }}
      </TreeViewNodeContextRender>
    </TreeViewNodeProvider>
  );

  return (
    <>
      {tree.collection
        .getNodeChildren(tree.collection.rootNode)
        .map((node, index) => renderNode(node as T, [index]))}
    </>
  );
}
