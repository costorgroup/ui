import React, {
  forwardRef,
  KeyboardEvent,
  useMemo,
} from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import {
  defaultTreeViewAppearance,
  TreeViewAppearanceContext,
  useTreeViewAppearance,
} from './appearance-context';
import { treeViewClasses } from './classes';
import type { TreeNode } from './collection';
import {
  TreeViewNodeContext,
  TreeViewStoreContext,
  useTreeViewContext,
  useTreeViewNodeContext,
} from './context';
import {
  STreeViewBranch,
  STreeViewBranchContent,
  STreeViewBranchControl,
  STreeViewBranchIndentGuide,
  STreeViewBranchIndicator,
  STreeViewBranchText,
  STreeViewBranchTrigger,
  STreeViewItem,
  STreeViewItemIndicator,
  STreeViewItemText,
  STreeViewLabel,
  STreeViewNodeCheckbox,
  STreeViewNodeRenameInput,
  STreeViewRoot,
  STreeViewTree,
} from './styles';
import type {
  TTreeViewAppearanceProps,
  TTreeViewBranchContentProps,
  TTreeViewBranchControlProps,
  TTreeViewBranchIndentGuideProps,
  TTreeViewBranchIndicatorProps,
  TTreeViewBranchProps,
  TTreeViewBranchTextProps,
  TTreeViewBranchTriggerProps,
  TTreeViewItemIndicatorProps,
  TTreeViewItemProps,
  TTreeViewItemTextProps,
  TTreeViewLabelProps,
  TTreeViewNodeCheckboxProps,
  TTreeViewNodeProviderProps,
  TTreeViewNodeRenameInputProps,
  TTreeViewRootProps,
  TTreeViewRootProviderProps,
  TTreeViewTreeProps,
  TUseTreeViewReturn,
} from './types';
import { useTreeView } from './use-tree-view';

const dataAttr = (on: boolean | undefined) => (on ? '' : undefined);

const useResolvedAppearance = ({
  size,
  variant,
  color,
}: TTreeViewAppearanceProps) =>
  useMemo(
    () => ({
      size: size ?? defaultTreeViewAppearance.size,
      variant: variant ?? defaultTreeViewAppearance.variant,
      color: color ?? defaultTreeViewAppearance.color,
    }),
    [color, size, variant],
  );

const TreeViewRoot = forwardRef<HTMLDivElement, TTreeViewRootProps>(
  (
    {
      size,
      variant,
      color,
      className,
      children,
      collection,
      expandedValue,
      defaultExpandedValue,
      onExpandedChange,
      selectedValue,
      defaultSelectedValue,
      onSelectionChange,
      focusedValue,
      defaultFocusedValue,
      onFocusChange,
      checkedValue,
      defaultCheckedValue,
      onCheckedChange,
      selectionMode,
      expandOnClick,
      typeahead,
      ...props
    },
    ref,
  ) => {
    const appearance = useResolvedAppearance({ size, variant, color });
    const tree = useTreeView({
      collection,
      expandedValue,
      defaultExpandedValue,
      onExpandedChange,
      selectedValue,
      defaultSelectedValue,
      onSelectionChange,
      focusedValue,
      defaultFocusedValue,
      onFocusChange,
      checkedValue,
      defaultCheckedValue,
      onCheckedChange,
      selectionMode,
      expandOnClick,
      typeahead,
    });

    return (
      <TreeViewAppearanceContext.Provider value={appearance}>
        <TreeViewStoreContext.Provider value={tree}>
          <STreeViewRoot
            ref={ref}
            id={tree.treeId}
            {...props}
            className={mergeClasses(treeViewClasses.root, className)}
          >
            {children}
          </STreeViewRoot>
        </TreeViewStoreContext.Provider>
      </TreeViewAppearanceContext.Provider>
    );
  },
);
TreeViewRoot.displayName = 'TreeViewRoot';

