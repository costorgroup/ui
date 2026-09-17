import type {
  HTMLAttributes,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';
import type { TPaletteColor } from '../../theme/types';
import type { IndexPath, TreeCollection, TreeNode } from './collection';

export type TTreeViewSize = 'xs' | 'sm' | 'md';

export type TTreeViewVariant = 'subtle' | 'solid';

export type TTreeViewSelectionMode = 'single' | 'multiple';

export type TTreeViewAppearance = {
  size: TTreeViewSize;
  variant: TTreeViewVariant;
  color: TPaletteColor;
};

export type TTreeViewAppearanceProps = {
  size?: TTreeViewSize;
  variant?: TTreeViewVariant;
  color?: TPaletteColor;
};

export type TTreeViewNodeState = {
  value: string;
  indexPath: IndexPath;
  disabled: boolean;
  focused: boolean;
  selected: boolean;
  expanded: boolean;
  depth: number;
  isBranch: boolean;
  checked: boolean | 'indeterminate';
};

export type TTreeViewSelectionChangeDetails = {
  selectedValue: string[];
};

export type TTreeViewExpandedChangeDetails = {
  expandedValue: string[];
};

export type TTreeViewFocusChangeDetails = {
  focusedValue: string | null;
};

export type TTreeViewCheckedChangeDetails = {
  checkedValue: string[];
};

export type TUseTreeViewProps<T extends TreeNode = TreeNode> = {
  collection: TreeCollection<T>;
  expandedValue?: string[];
  defaultExpandedValue?: string[];
  onExpandedChange?: (details: TTreeViewExpandedChangeDetails) => void;
  selectedValue?: string[];
  defaultSelectedValue?: string[];
  onSelectionChange?: (details: TTreeViewSelectionChangeDetails) => void;
  focusedValue?: string | null;
  defaultFocusedValue?: string | null;
  onFocusChange?: (details: TTreeViewFocusChangeDetails) => void;
  checkedValue?: string[];
  defaultCheckedValue?: string[];
  onCheckedChange?: (details: TTreeViewCheckedChangeDetails) => void;
  selectionMode?: TTreeViewSelectionMode;
  expandOnClick?: boolean;
  typeahead?: boolean;
};

export type TUseTreeViewReturn<T extends TreeNode = TreeNode> = {
  collection: TreeCollection<T>;
  expandedValue: string[];
  selectedValue: string[];
  focusedValue: string | null;
  checkedValue: string[];
  selectionMode: TTreeViewSelectionMode;
  expandOnClick: boolean;
  treeId: string;
  expand: (value?: string[]) => void;
  collapse: (value?: string[]) => void;
  toggleExpanded: (value: string) => void;
  select: (
    value: string,
    event?: { shiftKey?: boolean; ctrlKey?: boolean },
  ) => void;
  deselect: (value?: string[]) => void;
  setExpandedValue: (value: string[]) => void;
  setSelectedValue: (value: string[]) => void;
  setChecked: (value: string[]) => void;
  toggleChecked: (value: string, isBranch: boolean) => void;
  focus: (value: string) => void;
  getNodeState: (props: { node: T; indexPath: IndexPath }) => TTreeViewNodeState;
  getVisibleNodes: () => Array<{ node: T; indexPath: IndexPath; value: string }>;
  searchTypeahead: (key: string, currentValue: string) => void;
};

export type TTreeViewRootProps<T extends TreeNode = TreeNode> = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color'
> &
  TTreeViewAppearanceProps &
  TUseTreeViewProps<T>;

export type TTreeViewRootProviderProps<T extends TreeNode = TreeNode> = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color'
> &
  TTreeViewAppearanceProps & {
    value: TUseTreeViewReturn<T>;
  };

export type TTreeViewNodeRenderProps<T extends TreeNode = TreeNode> = {
  node: T;
  indexPath: IndexPath;
  nodeState: TTreeViewNodeState;
};

export type TTreeViewBranchProps = HTMLAttributes<HTMLDivElement>;
export type TTreeViewBranchContentProps = HTMLAttributes<HTMLDivElement>;
export type TTreeViewBranchControlProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color'
>;
export type TTreeViewBranchIndentGuideProps = HTMLAttributes<HTMLDivElement>;
export type TTreeViewBranchIndicatorProps = HTMLAttributes<HTMLDivElement>;
export type TTreeViewBranchTextProps = HTMLAttributes<HTMLSpanElement>;
export type TTreeViewBranchTriggerProps = HTMLAttributes<HTMLButtonElement>;
export type TTreeViewItemProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'>;
export type TTreeViewItemTextProps = HTMLAttributes<HTMLSpanElement>;
export type TTreeViewItemIndicatorProps = HTMLAttributes<HTMLDivElement>;
export type TTreeViewLabelProps = HTMLAttributes<HTMLDivElement>;
export type TTreeViewTreeProps = HTMLAttributes<HTMLDivElement>;
export type TTreeViewNodeCheckboxProps = HTMLAttributes<HTMLDivElement>;
export type TTreeViewNodeRenameInputProps = InputHTMLAttributes<HTMLInputElement>;

export type TTreeViewNodeProps<T extends TreeNode = TreeNode> = {
  render: (props: TTreeViewNodeRenderProps<T>) => ReactNode;
  indentGuide?: ReactElement;
  renderBranch?: (props: TTreeViewNodeRenderProps<T>) => ReactNode;
  branchProps?: TTreeViewBranchProps;
  branchContentProps?: TTreeViewBranchContentProps;
};

export type TTreeViewNodeProviderProps<T extends TreeNode = TreeNode> = {
  node: T;
  indexPath: IndexPath;
  children?: ReactNode;
};
