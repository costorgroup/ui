import React, {
  Children,
  ReactNode,
  SyntheticEvent,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { TreeViewContext } from '../context';
import { treeViewItemClasses } from './classes';
import { TreeViewItemContext } from './context';
import { STreeViewItem, STreeViewItemContent } from './styles';
import { TTreeViewItemProps } from './types';

const isTreeViewBranch = (child: ReactNode) =>
  isValidElement(child) &&
  typeof child.type !== 'string' &&
  (child.type as { displayName?: string }).displayName === 'TreeViewBranch';

const TreeViewItem = forwardRef<HTMLLIElement, TTreeViewItemProps>(
  (
    {
      children,
      value,
      expanded: expandedProp,
      defaultExpanded = false,
      disabled = false,
      onChange,
      onClick,
      onDoubleClick,
      onKeyDown,
      className,
      ...props
    },
    ref,
  ) => {
    const tree = useContext(TreeViewContext);
    const isControlled = expandedProp !== undefined;
    const [uncontrolledExpanded, setUncontrolledExpanded] =
      useState(defaultExpanded);
    const expanded = isControlled ? Boolean(expandedProp) : uncontrolledExpanded;
    const selected = value != null && tree?.selected === value;
    const level = tree?.level ?? 0;
    const color = tree?.color ?? 'primary';

    const row: ReactNode[] = [];
    const branches: ReactNode[] = [];

    Children.forEach(children, (child) => {
      if (isTreeViewBranch(child)) {
        branches.push(child);
        return;
      }

      row.push(child);
    });

    const hasBranch = branches.length > 0;

    const toggle = useCallback(
      (event: SyntheticEvent) => {
        if (disabled || !hasBranch) {
          return;
        }

        const next = !expanded;

        if (!isControlled) {
          setUncontrolledExpanded(next);
        }

        onChange?.(event, next);
      },
      [disabled, expanded, hasBranch, isControlled, onChange],
    );

    const itemContext = useMemo(
      () => ({
        expanded,
        toggle,
        disabled,
      }),
      [disabled, expanded, toggle],
    );

    return (
      <TreeViewItemContext.Provider value={itemContext}>
        <STreeViewItem
          ref={ref}
          role="none"
          {...props}
          className={mergeClasses(
            treeViewItemClasses.root,
            selected && treeViewItemClasses.selected,
            expanded && treeViewItemClasses.expanded,
            disabled && treeViewItemClasses.disabled,
            className,
          )}
        >
          <STreeViewItemContent
            role="treeitem"
            tabIndex={disabled ? -1 : 0}
            aria-level={level + 1}
            aria-selected={selected}
            aria-expanded={hasBranch ? expanded : undefined}
            aria-disabled={disabled || undefined}
            level={level}
            selected={selected}
            disabled={disabled}
            color={color}
            className={treeViewItemClasses.content}
            onClick={(event) => {
              onClick?.(event);

              if (event.defaultPrevented || disabled) {
                return;
              }

              if (value != null) {
                tree?.select(event, value);
              }

              if (hasBranch) {
                toggle(event);
              }
            }}
            onDoubleClick={onDoubleClick}
            onKeyDown={(event) => {
              onKeyDown?.(event);

              if (event.defaultPrevented || disabled) {
                return;
              }

              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();

                if (value != null) {
                  tree?.select(event, value);
                }

                if (hasBranch) {
                  toggle(event);
                }

                return;
              }

              if (event.key === 'ArrowRight' && hasBranch && !expanded) {
                event.preventDefault();
                toggle(event);
                return;
              }

              if (event.key === 'ArrowLeft' && hasBranch && expanded) {
                event.preventDefault();
                toggle(event);
              }
            }}
          >
            {row}
          </STreeViewItemContent>
          {branches}
        </STreeViewItem>
      </TreeViewItemContext.Provider>
    );
  },
);

TreeViewItem.displayName = 'TreeViewItem';

export type { TTreeViewItemProps } from './types';
export { treeViewItemClasses } from './classes';
export { TreeViewItem };
export default TreeViewItem;
