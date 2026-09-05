export type TreeNode = any;
export type IndexPath = number[];

type TTreeCollectionMethods<T> = {
  nodeToValue: (node: T) => string;
  nodeToString: (node: T) => string;
  nodeToChildren: (node: T) => T[];
  isNodeDisabled: (node: T) => boolean;
  nodeToChildrenCount: (node: T) => number | undefined;
};

export type TreeCollectionOptions<T> = Partial<TTreeCollectionMethods<T>> & {
  rootNode: T;
};

export type FilePathTreeNode = {
  id: string;
  name: string;
  children?: FilePathTreeNode[];
};

const defaultNodeToValue = (node: TreeNode) => {
  if (node == null) {
    return '';
  }

  if (node.value != null) {
    return String(node.value);
  }

  if (node.id != null) {
    return String(node.id);
  }

  return String(node);
};

const defaultNodeToString = (node: TreeNode) => {
  if (typeof node?.name === 'string') {
    return node.name;
  }

  if (typeof node?.label === 'string') {
    return node.label;
  }

  return defaultNodeToValue(node);
};

const defaultNodeToChildren = (node: TreeNode): TreeNode[] =>
  Array.isArray(node?.children) ? node.children : [];

const defaultIsNodeDisabled = (node: TreeNode) => Boolean(node?.disabled);

export class TreeCollection<T = TreeNode> {
  rootNode: T;
  private methods: TTreeCollectionMethods<T>;

  constructor(options: TreeCollectionOptions<T>) {
    this.rootNode = options.rootNode;
    this.methods = {
      nodeToValue: options.nodeToValue ?? defaultNodeToValue,
      nodeToString: options.nodeToString ?? defaultNodeToString,
      nodeToChildren: options.nodeToChildren ?? defaultNodeToChildren,
      isNodeDisabled: options.isNodeDisabled ?? defaultIsNodeDisabled,
      nodeToChildrenCount: options.nodeToChildrenCount ?? (() => undefined),
    };
  }

  private withRoot(rootNode: T) {
    return new TreeCollection<T>({
      rootNode,
      ...this.methods,
    });
  }

  getNodeChildren = (node: T) => this.methods.nodeToChildren(node) ?? [];

  getNodeValue = (node: T) => this.methods.nodeToValue(node);

  getNodeDisabled = (node: T) => this.methods.isNodeDisabled(node);

  stringifyNode = (node: T) => this.methods.nodeToString(node);

  getNodeChildrenCount = (node: T) => this.methods.nodeToChildrenCount(node);

  isBranchNode = (node: T) => {
    if ((this.getNodeChildrenCount(node) ?? 0) > 0) {
      return true;
    }

    return this.getNodeChildren(node).length > 0;
  };

  isRootNode = (node: T) => node === this.rootNode;

  at = (indexPath: IndexPath) => {
    let node: T | undefined = this.rootNode;

    for (const index of indexPath) {
      node = this.getNodeChildren(node)[index];

      if (node === undefined) {
        return undefined;
      }
    }

    return node;
  };

  getIndexPath = (value: string): IndexPath | undefined => {
    let found: IndexPath | undefined;

    const visit = (node: T, indexPath: IndexPath) => {
      if (found) {
        return;
      }

      if (this.getNodeValue(node) === value && indexPath.length > 0) {
        found = indexPath;
        return;
      }

      this.getNodeChildren(node).forEach((child, index) => {
        visit(child, [...indexPath, index]);
      });
    };

    visit(this.rootNode, []);

    return found;
  };

  getValue = (indexPath: IndexPath) => {
    const node = this.at(indexPath);

    return node ? this.getNodeValue(node) : undefined;
  };

  getValuePath = (indexPath: IndexPath) => {
    const path: string[] = [];
    let node: T | undefined = this.rootNode;

    for (const index of indexPath) {
      node = this.getNodeChildren(node)[index];

      if (!node) {
        break;
      }

      path.push(this.getNodeValue(node));
    }

    return path;
  };

  getDepth = (value: string) => this.getIndexPath(value)?.length ?? 0;

  findNode = (value: string) => {
    const indexPath = this.getIndexPath(value);

    return indexPath ? this.at(indexPath) : undefined;
  };

  getParentNode = (valueOrIndexPath: string | IndexPath) => {
    const indexPath =
      typeof valueOrIndexPath === 'string'
        ? this.getIndexPath(valueOrIndexPath)
        : valueOrIndexPath;

    if (!indexPath || indexPath.length === 0) {
      return undefined;
    }

    return this.at(indexPath.slice(0, -1));
  };

  getDescendantNodes = (valueOrIndexPath: string | IndexPath) => {
    const indexPath =
      typeof valueOrIndexPath === 'string'
        ? this.getIndexPath(valueOrIndexPath)
        : valueOrIndexPath;
    const node = indexPath ? this.at(indexPath) : undefined;

    if (!node) {
      return [];
    }

    const nodes: T[] = [];

    const visit = (current: T) => {
      this.getNodeChildren(current).forEach((child) => {
        nodes.push(child);
        visit(child);
      });
    };

    visit(node);

    return nodes;
  };

  getDescendantValues = (valueOrIndexPath: string | IndexPath) =>
    this.getDescendantNodes(valueOrIndexPath).map((node) => this.getNodeValue(node));

  getValues = (rootNode: T = this.rootNode) => {
    const values: string[] = [];

    const visit = (node: T, isRoot: boolean) => {
      if (!isRoot) {
        values.push(this.getNodeValue(node));
      }

      this.getNodeChildren(node).forEach((child) => visit(child, false));
    };

    visit(rootNode, true);

    return values;
  };

  getBranchValues = (rootNode: T = this.rootNode) => {
    const values: string[] = [];

    const visit = (node: T, isRoot: boolean) => {
      if (!isRoot && this.isBranchNode(node)) {
        values.push(this.getNodeValue(node));
      }

      this.getNodeChildren(node).forEach((child) => visit(child, false));
    };

    visit(rootNode, true);

    return values;
  };

  copy = (rootNode: T) => this.withRoot(rootNode);

  filter = (predicate: (node: T, indexPath: IndexPath) => boolean) => {
    const clone = (node: T, children: T[]) =>
      ({ ...(node as object), children }) as T;

    const visit = (node: T, indexPath: IndexPath, isRoot: boolean): T | null => {
      const nextChildren = this.getNodeChildren(node)
        .map((child, index) => visit(child, [...indexPath, index], false))
        .filter((child): child is T => child != null);

      if (isRoot || predicate(node, indexPath) || nextChildren.length > 0) {
        return clone(node, nextChildren);
      }

      return null;
    };

    return this.withRoot(visit(this.rootNode, [], true) ?? this.rootNode);
  };
}

export const createTreeCollection = <T extends TreeNode>(
  options: TreeCollectionOptions<T>,
) => new TreeCollection(options);

export const createFileTreeCollection = (paths: string[]) => {
  const root: FilePathTreeNode = { id: 'ROOT', name: 'ROOT', children: [] };

  paths.forEach((path) => {
    const parts = path.split(/[\\/]/).filter(Boolean);
    let current = root;
    let acc = '';

    parts.forEach((part) => {
      acc = acc ? `${acc}/${part}` : part;
      current.children ??= [];
      let next = current.children.find((child) => child.id === acc);

      if (!next) {
        next = { id: acc, name: part };
        current.children.push(next);
      }

      current = next;
    });
  });

  return createTreeCollection<FilePathTreeNode>({
    rootNode: root,
    nodeToValue: (node) => node.id,
    nodeToString: (node) => node.name,
    nodeToChildren: (node) => node.children ?? [],
  });
};
