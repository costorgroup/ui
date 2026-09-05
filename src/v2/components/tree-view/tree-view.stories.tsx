import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useMemo, useState } from 'react';
import { FileIcon, FolderIcon, ImageIcon } from '../../../icons';
import type { TPaletteColor } from '../../../theme/types';
import { TreeView, createTreeCollection, type TreeNode } from '../../index';

type DemoNode = TreeNode & {
  id: string;
  name: string;
  children?: DemoNode[];
  disabled?: boolean;
};

const demoTree: DemoNode = {
  id: 'ROOT',
  name: 'Root',
  children: [
    {
      id: 'src',
      name: 'src',
      children: [
        {
          id: 'components',
          name: 'components',
          children: [
            { id: 'button.tsx', name: 'button.tsx' },
            { id: 'hero.png', name: 'hero.png' },
          ],
        },
        { id: 'index.ts', name: 'index.ts' },
      ],
    },
    { id: 'package.json', name: 'package.json' },
    { id: 'README.md', name: 'README.md', disabled: true },
  ],
};

const createDemoCollection = () =>
  createTreeCollection<DemoNode>({
    rootNode: demoTree,
    nodeToValue: (node) => node.id,
    nodeToString: (node) => node.name,
    nodeToChildren: (node) => node.children ?? [],
    isNodeDisabled: (node) => Boolean(node.disabled),
  });

const nodeIcon = (node: DemoNode) => {
  if (node.children?.length) {
    return <FolderIcon />;
  }

  if (node.name.endsWith('.png')) {
    return <ImageIcon />;
  }

  return <FileIcon />;
};

const TreeBody = () => (
  <>
    <TreeView.Label>Tree</TreeView.Label>
    <TreeView.Tree>
      <TreeView.Node
        indentGuide={<TreeView.BranchIndentGuide />}
        render={({ node, nodeState }) =>
          nodeState.isBranch ? (
            <TreeView.BranchControl>
              <TreeView.BranchIndicator>
                <span aria-hidden style={{ display: 'inline-flex' }}>
                  ›
                </span>
              </TreeView.BranchIndicator>
              <span style={{ display: 'inline-flex' }}>{nodeIcon(node as DemoNode)}</span>
              <TreeView.BranchText>{(node as DemoNode).name}</TreeView.BranchText>
            </TreeView.BranchControl>
          ) : (
            <TreeView.Item>
              <span style={{ display: 'inline-flex' }}>{nodeIcon(node as DemoNode)}</span>
              <TreeView.ItemText>{(node as DemoNode).name}</TreeView.ItemText>
            </TreeView.Item>
          )
        }
      />
    </TreeView.Tree>
  </>
);

const COLORS: TPaletteColor[] = [
  'primary',
  'secondary',
  'success',
  'error',
  'warning',
  'info',
  'default',
];

const meta: Meta<typeof TreeView.Root> = {
  title: 'V2/Data Display/TreeView',
  component: TreeView.Root,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md'],
    },
    variant: {
      control: 'select',
      options: ['subtle', 'solid'],
    },
    color: {
      control: 'select',
      options: COLORS,
    },
    selectionMode: {
      control: 'select',
      options: ['single', 'multiple'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof TreeView.Root>;

export const Default: Story = {
  args: {
    size: 'md',
    variant: 'subtle',
    color: 'default',
  },
  render: function DefaultStory(args) {
    const collection = useMemo(() => createDemoCollection(), []);

    return (
      <TreeView.Root
        {...args}
        collection={collection}
        defaultSelectedValue={['button.tsx']}
        defaultExpandedValue={['src', 'components']}
        style={{ width: 320 }}
      >
        <TreeBody />
      </TreeView.Root>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const collection = useMemo(() => createDemoCollection(), []);

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {(['subtle', 'solid'] as const).map((variant) => (
          <div key={variant}>
            <div style={{ marginBottom: '0.5rem', fontSize: 13, opacity: 0.7 }}>
              {variant}
            </div>
            <TreeView.Root
              collection={collection}
              variant={variant}
              color="default"
              defaultSelectedValue={['button.tsx']}
              defaultExpandedValue={['src', 'components']}
              style={{ width: '100%' }}
            >
              <TreeBody />
            </TreeView.Root>
          </div>
        ))}
      </div>
    );
  },
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const collection = useMemo(() => createDemoCollection(), []);
    const [expandedValue, setExpandedValue] = useState<string[]>(['src', 'components']);
    const [selectedValue, setSelectedValue] = useState<string[]>(['button.tsx']);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ fontSize: 13, opacity: 0.75 }}>
          expanded: {JSON.stringify(expandedValue)} · selected:{' '}
          {JSON.stringify(selectedValue)}
        </div>
        <TreeView.Root
          collection={collection}
          expandedValue={expandedValue}
          onExpandedChange={(details) => setExpandedValue(details.expandedValue)}
          selectedValue={selectedValue}
          onSelectionChange={(details) => setSelectedValue(details.selectedValue)}
          style={{ width: 320 }}
        >
          <TreeBody />
        </TreeView.Root>
      </div>
    );
  },
};

export const CollectionConfig: Story = {
  render: () => {
    const collection = useMemo(
      () =>
        createTreeCollection<DemoNode>({
          rootNode: demoTree,
          nodeToValue: (node) => node.id,
          nodeToString: (node) => node.name,
          nodeToChildren: (node) => node.children ?? [],
          isNodeDisabled: (node) => node.id === 'README.md',
        }),
      [],
    );

    return (
      <TreeView.Root
        collection={collection}
        defaultSelectedValue={['index.ts']}
        defaultExpandedValue={['src', 'components']}
        style={{ width: 320 }}
      >
        <TreeBody />
      </TreeView.Root>
    );
  },
};
