import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Flex, Spinner, Text } from '../../index';
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

const meta: Meta<typeof Spinner> = {
  title: 'Feedbacks/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
    color: {
      control: 'select',
      options: COLORS,
    },
    thickness: {
      control: { type: 'number', min: 1, max: 8, step: 0.5 },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    width: 24,
    height: 24,
    color: 'primary',
    thickness: 2,
  },
};

export const Colors: Story = {
  render: () => (
    <Flex gap="md" wrap="wrap" align="center">
      {COLORS.map((color) => (
        <Flex key={color} direction="column" gap="xs" align="center">
          <Spinner color={color} width={28} height={28} />
          <Text size="sm">{color}</Text>
        </Flex>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex gap="lg" align="center">
      <Spinner width={16} height={16} />
      <Spinner width={24} height={24} />
      <Spinner width={40} height={40} />
      <Spinner width={64} height={64} />
    </Flex>
  ),
};

export const Thickness: Story = {
  render: () => (
    <Flex gap="lg" align="center">
      <Spinner width={40} height={40} thickness={1} />
      <Spinner width={40} height={40} thickness={2} />
      <Spinner width={40} height={40} thickness={3} />
      <Spinner width={40} height={40} thickness={4} />
    </Flex>
  ),
};
