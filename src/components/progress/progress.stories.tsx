import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Flex, Progress, Text } from '../../index';
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

const meta: Meta<typeof Progress> = {
  title: 'Feedbacks/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: 'text',
    },
    height: {
      control: 'number',
    },
    color: {
      control: 'select',
      options: COLORS,
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    max: {
      control: 'number',
    },
    animated: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    width: '100%',
    height: 8,
    color: 'primary',
    value: 45,
    max: 100,
    animated: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="md" style={{ width: 320 }}>
      {COLORS.map((color) => (
        <Flex key={color} direction="column" gap="xs">
          <Text size="sm">{color}</Text>
          <Progress color={color} value={65} max={100} height={8} />
        </Flex>
      ))}
    </Flex>
  ),
};

export const Values: Story = {
  render: () => (
    <Flex direction="column" gap="md" style={{ width: 320 }}>
      {[0, 25, 50, 75, 100].map((value) => (
        <Flex key={value} direction="column" gap="xs">
          <Text size="sm">{value}%</Text>
          <Progress value={value} max={100} height={8} />
        </Flex>
      ))}
    </Flex>
  ),
};

export const Animated: Story = {
  args: {
    width: '100%',
    height: 8,
    color: 'primary',
    value: 45,
    max: 100,
    animated: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};
