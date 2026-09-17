import { useId, useRef, useState } from 'react';
import type { IndexPath, TreeNode } from './collection';
import type {
  TTreeViewNodeState,
  TUseTreeViewProps,
  TUseTreeViewReturn,
} from './types';

const uniq = (values: string[]) => Array.from(new Set(values));

const getCheckedState = <T extends TreeNode>(
  collection: TUseTreeViewReturn<T>['collection'],
  node: T,
  checkedValue: string[],
): boolean | 'indeterminate' => {
  const value = collection.getNodeValue(node);

  if (!collection.isBranchNode(node)) {
    return checkedValue.includes(value);
  }

  const descendants = collection.getDescendantValues(value);

  if (descendants.length === 0) {
    return checkedValue.includes(value);
  }

  const checkedCount = descendants.filter((item) =>
    checkedValue.includes(item),
  ).length;

  if (checkedCount === 0) {
    return false;
  }

  if (checkedCount === descendants.length) {
    return true;
  }

  return 'indeterminate';
};

export const useTreeView = <T extends TreeNode>(
  props: TUseTreeViewProps<T>,
): TUseTreeViewReturn<T> => {
  const {
    collection,
    expandedValue: expandedProp,
    defaultExpandedValue = [],
    onExpandedChange,
    selectedValue: selectedProp,
    defaultSelectedValue = [],
    onSelectionChange,
    focusedValue: focusedProp,
    defaultFocusedValue = null,
    onFocusChange,
    checkedValue: checkedProp,
    defaultCheckedValue = [],
    onCheckedChange,
    selectionMode = 'single',
    expandOnClick = true,
    typeahead = true,
  } = props;

  const treeId = useId();
  const selectionAnchor = useRef<string | null>(defaultSelectedValue[0] ?? null);
  const typeaheadRef = useRef({ query: '', timeout: 0 });

  const [uncontrolledExpanded, setUncontrolledExpanded] =
    useState(defaultExpandedValue);
  const [uncontrolledSelected, setUncontrolledSelected] =
    useState(defaultSelectedValue);
  const [uncontrolledFocused, setUncontrolledFocused] =
    useState(defaultFocusedValue);
  const [uncontrolledChecked, setUncontrolledChecked] =
    useState(defaultCheckedValue);

  const expandedValue = expandedProp ?? uncontrolledExpanded;
  const selectedValue = selectedProp ?? uncontrolledSelected;
  const focusedValue = focusedProp !== undefined ? focusedProp : uncontrolledFocused;
  const checkedValue = checkedProp ?? uncontrolledChecked;

  const setExpandedValue = (value: string[]) => {
    const next = uniq(value);

    if (expandedProp === undefined) {
      setUncontrolledExpanded(next);
    }

    onExpandedChange?.({ expandedValue: next });
  };

  const setSelectedValue = (value: string[]) => {
    const next = uniq(value);

    if (selectedProp === undefined) {
      setUncontrolledSelected(next);
    }

    onSelectionChange?.({ selectedValue: next });
  };

  const setFocusedValue = (value: string | null) => {
    if (focusedProp === undefined) {
      setUncontrolledFocused(value);
    }

    onFocusChange?.({ focusedValue: value });
  };

  const setChecked = (value: string[]) => {
    const next = uniq(value);

    if (checkedProp === undefined) {
      setUncontrolledChecked(next);
    }

    onCheckedChange?.({ checkedValue: next });
  };

  const getVisibleNodes = () => {
    const nodes: Array<{ node: T; indexPath: IndexPath; value: string }> = [];

    const visit = (parent: T, path: IndexPath) => {
      collection.getNodeChildren(parent).forEach((child, index) => {
        const indexPath = [...path, index];
        const value = collection.getNodeValue(child);
        nodes.push({ node: child, indexPath, value });

        if (collection.isBranchNode(child) && expandedValue.includes(value)) {
          visit(child, indexPath);
        }
      });
    };

    visit(collection.rootNode, []);

    return nodes;
  };

  const focusElement = (value: string) => {
    const tree = document.getElementById(treeId);
    const selector = `[data-value="${CSS.escape(value)}"][data-part="item"], [data-value="${CSS.escape(value)}"][data-part="branch-control"]`;
    const node = tree?.querySelector(selector) as HTMLElement | null;
    node?.focus();
  };

  const focus = (value: string) => {
    setFocusedValue(value);
    focusElement(value);
  };

  const expand = (value?: string[]) => {
    if (!value) {
      setExpandedValue(collection.getBranchValues());
      return;
    }

    setExpandedValue([...expandedValue, ...value]);
  };

  const collapse = (value?: string[]) => {
    if (!value) {
      setExpandedValue([]);
      return;
    }

    const remove = new Set(value);
    setExpandedValue(expandedValue.filter((item) => !remove.has(item)));
  };

  const toggleExpanded = (value: string) => {
    const node = collection.findNode(value);

    if (!node || !collection.isBranchNode(node) || collection.getNodeDisabled(node)) {
      return;
    }

    if (expandedValue.includes(value)) {
      collapse([value]);
      return;
    }

    expand([value]);
  };

  const select = (
    value: string,
    event?: { shiftKey?: boolean; ctrlKey?: boolean },
  ) => {
    const node = collection.findNode(value);

    if (!node || collection.getNodeDisabled(node)) {
      return;
    }

    const visible = getVisibleNodes().map((item) => item.value);

    if (selectionMode === 'multiple' && event?.shiftKey) {
      const anchor = selectionAnchor.current ?? value;
      const start = visible.indexOf(anchor);
      const end = visible.indexOf(value);

      if (start !== -1 && end !== -1) {
        const [from, to] = start < end ? [start, end] : [end, start];
        setSelectedValue(visible.slice(from, to + 1));
      } else {
        setSelectedValue([value]);
      }
    } else if (selectionMode === 'multiple' && event?.ctrlKey) {
      selectionAnchor.current = value;
      setSelectedValue(
        selectedValue.includes(value)
          ? selectedValue.filter((item) => item !== value)
          : [...selectedValue, value],
      );
    } else {
      selectionAnchor.current = value;
      setSelectedValue([value]);
    }

    setFocusedValue(value);
  };

  const deselect = (value?: string[]) => {
    if (!value) {
      setSelectedValue([]);
      return;
    }

    const remove = new Set(value);
    setSelectedValue(selectedValue.filter((item) => !remove.has(item)));
  };

  const toggleChecked = (value: string, isBranch: boolean) => {
    const node = collection.findNode(value);

    if (!node || collection.getNodeDisabled(node)) {
      return;
    }

    if (isBranch) {
      const descendants = collection.getDescendantValues(value);
      const allChecked = descendants.every((item) => checkedValue.includes(item));
      setChecked(
        allChecked
          ? checkedValue.filter((item) => !descendants.includes(item))
          : [...checkedValue, ...descendants],
      );
      return;
    }

    setChecked(
      checkedValue.includes(value)
        ? checkedValue.filter((item) => item !== value)
        : [...checkedValue, value],
    );
  };

  const getNodeState = ({
    node,
    indexPath,
  }: {
    node: T;
    indexPath: IndexPath;
  }): TTreeViewNodeState => {
    const value = collection.getNodeValue(node);

    return {
      value,
      indexPath,
      disabled: collection.getNodeDisabled(node),
      focused: focusedValue === value,
      selected: selectedValue.includes(value),
      expanded: expandedValue.includes(value),
      depth: indexPath.length,
      isBranch: collection.isBranchNode(node),
      checked: getCheckedState(collection, node, checkedValue),
    };
  };

  const searchTypeahead = (key: string, currentValue: string) => {
    if (!typeahead) {
      return;
    }

    window.clearTimeout(typeaheadRef.current.timeout);
    typeaheadRef.current.query += key.toLowerCase();
    typeaheadRef.current.timeout = window.setTimeout(() => {
      typeaheadRef.current.query = '';
    }, 350);

    const visible = getVisibleNodes();
    const start = visible.findIndex((item) => item.value === currentValue);
    const query = typeaheadRef.current.query;
    const ordered = [...visible.slice(start + 1), ...visible.slice(0, start + 1)];
    const match = ordered.find((item) =>
      collection.stringifyNode(item.node).toLowerCase().startsWith(query),
    );

    if (match) {
      focus(match.value);
    }
  };

  return {
    collection,
    expandedValue,
    selectedValue,
    focusedValue,
    checkedValue,
    selectionMode,
    expandOnClick,
    treeId,
    expand,
    collapse,
    toggleExpanded,
    select,
    deselect,
    setExpandedValue,
    setSelectedValue,
    setChecked,
    toggleChecked,
    focus,
    getNodeState,
    getVisibleNodes,
    searchTypeahead,
  };
};
