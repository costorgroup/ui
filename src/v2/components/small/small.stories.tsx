import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Flex } from '../../../index';
import type { TPaletteColor } from '../../../theme/types';
import { Small, Text } from '../../index';

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

const meta: Meta<typeof Small> = {
  title: 'V3/Typography/Small',
  component: Small,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: COLORS,
    },
  },
  args: {
    children: 'Caption and helper copy',
    color: 'default',
  },
};

export default meta;

type Story = StoryObj<typeof Small>;

export const Playground: Story = {
  tags: ['!dev'],
};

export const Default: Story = {
  render: () => (
    <Flex direction="column" gap="sm">
      <Text>Body text</Text>
      <Small>Caption and helper copy</Small>
    </Flex>
  ),
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="sm">
      {COLORS.map((color) => (
        <Small key={color} color={color}>
          This text will be in '{color}' color.
        </Small>
      ))}
    </Flex>
  ),
};

export const Inline: Story = {
  render: () => (
    <Text>
      Body with <Small>small</Small> inline.
    </Text>
  ),
};
