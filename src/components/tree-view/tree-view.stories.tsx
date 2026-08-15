import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import {
  FileIcon,
  FolderIcon,
  ImageIcon,
  StarIcon,
  TreeView,
  TreeViewBranch,
  TreeViewIcon,
  TreeViewItem,
  TreeViewLabel,
} from '../../index';

const meta: Meta<typeof TreeView> = {
  title: 'Data Display/TreeView',
  component: TreeView,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'success',
        'error',
        'warning',
        'info',
        'dark',
        'light',
      ],
    },
    unfocusOnClickAway: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof TreeView>;

export const Default: Story = {
  args: {
    size: 'md',
    color: 'primary',
  },
  render: function DefaultStory(args) {
    const [selected, setSelected] = useState<string | number | null>('button.tsx');

    return (
      <TreeView
        {...args}
        selected={selected}
        onSelect={(_, value) => setSelected(value)}
        style={{ width: 280 }}
      >
        <TreeViewItem value="src" defaultExpanded>
          <TreeViewIcon>
            <FolderIcon />
          </TreeViewIcon>
          <TreeViewLabel>src</TreeViewLabel>
          <TreeViewBranch>
            <TreeViewItem value="components" defaultExpanded>
              <TreeViewIcon>
                <FolderIcon />
              </TreeViewIcon>
              <TreeViewLabel>components</TreeViewLabel>
              <TreeViewBranch>
                <TreeViewItem value="button.tsx">
                  <TreeViewIcon>
                    <FileIcon />
                  </TreeViewIcon>
                  <TreeViewLabel>button.tsx</TreeViewLabel>
                </TreeViewItem>
                <TreeViewItem value="hero.png">
                  <TreeViewIcon>
                    <ImageIcon />
                  </TreeViewIcon>
                  <TreeViewLabel>hero.png</TreeViewLabel>
                </TreeViewItem>
              </TreeViewBranch>
            </TreeViewItem>
            <TreeViewItem value="index.ts">
              <TreeViewIcon>
                <FileIcon />
              </TreeViewIcon>
              <TreeViewLabel>index.ts</TreeViewLabel>
            </TreeViewItem>
          </TreeViewBranch>
        </TreeViewItem>
        <TreeViewItem value="package.json">
          <TreeViewIcon>
            <StarIcon />
          </TreeViewIcon>
          <TreeViewLabel>package.json</TreeViewLabel>
        </TreeViewItem>
      </TreeView>
    );
  },
};

export const DoubleClick: Story = {
  args: {
    size: 'md',
    color: 'primary',
  },
  render: function DoubleClickStory(args) {
    const [selected, setSelected] = useState<string | number | null>(null);

    return (
      <TreeView
        {...args}
        selected={selected}
        onSelect={(_, value) => setSelected(value)}
        style={{ width: 280 }}
      >
        <TreeViewItem
          value="src"
          defaultExpanded
          onDoubleClick={() => window.alert('folder')}
        >
          <TreeViewIcon>
            <FolderIcon />
          </TreeViewIcon>
          <TreeViewLabel>src</TreeViewLabel>
          <TreeViewBranch>
            <TreeViewItem
              value="components"
              defaultExpanded
              onDoubleClick={() => window.alert('folder')}
            >
              <TreeViewIcon>
                <FolderIcon />
              </TreeViewIcon>
              <TreeViewLabel>components</TreeViewLabel>
              <TreeViewBranch>
                <TreeViewItem
                  value="button.tsx"
                  onDoubleClick={() => window.alert('file')}
                >
                  <TreeViewIcon>
                    <FileIcon />
                  </TreeViewIcon>
                  <TreeViewLabel>button.tsx</TreeViewLabel>
                </TreeViewItem>
                <TreeViewItem
                  value="hero.png"
                  onDoubleClick={() => window.alert('file')}
                >
                  <TreeViewIcon>
                    <ImageIcon />
                  </TreeViewIcon>
                  <TreeViewLabel>hero.png</TreeViewLabel>
                </TreeViewItem>
              </TreeViewBranch>
            </TreeViewItem>
            <TreeViewItem
              value="index.ts"
              onDoubleClick={() => window.alert('file')}
            >
              <TreeViewIcon>
                <FileIcon />
              </TreeViewIcon>
              <TreeViewLabel>index.ts</TreeViewLabel>
            </TreeViewItem>
          </TreeViewBranch>
        </TreeViewItem>
        <TreeViewItem
          value="package.json"
          onDoubleClick={() => window.alert('file')}
        >
          <TreeViewIcon>
            <StarIcon />
          </TreeViewIcon>
          <TreeViewLabel>package.json</TreeViewLabel>
        </TreeViewItem>
      </TreeView>
    );
  },
};
