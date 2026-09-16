import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Flex } from '../../../index';
import {
  Chip,
  List,
  ListItem,
  Panel,
  ScrollArea,
  Text,
} from '../../index';
import type {
  TScrollAreaScrollbarDirection,
  TScrollAreaScrollbarPosition,
  TScrollAreaScrollbarVisibility,
} from './types';

const VISIBILITY: TScrollAreaScrollbarVisibility[] = [
  'hover',
  'always',
  'never',
  'hidden',
];
const POSITIONS: TScrollAreaScrollbarPosition[] = [
  'preferred',
  'inverted',
  'opposite',
];
const DIRECTIONS: TScrollAreaScrollbarDirection[] = ['vertical', 'horizontal'];

const items = Array.from({ length: 16 }, (_, index) => `Item ${index + 1}`);
const tags = [
  'Design',
  'Engineering',
  'Marketing',
  'Product',
  'Research',
  'Sales',
  'Support',
  'Operations',
  'Finance',
  'Legal',
  'People',
  'Security',
];

const meta: Meta<typeof ScrollArea> = {
  title: 'V3/Layout/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  args: {
    fade: true,
    scrollbarVisibility: 'hover',
    scrollbarPosition: 'preferred',
    scrollbarDirection: 'vertical',
  },
  argTypes: {
    fade: { control: 'boolean' },
    scrollbarVisibility: {
      control: 'select',
      options: VISIBILITY,
    },
    scrollbarPosition: {
      control: 'select',
      options: POSITIONS,
    },
    scrollbarDirection: {
      control: 'select',
      options: DIRECTIONS,
    },
  },
};

export default meta;

type Story = StoryObj<typeof ScrollArea>;

export const Playground: Story = {
  tags: ['!dev'],
  render: (args) => {
    const horizontal = args.scrollbarDirection === 'horizontal';

    return (
      <Panel
        style={{
          width: 320,
          height: horizontal ? undefined : 260,
          overflow: 'hidden',
        }}
        radius="xl"
      >
        <ScrollArea
          {...args}
          style={{ width: '100%', height: horizontal ? undefined : '100%' }}
        >
          {horizontal ? (
            <Flex
              gap="sm"
              style={{ width: 'max-content', padding: 16, whiteSpace: 'nowrap' }}
            >
              {tags.map((tag) => (
                <Chip key={tag} size="sm">
                  {tag}
                </Chip>
              ))}
            </Flex>
          ) : (
            <List variant="plain" style={{ padding: 16 }}>
              {items.map((item) => (
                <ListItem key={item}>{item}</ListItem>
              ))}
            </List>
          )}
        </ScrollArea>
      </Panel>
    );
  },
};

export const Vertical: Story = {
  render: (args) => (
    <Panel style={{ width: 320, height: 260, overflow: 'hidden' }} radius="xl">
      <ScrollArea {...args} style={{ height: '100%' }}>
        <List variant="plain" style={{ padding: 16 }}>
          {items.map((item) => (
            <ListItem key={item}>{item}</ListItem>
          ))}
        </List>
      </ScrollArea>
    </Panel>
  ),
};

export const Horizontal: Story = {
  args: {
    fade: true,
    scrollbarDirection: 'horizontal',
  },
  render: (args) => (
    <Panel style={{ width: 360, overflow: 'hidden' }} radius="xl">
      <ScrollArea {...args} style={{ width: '100%' }}>
        <Flex
          gap="sm"
          style={{ width: 'max-content', padding: 16, whiteSpace: 'nowrap' }}
        >
          {tags.map((tag) => (
            <Chip key={tag} size="sm">
              {tag}
            </Chip>
          ))}
        </Flex>
      </ScrollArea>
    </Panel>
  ),
};

export const FadeOff: Story = {
  args: {
    fade: false,
  },
  render: (args) => (
    <Panel style={{ width: 320, height: 260, overflow: 'hidden' }} radius="xl">
      <ScrollArea {...args} style={{ height: '100%' }}>
        <List variant="plain" style={{ padding: 16 }}>
          {items.map((item) => (
            <ListItem key={item}>{item}</ListItem>
          ))}
        </List>
      </ScrollArea>
    </Panel>
  ),
};

export const ScrollbarPositions: Story = {
  render: () => (
    <Flex direction="column" gap="lg">
      {DIRECTIONS.map((direction) => (
        <Flex key={direction} gap="md" wrap="wrap">
          {POSITIONS.map((position) => (
            <Flex key={`${direction}-${position}`} direction="column" gap="xs">
              <Text size="sm">
                {direction} · {position}
              </Text>
              <Panel
                style={{
                  width: 240,
                  height: direction === 'vertical' ? 200 : undefined,
                  overflow: 'hidden',
                }}
              >
                <ScrollArea
                  scrollbarDirection={direction}
                  scrollbarPosition={position}
                  scrollbarVisibility="always"
                  style={{
                    width: '100%',
                    height: direction === 'vertical' ? '100%' : undefined,
                  }}
                >
                  {direction === 'vertical' ? (
                    <List variant="plain" style={{ padding: 12 }}>
                      {items.map((item) => (
                        <ListItem key={item}>{item}</ListItem>
                      ))}
                    </List>
                  ) : (
                    <Flex
                      gap="sm"
                      style={{
                        width: 'max-content',
                        padding: 12,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {tags.map((tag) => (
                        <Chip key={tag} size="sm">
                          {tag}
                        </Chip>
                      ))}
                    </Flex>
                  )}
                </ScrollArea>
              </Panel>
            </Flex>
          ))}
        </Flex>
      ))}
    </Flex>
  ),
};

export const AlwaysVisible: Story = {
  args: {
    scrollbarVisibility: 'always',
    scrollbarPosition: 'preferred',
  },
  render: (args) => (
    <Panel style={{ width: 320, height: 260, overflow: 'hidden' }}>
      <ScrollArea {...args} style={{ height: '100%' }}>
        <List variant="plain" style={{ padding: 16 }}>
          {items.map((item) => (
            <ListItem key={item}>{item}</ListItem>
          ))}
        </List>
      </ScrollArea>
    </Panel>
  ),
};

export const Hidden: Story = {
  args: {
    scrollbarVisibility: 'never',
  },
  render: (args) => (
    <Panel style={{ width: 320, height: 260, overflow: 'hidden' }}>
      <ScrollArea {...args} style={{ height: '100%' }}>
        <List variant="plain" style={{ padding: 16 }}>
          {items.map((item) => (
            <ListItem key={item}>{item}</ListItem>
          ))}
        </List>
      </ScrollArea>
    </Panel>
  ),
};

export const NoOverflow: Story = {
  render: (args) => (
    <Panel style={{ width: 320, height: 160, overflow: 'hidden' }}>
      <ScrollArea {...args} style={{ height: '100%' }}>
        <div style={{ padding: 16 }}>
          <Text size="sm">
            Short content. Fade and overlay scrollbar stay off when nothing
            overflows.
          </Text>
        </div>
      </ScrollArea>
    </Panel>
  ),
};
