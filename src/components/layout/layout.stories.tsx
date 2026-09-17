import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useMemo, useState } from 'react';
import {
  ArrowTopIcon,
  EmojiAddIcon,
  FileIcon,
  FolderIcon,
  MoreHorizontalIcon,
  PlayIcon,
  SearchIcon,
  StarIcon,
} from '../../icons';
import {
  Bubble,
  BubbleAction,
  BubbleContent,
  BubbleReactions,
  Code,
  IconButton,
  InputEmojiField,
  Layout,
  LayoutContent,
  Select,
  Tab,
  Tabs,
  Text,
  TextArea,
  TreeView,
  createTreeCollection,
  type TreeNode,
} from '../..';

const meta: Meta<typeof Layout> = {
  title: 'Layout/Layout',
  component: Layout,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    bordered: { control: 'boolean' },
    divider: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Layout>;

const Pane = ({ label }: { label: string }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      minHeight: 48,
      padding: 8,
    }}
  >
    <Text size="sm">{label}</Text>
  </div>
);

export const Default: Story = {
  args: {
    direction: 'horizontal',
    bordered: false,
    divider: true,
  },
  render: (args) => (
    <Layout {...args} style={{ height: 240 }}>
      <LayoutContent width={160}>
        <Pane label="sidebar" />
      </LayoutContent>
      <LayoutContent>
        <Pane label="main" />
      </LayoutContent>
    </Layout>
  ),
};

export const Bordered: Story = {
  args: {
    direction: 'vertical',
    bordered: true,
    divider: true,
  },
  render: (args) => (
    <Layout {...args} style={{ height: 240 }}>
      <LayoutContent height={40}>
        <Pane label="header" />
      </LayoutContent>
      <LayoutContent>
        <Pane label="body" />
      </LayoutContent>
      <LayoutContent height={40}>
        <Pane label="footer" />
      </LayoutContent>
    </Layout>
  ),
};

export const Nested: Story = {
  render: () => (
    <Layout bordered divider direction="horizontal" style={{ height: 360 }}>
      <LayoutContent width={300}>
        <Layout direction="vertical" divider>
          <LayoutContent>
            <Pane label="sidebar 300" />
          </LayoutContent>
        </Layout>
      </LayoutContent>
      <LayoutContent>
        <Layout direction="vertical" divider>
          <LayoutContent height={30}>
            <Pane label="navbar 30" />
          </LayoutContent>
          <LayoutContent>
            <Pane label="rest" />
          </LayoutContent>
        </Layout>
      </LayoutContent>
    </Layout>
  ),
};

type EditorNode = TreeNode & {
  id: string;
  name: string;
  children?: EditorNode[];
};

const editorTree: EditorNode = {
  id: 'ROOT',
  name: 'costor-ui',
  children: [
    {
      id: 'src',
      name: 'src',
      children: [
        {
          id: 'v2',
          name: 'v2',
          children: [
            { id: 'app.tsx', name: 'app.tsx' },
            { id: 'use-chat.ts', name: 'use-chat.ts' },
            { id: 'theme.ts', name: 'theme.ts' },
          ],
        },
      ],
    },
    { id: 'package.json', name: 'package.json' },
  ],
};

const FILES: Record<string, string> = {
  'app.tsx': `export function App() {
  const { messages, send } = useChat();

  return (
    <Layout bordered divider style={{ height: "100%" }}>
      <Chat messages={messages} onSend={send} />
    </Layout>
  );
}`,
  'use-chat.ts': `export function useChat() {
  const send = (prompt: string) => {
    console.log("agent", prompt);
  };

  return { messages: [], send };
}`,
  'theme.ts': `export const editorTheme = {
  activityBar: 48,
  sidebar: 220,
  chat: 320,
};`,
};

