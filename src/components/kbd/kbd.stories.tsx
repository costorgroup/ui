import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import type { TPaletteColor } from '../../theme/types';
import { Kbd, Text, Flex } from '../..';
import type { TKbdSize, TKbdVariant } from './types';

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

const VARIANTS: TKbdVariant[] = [
  'raised',
  'solid',
  'subtle',
  'surface',
  'outline',
  'plain',
];

const SIZES: TKbdSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta: Meta<typeof Kbd> = {
  title: 'Typography/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: VARIANTS,
    },
    size: {
      control: 'select',
      options: SIZES,
    },
    color: {
      control: 'select',
      options: COLORS,
    },
  },
  args: {
    children: 'Shift + Tab',
    variant: 'raised',
    size: 'md',
    color: 'default',
  },
};

export default meta;

type Story = StoryObj<typeof Kbd>;

export const Playground: Story = {
  tags: ['!dev'],
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="sm">
      {COLORS.map((color) => (
        <Text key={color} size="sm">
          This key will be in '{color}' color: <Kbd color={color}>F12</Kbd>
        </Text>
      ))}
    </Flex>
  ),
};

export const Variants: Story = {
  render: () => (
    <Flex gap="sm" wrap="wrap" align="center">
      {VARIANTS.map((variant) => (
        <Kbd key={variant} variant={variant}>
          {variant}
        </Kbd>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex gap="sm" wrap="wrap" align="center">
      {SIZES.map((size) => (
        <Kbd key={size} size={size}>
          {size}
        </Kbd>
      ))}
    </Flex>
  ),
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

export const Inline: Story = {
  render: () => (
    <Text size="md">
      Press <Kbd>F12</Kbd> to open DevTools
    </Text>
  ),
};
