import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Flex, ScrollArea, Text } from '../../index';
import type { TPaletteColor } from '../../theme/types';

const COLORS: TPaletteColor[] = [
  'default',
  'primary',
  'secondary',
  'success',
  'error',
  'warning',
  'info',
  'dark',
  'light',
];

const longContent = Array.from({ length: 12 }, (_, index) => (
  <Text key={index} size="md" style={{ marginBottom: 12 }}>
    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex
    sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis
    convallis.
  </Text>
));

const meta: Meta<typeof ScrollArea> = {
  title: 'Layout/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['always', 'hover'],
    },
    color: {
      control: 'select',
      options: COLORS,
    },
  },
};

export default meta;

type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
  args: {
    mode: 'hover',
    color: 'primary',
    style: { height: 220, maxWidth: 360 },
  },
  render: (args) => <ScrollArea {...args}>{longContent}</ScrollArea>,
};

export const Modes: Story = {
  render: () => (
    <Flex gap="md" wrap="wrap">
      <Flex direction="column" gap="xs">
        <Text size="sm">mode=&quot;hover&quot;</Text>
        <ScrollArea mode="hover" style={{ height: 220, width: 280 }}>
          {longContent}
        </ScrollArea>
      </Flex>
      <Flex direction="column" gap="xs">
        <Text size="sm">mode=&quot;always&quot;</Text>
        <ScrollArea mode="always" style={{ height: 220, width: 280 }}>
          {longContent}
        </ScrollArea>
      </Flex>
    </Flex>
  ),
};

export const Colors: Story = {
  render: () => (
    <Flex gap="md" wrap="wrap">
      {COLORS.map((color) => (
        <Flex key={color} direction="column" gap="xs">
          <Text size="sm">{color}</Text>
          <ScrollArea
            mode="always"
            color={color}
            style={{ height: 160, width: 180 }}
          >
            {longContent}
          </ScrollArea>
        </Flex>
      ))}
    </Flex>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea mode="always" style={{ width: 360, whiteSpace: 'nowrap' }}>
      <Flex gap="md" style={{ width: 'max-content', paddingBottom: 8 }}>
        {Array.from({ length: 10 }, (_, index) => (
          <Text
            key={index}
            size="md"
            style={{
              minWidth: 120,
              padding: 16,
              background: 'rgba(0,0,0,0.04)',
              borderRadius: 8,
            }}
          >
            Item {index + 1}
          </Text>
        ))}
      </Flex>
    </ScrollArea>
  ),
};
