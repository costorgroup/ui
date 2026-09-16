import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Flex } from '../../../index';
import type { TPaletteColor } from '../../../theme/types';
import { LinearProgress, Text } from '../../index';

const COLORS: TPaletteColor[] = [
  'base',
  'primary',
  'secondary',
  'success',
  'error',
  'warning',
  'info',
  'dark',
  'light',
  'default',
  'inverted',
];

const VARIANTS = [
  'solid',
  'subtle',
  'surface',
] as const;

const meta: Meta<typeof LinearProgress> = {
  title: 'V3/Feedback/LinearProgress',
  component: LinearProgress,
  tags: ['autodocs'],
  args: {
    width: '100%',
    height: 8,
    color: 'default',
    variant: 'solid',
    value: 45,
    max: 100,
    animated: false,
  },
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
    variant: {
      control: 'select',
      options: VARIANTS,
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

type Story = StoryObj<typeof LinearProgress>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export const Variants: Story = {
  render: () => (
    <Flex direction="column" gap="md" style={{ width: 320 }}>
      {VARIANTS.map((variant) => (
        <Flex key={variant} direction="column" gap="xs">
          <Text size="sm">{variant}</Text>
          <LinearProgress variant={variant} value={65} max={100} height={8} />
        </Flex>
      ))}
    </Flex>
  ),
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="md" style={{ width: 320 }}>
      {COLORS.map((color) => (
        <Flex key={color} direction="column" gap="xs">
          <Text size="sm">{color}</Text>
          <LinearProgress color={color} value={65} max={100} height={8} />
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
          <LinearProgress value={value} max={100} height={8} />
        </Flex>
      ))}
    </Flex>
  ),
};

export const Animated: Story = {
  args: {
    width: '100%',
    height: 8,
    color: 'default',
    variant: 'solid',
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
