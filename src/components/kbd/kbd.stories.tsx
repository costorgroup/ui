import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Flex, Kbd, Text } from '../../index';
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

const meta: Meta<typeof Kbd> = {
  title: 'Typography/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['raised', 'outline', 'subtle', 'plain'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: COLORS,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Kbd>;

export const Default: Story = {
  args: {
    children: 'Shift + Tab',
    variant: 'raised',
    size: 'md',
    color: 'default',
  },
};

export const Combinations: Story = {
  render: () => (
    <Flex gap="xs" align="center">
      <Kbd>ctrl</Kbd>
      <Text size="sm">+</Text>
      <Kbd>shift</Kbd>
      <Text size="sm">+</Text>
      <Kbd>del</Kbd>
    </Flex>
  ),
};

export const FunctionKeys: Story = {
  render: () => (
    <Flex gap="xs" align="center">
      <Kbd>⌘</Kbd>
      <Kbd>⌥</Kbd>
      <Kbd>⇧</Kbd>
      <Kbd>⌃</Kbd>
    </Flex>
  ),
};

export const Variants: Story = {
  render: () => (
    <Flex gap="sm" wrap="wrap" align="center">
      {(['raised', 'outline', 'subtle', 'plain'] as const).map((variant) => (
        <Kbd key={variant} variant={variant}>
          Shift + Tab
        </Kbd>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex gap="sm" wrap="wrap" align="center">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Kbd key={size} size={size}>
          Shift + Tab
        </Kbd>
      ))}
    </Flex>
  ),
};

export const WithinText: Story = {
  render: () => (
    <Text size="md">
      Press <Kbd>F12</Kbd> to open DevTools
    </Text>
  ),
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {COLORS.map((color) => (
        <Flex key={color} gap="sm" wrap="wrap" align="center">
          <Text size="sm" style={{ minWidth: 72 }}>
            {color}
          </Text>
          <Kbd color={color} variant="raised">
            raised
          </Kbd>
          <Kbd color={color} variant="subtle">
            subtle
          </Kbd>
          <Kbd color={color} variant="outline">
            outline
          </Kbd>
          <Kbd color={color} variant="plain">
            plain
          </Kbd>
        </Flex>
      ))}
    </Flex>
  ),
};
