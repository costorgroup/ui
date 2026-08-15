import React, { SyntheticEvent, forwardRef, useCallback, useMemo, useState } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { ClickAwayListener } from '../click-away-listener';
import { treeViewClasses } from './classes';
import { TreeViewContext } from './context';
import { STreeView } from './styles';
import { TTreeViewProps } from './types';

const TreeView = forwardRef<HTMLUListElement, TTreeViewProps>(
  (
    {
      children,
      selected: selectedProp,
      defaultSelected = null,
      onSelect,
      unfocusOnClickAway = false,
      size = 'md',
      color = 'primary',
      className,
      onClick,
      ...props
    },
    ref,
  ) => {
    const isControlled = selectedProp !== undefined;
    const [uncontrolledSelected, setUncontrolledSelected] =
      useState(defaultSelected);
    const selected = isControlled ? selectedProp : uncontrolledSelected;

    const select = useCallback(
      (event: SyntheticEvent | Event, value?: string | number | null) => {
        const next = value ?? null;

        if (next === selected) {
          return;
        }

        if (!isControlled) {
          setUncontrolledSelected(next);
        }

        onSelect?.(event, next);
      },
      [isControlled, onSelect, selected],
    );

    const context = useMemo(
      () => ({
        level: 0,
        selected,
        select,
        size,
        color,
      }),
      [color, select, selected, size],
    );

    const tree = (
      <STreeView
        ref={ref}
        role="tree"
        size={size}
        {...props}
        className={mergeClasses(treeViewClasses.root, className)}
        onClick={(event) => {
          onClick?.(event);

          if (event.defaultPrevented || !unfocusOnClickAway) {
            return;
          }

          const target = event.target as HTMLElement | null;
          if (!target?.closest('[role="treeitem"]')) {
            select(event, null);
          }
        }}
      >
        {children}
      </STreeView>
    );

    return (
      <TreeViewContext.Provider value={context}>
        {unfocusOnClickAway ? (
          <ClickAwayListener
            onClickAway={(event) => {
              if (selected != null) {
                select(event, null);
              }
            }}
          >
            {tree}
          </ClickAwayListener>
        ) : (
          tree
        )}
      </TreeViewContext.Provider>
    );
  },
);

TreeView.displayName = 'TreeView';

export type { TTreeViewProps, TTreeViewSize, TTreeViewValue } from './types';
export { treeViewClasses } from './classes';
export { TreeView };
export default TreeView;