const ACTIVITY = [
  { id: 'files', label: 'Explorer', icon: <FolderIcon /> },
  { id: 'search', label: 'Search', icon: <SearchIcon /> },
  { id: 'run', label: 'Run', icon: <PlayIcon /> },
  { id: 'star', label: 'Favorites', icon: <StarIcon /> },
  { id: 'more', label: 'More', icon: <MoreHorizontalIcon /> },
] as const;

const fill = { flex: 1, minHeight: 0, height: '100%' } as const;

const panePad = {
  display: 'flex',
  flexDirection: 'column' as const,
  height: '100%',
  minHeight: 0,
};

export const AIEditor: Story = {
  parameters: {
    layout: 'fullscreen',
    fill: true,
  },
  render: function AIEditorStory() {
    const collection = useMemo(
      () =>
        createTreeCollection<EditorNode>({
          rootNode: editorTree,
          nodeToValue: (node) => node.id,
          nodeToString: (node) => node.name,
          nodeToChildren: (node) => node.children ?? [],
        }),
      [],
    );
    const [activity, setActivity] = useState('files');
    const [file, setFile] = useState('app.tsx');
    const [reactions, setReactions] = useState(['👍']);

    return (
      <div style={{ width: '100%', height: '100%', minHeight: 0, boxSizing: 'border-box' }}>
        <Layout bordered divider direction="horizontal" style={{ height: '100%' }}>
          <LayoutContent width={52}>
            <div
              style={{
                ...panePad,
                alignItems: 'center',
                padding: '4px 0',
                gap: 2,
              }}
            >
              {ACTIVITY.map((item) => (
                <IconButton
                  key={item.id}
                  type="button"
                  size="xl"
                  variant={activity === item.id ? 'subtle' : 'plain'}
                  aria-label={item.label}
                  aria-pressed={activity === item.id}
                  onClick={() => setActivity(item.id)}
                >
                  {item.icon}
                </IconButton>
              ))}
            </div>
          </LayoutContent>

          <LayoutContent width={220}>
            <div style={{ ...panePad, padding: 8, overflow: 'auto' }}>
              <Text size="xs">Explorer</Text>
              <TreeView.Root
                size="sm"
                variant="subtle"
                color="default"
                collection={collection}
                selectedValue={[file]}
                defaultExpandedValue={['src', 'v2']}
                onSelectionChange={(details) => {
                  const next = details.selectedValue[0];
                  if (next != null && FILES[next] != null) {
                    setFile(next);
                  }
                }}
                style={{ width: '100%', marginTop: 8 }}
              >
                <TreeView.Tree>
                  <TreeView.Node
                    indentGuide={<TreeView.BranchIndentGuide />}
                    render={({ node, nodeState }) =>
                      nodeState.isBranch ? (
                        <TreeView.BranchControl>
                          <TreeView.BranchIndicator>
                            <span aria-hidden>›</span>
                          </TreeView.BranchIndicator>
                          <span style={{ display: 'inline-flex' }}>
                            <FolderIcon />
                          </span>
                          <TreeView.BranchText>
                            {(node as EditorNode).name}
                          </TreeView.BranchText>
                        </TreeView.BranchControl>
                      ) : (
                        <TreeView.Item>
                          <span style={{ display: 'inline-flex' }}>
                            <FileIcon />
                          </span>
                          <TreeView.ItemText>
                            {(node as EditorNode).name}
                          </TreeView.ItemText>
                        </TreeView.Item>
                      )
                    }
                  />
                </TreeView.Tree>
              </TreeView.Root>
            </div>
          </LayoutContent>

          <LayoutContent>
            <Layout direction="vertical" divider style={fill}>
              <LayoutContent height={40}>
                <div style={{ display: 'flex', alignItems: 'center', height: '100%', padding: '0 8px' }}>
                  <Tabs
                    variant="plain"
                    fullWidth={false}
                    draggable={false}
                    value={file}
                    onChange={setFile}
                  >
                    <Tab value="app.tsx">app.tsx</Tab>
                    <Tab value="use-chat.ts">use-chat.ts</Tab>
                    <Tab value="theme.ts">theme.ts</Tab>
                  </Tabs>
                </div>
              </LayoutContent>
              <LayoutContent>
                <Code
                  as="pre"
                  variant="plain"
                  size="sm"
                  color="default"
                  style={{
                    display: 'block',
                    flex: 1,
                    margin: 0,
                    padding: 16,
                    overflow: 'auto',
                    border: 0,
                    borderRadius: 0,
                    whiteSpace: 'pre',
                    lineHeight: 1.65,
                  }}
                >
                  {FILES[file]}
                </Code>
              </LayoutContent>
              <LayoutContent height={148}>
                <div style={{ ...panePad, padding: 12, gap: 8 }}>
                  <Text size="xs">Terminal</Text>
                  <Code
                    as="pre"
                    variant="plain"
                    size="xs"
                    color="default"
                    style={{
                      display: 'block',
                      margin: 0,
                      overflow: 'auto',
                      border: 0,
                      borderRadius: 0,
                      whiteSpace: 'pre',
                      lineHeight: 1.6,
                    }}
                  >
                    {`% npm run storybook
  ➜  Local:   http://localhost:6006/
  ➜  ready in 812 ms`}
                  </Code>
                </div>
              </LayoutContent>
            </Layout>
          </LayoutContent>

          <LayoutContent width={320}>
            <Layout direction="vertical" divider={false} style={fill}>
              <LayoutContent height={40}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    padding: '0 12px',
                  }}
                >
                  <Text size="sm">Agent</Text>
                </div>
              </LayoutContent>
              <LayoutContent>
                <div
                  style={{
                    ...panePad,
                    padding: 12,
                    gap: 12,
                    overflow: 'auto',
                  }}
                >
                  <Bubble align="end" color="primary" variant="solid">
                    <BubbleContent>
                      Fix greet() so empty names fall back to &quot;there&quot;.
                    </BubbleContent>
                  </Bubble>
                  <Bubble align="start" color="default" variant="subtle">
                    <BubbleContent>
                      I&apos;ll update <Code size="xs" color="info">useChat</Code> and keep the editor tabs in sync.
                    </BubbleContent>
                    <BubbleAction>
                      <InputEmojiField
                        trigger={
                          <IconButton
                            type="button"
                            variant="plain"
                            size="md"
                            aria-label="Add reaction"
                          >
                            <EmojiAddIcon />
                          </IconButton>
                        }
                        onChange={(emoji) =>
                          setReactions((list) =>
                            list.includes(emoji) ? list : [...list, emoji],
                          )
                        }
                      />
                    </BubbleAction>
                    <BubbleReactions>
                      {reactions.map((emoji) => (
                        <span key={emoji}>{emoji}</span>
                      ))}
                    </BubbleReactions>
                  </Bubble>
                  <Bubble align="start" color="default" variant="subtle">
                    <BubbleContent>
                      Done. Empty prompts now render a fallback greeting in the preview.
                    </BubbleContent>
                  </Bubble>
                </div>
              </LayoutContent>
              <LayoutContent flex="0 0 auto">
                <div style={{ padding: 12 }}>
                  <TextArea
                    placeholder="Plan, search, build anything"
                    size="sm"
                    variant="subtle"
                    color="default"
                    rows={2}
                    actionBar={
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 8,
                        }}
                      >
                        <Select
                          size="xs"
                          fullWidth={false}
                          options={['agent', 'ask', 'plan']}
                          defaultValue="agent"
                          variant="subtle"
                        />
                        <IconButton
                          size="sm"
                          variant="solid"
                          radius="pill"
                          aria-label="Send"
                        >
                          <ArrowTopIcon />
                        </IconButton>
                      </div>
                    }
                  />
                </div>
              </LayoutContent>
            </Layout>
          </LayoutContent>
        </Layout>
      </div>
    );
  },
};