const TreeViewRootProvider = forwardRef<HTMLDivElement, TTreeViewRootProviderProps>(
  ({ size, variant, color, className, children, value, ...props }, ref) => {
    const appearance = useResolvedAppearance({ size, variant, color });

    return (
      <TreeViewAppearanceContext.Provider value={appearance}>
        <TreeViewStoreContext.Provider value={value}>
          <STreeViewRoot
            ref={ref}
            id={value.treeId}
            {...props}
            className={mergeClasses(treeViewClasses.root, className)}
          >
            {children}
          </STreeViewRoot>
        </TreeViewStoreContext.Provider>
      </TreeViewAppearanceContext.Provider>
    );
  },
);
TreeViewRootProvider.displayName = 'TreeViewRootProvider';

const TreeViewTree = forwardRef<HTMLDivElement, TTreeViewTreeProps>(
  ({ className, onKeyDown, ...props }, ref) => {
    const appearance = useTreeViewAppearance();
    const tree = useTreeViewContext();

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);

      if (event.defaultPrevented) {
        return;
      }

      const target = event.target as HTMLElement | null;

      if (target?.closest('input, textarea')) {
        return;
      }

      const nodeEl = target?.closest(
        '[data-part="branch-control"], [data-part="item"]',
      ) as HTMLElement | null;
      const value = nodeEl?.dataset.value;

      if (!value) {
        return;
      }

      const isBranch = nodeEl.dataset.part === 'branch-control';
      const visible = tree.getVisibleNodes().map((item) => item.value);
      const index = visible.indexOf(value);
      const node = tree.collection.findNode(value);
      const expanded = tree.expandedValue.includes(value);

      const move = (nextIndex: number) => {
        const next = visible[nextIndex];

        if (next) {
          event.preventDefault();
          tree.focus(next);
        }
      };

      switch (event.key) {
        case 'ArrowDown':
          move(index + 1);
          return;
        case 'ArrowUp':
          move(index - 1);
          return;
        case 'Home':
          move(0);
          return;
        case 'End':
          move(visible.length - 1);
          return;
        case 'ArrowRight':
          if (isBranch && !expanded) {
            event.preventDefault();
            tree.expand([value]);
          }
          return;
        case 'ArrowLeft':
          if (isBranch && expanded) {
            event.preventDefault();
            tree.collapse([value]);
            return;
          }

          if (node) {
            const parent = tree.collection.getParentNode(value);

            if (parent && !tree.collection.isRootNode(parent)) {
              event.preventDefault();
              tree.focus(tree.collection.getNodeValue(parent));
            }
          }
          return;
        case 'Enter':
        case ' ':
          event.preventDefault();
          tree.select(value, {
            shiftKey: event.shiftKey,
            ctrlKey: event.metaKey || event.ctrlKey,
          });

          if (isBranch && tree.expandOnClick) {
            tree.toggleExpanded(value);
          }
          return;
        default:
          if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
            tree.searchTypeahead(event.key, value);
          }
      }
    };

    return (
      <STreeViewTree
        ref={ref}
        id={`${tree.treeId}-tree`}
        role="tree"
        tabIndex={-1}
        size={appearance.size}
        aria-multiselectable={
          tree.selectionMode === 'multiple' ? true : undefined
        }
        {...props}
        className={mergeClasses(treeViewClasses.tree, className)}
        onKeyDown={handleKeyDown}
      />
    );
  },
);
TreeViewTree.displayName = 'TreeViewTree';

const TreeViewLabel = forwardRef<HTMLDivElement, TTreeViewLabelProps>(
  ({ className, ...props }, ref) => (
    <STreeViewLabel
      ref={ref}
      {...props}
      className={mergeClasses(treeViewClasses.label, className)}
    />
  ),
);
TreeViewLabel.displayName = 'TreeViewLabel';

