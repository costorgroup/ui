import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import type { TPaletteColor } from '../../theme/types';
import { Highlight, Text, Flex } from '../..';
import type { THighlightVariant } from './types';

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

const VARIANTS: THighlightVariant[] = ['solid', 'subtle', 'surface'];

const meta: Meta<typeof Highlight> = {
  title: 'Typography/Highlight',
  component: Highlight,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: COLORS,
    },
    variant: {
      control: 'select',
      options: VARIANTS,
    },
  },
  args: {
    children: 'design system',
    color: 'default',
    variant: 'subtle',
  },
};

export default meta;

type Story = StoryObj<typeof Highlight>;

export const Playground: Story = {
  tags: ['!dev'],
  render: (args) => (
    <Text size="md">
      The <Highlight {...args} /> is a collection of UI elements
    </Text>
  ),
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="sm">
      {COLORS.map((color) => (
        <Text key={color} size="md">
          This highlight will be in '{color}' color:{' '}
          <Highlight color={color}>design system</Highlight>
        </Text>
      ))}
    </Flex>
  ),
};

export const Variants: Story = {
  render: () => (
    <Flex direction="column" gap="sm">
      {VARIANTS.map((variant) => (
        <Text key={variant} size="md">
          This highlight will be in '{variant}' variant:{' '}
          <Highlight variant={variant}>design system</Highlight>
        </Text>
      ))}
    </Flex>
  ),
};