const TreeViewNodeProvider = <T extends TreeNode>({
  node,
  indexPath,
  children,
}: TTreeViewNodeProviderProps<T>) => {
  const tree = useTreeViewContext();
  const nodeState = tree.getNodeState({ node, indexPath });

  return (
    <TreeViewNodeContext.Provider value={{ node, indexPath, nodeState }}>
      {children}
    </TreeViewNodeContext.Provider>
  );
};
TreeViewNodeProvider.displayName = 'TreeViewNodeProvider';

const TreeViewNodeContextRender = ({
  children,
}: {
  children: (nodeState: ReturnType<typeof useTreeViewNodeContext>['nodeState']) => React.ReactNode;
}) => children(useTreeViewNodeContext().nodeState);

const TreeViewContextRender = ({
  children,
}: {
  children: (tree: TUseTreeViewReturn) => React.ReactNode;
}) => children(useTreeViewContext());

const TreeViewBranch = forwardRef<HTMLDivElement, TTreeViewBranchProps>(
  ({ className, style, ...props }, ref) => {
    const { nodeState } = useTreeViewNodeContext();

    return (
      <STreeViewBranch
        ref={ref}
        role="treeitem"
        data-part="branch"
        data-value={nodeState.value}
        data-depth={nodeState.depth}
        data-selected={dataAttr(nodeState.selected)}
        data-disabled={dataAttr(nodeState.disabled)}
        data-state={nodeState.expanded ? 'open' : 'closed'}
        aria-level={nodeState.depth}
        aria-selected={nodeState.disabled ? undefined : nodeState.selected}
        aria-expanded={nodeState.expanded}
        aria-disabled={nodeState.disabled || undefined}
        style={{ ...style, ['--depth' as string]: nodeState.depth }}
        {...props}
        className={mergeClasses(treeViewClasses.branch, className)}
      />
    );
  },
);
TreeViewBranch.displayName = 'TreeViewBranch';

const TreeViewBranchContent = forwardRef<
  HTMLDivElement,
  TTreeViewBranchContentProps
>(({ className, ...props }, ref) => {
  const { nodeState } = useTreeViewNodeContext();

  return (
    <STreeViewBranchContent
      ref={ref}
      role="group"
      data-part="branch-content"
      data-state={nodeState.expanded ? 'open' : 'closed'}
      data-depth={nodeState.depth}
      hidden={!nodeState.expanded}
      {...props}
      className={mergeClasses(treeViewClasses.branchContent, className)}
    />
  );
});
TreeViewBranchContent.displayName = 'TreeViewBranchContent';

const TreeViewBranchControl = forwardRef<
  HTMLDivElement,
  TTreeViewBranchControlProps
>(({ className, style, onClick, onFocus, ...props }, ref) => {
  const appearance = useTreeViewAppearance();
  const tree = useTreeViewContext();
  const { nodeState } = useTreeViewNodeContext();

  return (
    <STreeViewBranchControl
      ref={ref}
      {...props}
      role="button"
      tabIndex={nodeState.focused ? 0 : -1}
      data-part="branch-control"
      data-value={nodeState.value}
      data-depth={nodeState.depth}
      data-selected={dataAttr(nodeState.selected)}
      data-disabled={dataAttr(nodeState.disabled)}
      data-focus={dataAttr(nodeState.focused)}
      data-state={nodeState.expanded ? 'open' : 'closed'}
      variant={appearance.variant}
      color={appearance.color}
      style={{ ...style, ['--depth' as string]: nodeState.depth }}
      className={mergeClasses(treeViewClasses.branchControl, className)}
      onFocus={(event) => {
        onFocus?.(event);
        tree.focus(nodeState.value);
      }}
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented || nodeState.disabled) {
          return;
        }

        tree.select(nodeState.value, {
          shiftKey: event.shiftKey,
          ctrlKey: event.metaKey || event.ctrlKey,
        });

        if (tree.expandOnClick) {
          tree.toggleExpanded(nodeState.value);
        }
      }}
    />
  );
});
TreeViewBranchControl.displayName = 'TreeViewBranchControl';

const TreeViewBranchIndentGuide = forwardRef<
  HTMLDivElement,
  TTreeViewBranchIndentGuideProps
>(({ className, style, ...props }, ref) => {
  const { nodeState } = useTreeViewNodeContext();

  return (
    <STreeViewBranchIndentGuide
      ref={ref}
      data-part="branch-indent-guide"
      data-depth={nodeState.depth}
      style={{ ...style, ['--depth' as string]: nodeState.depth }}
      {...props}
      className={mergeClasses(treeViewClasses.branchIndentGuide, className)}
    />
  );
});
TreeViewBranchIndentGuide.displayName = 'TreeViewBranchIndentGuide';

const TreeViewBranchIndicator = forwardRef<
  HTMLDivElement,
  TTreeViewBranchIndicatorProps
>(({ className, ...props }, ref) => {
  const { nodeState } = useTreeViewNodeContext();

  return (
    <STreeViewBranchIndicator
      ref={ref}
      aria-hidden
      data-part="branch-indicator"
      data-state={nodeState.expanded ? 'open' : 'closed'}
      data-selected={dataAttr(nodeState.selected)}
      data-disabled={dataAttr(nodeState.disabled)}
      {...props}
      className={mergeClasses(treeViewClasses.branchIndicator, className)}
    />
  );
});
TreeViewBranchIndicator.displayName = 'TreeViewBranchIndicator';

const TreeViewBranchText = forwardRef<HTMLSpanElement, TTreeViewBranchTextProps>(
  ({ className, ...props }, ref) => (
    <STreeViewBranchText
      ref={ref}
      data-part="branch-text"
      {...props}
      className={mergeClasses(treeViewClasses.branchText, className)}
    />
  ),
);
TreeViewBranchText.displayName = 'TreeViewBranchText';

const TreeViewBranchTrigger = forwardRef<
  HTMLButtonElement,
  TTreeViewBranchTriggerProps
>(({ className, onClick, ...props }, ref) => {
  const tree = useTreeViewContext();
  const { nodeState } = useTreeViewNodeContext();

  return (
    <STreeViewBranchTrigger
      ref={ref}
      type="button"
      data-part="branch-trigger"
      data-state={nodeState.expanded ? 'open' : 'closed'}
      data-disabled={dataAttr(nodeState.disabled)}
      disabled={nodeState.disabled}
      {...props}
      className={mergeClasses(treeViewClasses.branchTrigger, className)}
      onClick={(event) => {
        onClick?.(event);
        event.stopPropagation();

        if (event.defaultPrevented || nodeState.disabled) {
          return;
        }

        tree.toggleExpanded(nodeState.value);
      }}
    />
  );
});
TreeViewBranchTrigger.displayName = 'TreeViewBranchTrigger';

const TreeViewItem = forwardRef<HTMLDivElement, TTreeViewItemProps>(
  ({ className, style, onClick, onFocus, ...props }, ref) => {
    const appearance = useTreeViewAppearance();
    const tree = useTreeViewContext();
    const { nodeState } = useTreeViewNodeContext();

    return (
      <STreeViewItem
        ref={ref}
        {...props}
        role="treeitem"
        tabIndex={nodeState.focused ? 0 : -1}
        data-part="item"
        data-value={nodeState.value}
        data-depth={nodeState.depth}
        data-selected={dataAttr(nodeState.selected)}
        data-disabled={dataAttr(nodeState.disabled)}
        data-focus={dataAttr(nodeState.focused)}
        aria-level={nodeState.depth}
        aria-selected={nodeState.disabled ? undefined : nodeState.selected}
        aria-disabled={nodeState.disabled || undefined}
        variant={appearance.variant}
        color={appearance.color}
        style={{ ...style, ['--depth' as string]: nodeState.depth }}
        className={mergeClasses(treeViewClasses.item, className)}
        onFocus={(event) => {
          onFocus?.(event);
          tree.focus(nodeState.value);
        }}
        onClick={(event) => {
          onClick?.(event);

          if (event.defaultPrevented || nodeState.disabled) {
            return;
          }

          tree.select(nodeState.value, {
            shiftKey: event.shiftKey,
            ctrlKey: event.metaKey || event.ctrlKey,
          });
        }}
      />
    );
  },
);
TreeViewItem.displayName = 'TreeViewItem';

const TreeViewItemText = forwardRef<HTMLSpanElement, TTreeViewItemTextProps>(
  ({ className, ...props }, ref) => (
    <STreeViewItemText
      ref={ref}
      data-part="item-text"
      {...props}
      className={mergeClasses(treeViewClasses.itemText, className)}
    />
  ),
);
TreeViewItemText.displayName = 'TreeViewItemText';

const TreeViewItemIndicator = forwardRef<
  HTMLDivElement,
  TTreeViewItemIndicatorProps
>(({ className, ...props }, ref) => {
  const { nodeState } = useTreeViewNodeContext();

  return (
    <STreeViewItemIndicator
      ref={ref}
      aria-hidden
      data-part="item-indicator"
      data-selected={dataAttr(nodeState.selected)}
      hidden={!nodeState.selected}
      {...props}
      className={mergeClasses(treeViewClasses.itemIndicator, className)}
    />
  );
});
TreeViewItemIndicator.displayName = 'TreeViewItemIndicator';

const TreeViewNodeCheckbox = forwardRef<
  HTMLDivElement,
  TTreeViewNodeCheckboxProps
>(({ className, onClick, ...props }, ref) => {
  const tree = useTreeViewContext();
  const { nodeState } = useTreeViewNodeContext();
  const checkedState =
    nodeState.checked === true
      ? 'checked'
      : nodeState.checked === 'indeterminate'
        ? 'indeterminate'
        : 'unchecked';

  return (
    <STreeViewNodeCheckbox
      ref={ref}
      role="checkbox"
      tabIndex={-1}
      data-part="node-checkbox"
      data-state={checkedState}
      aria-checked={
        nodeState.checked === 'indeterminate' ? 'mixed' : nodeState.checked
      }
      data-disabled={dataAttr(nodeState.disabled)}
      {...props}
      className={mergeClasses(treeViewClasses.nodeCheckbox, className)}
      onClick={(event) => {
        onClick?.(event);
        event.stopPropagation();

        if (event.defaultPrevented || nodeState.disabled) {
          return;
        }

        tree.toggleChecked(nodeState.value, nodeState.isBranch);
      }}
    />
  );
});
TreeViewNodeCheckbox.displayName = 'TreeViewNodeCheckbox';

const TreeViewNodeRenameInput = forwardRef<
  HTMLInputElement,
  TTreeViewNodeRenameInputProps
>(({ className, ...props }, ref) => (
  <STreeViewNodeRenameInput
    ref={ref}
    data-part="node-rename-input"
    {...props}
    className={mergeClasses(treeViewClasses.nodeRenameInput, className)}
  />
));
TreeViewNodeRenameInput.displayName = 'TreeViewNodeRenameInput';

export {
  TreeViewRoot,
  TreeViewRootProvider,
  TreeViewTree,
  TreeViewLabel,
  TreeViewNodeProvider,
  TreeViewNodeContextRender,
  TreeViewContextRender,
  TreeViewBranch,
  TreeViewBranchContent,
  TreeViewBranchControl,
  TreeViewBranchIndentGuide,
  TreeViewBranchIndicator,
  TreeViewBranchText,
  TreeViewBranchTrigger,
  TreeViewItem,
  TreeViewItemText,
  TreeViewItemIndicator,
  TreeViewNodeCheckbox,
  TreeViewNodeRenameInput,
};
