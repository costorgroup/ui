import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Flex, Highlight, Text } from '../../index';
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

const meta: Meta<typeof Highlight> = {
  title: 'Typography/Highlight',
  component: Highlight,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: COLORS,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Highlight>;

export const Default: Story = {
  render: (args) => (
    <Text size="md">
      The <Highlight {...args}>design system</Highlight> is a collection of UI
      elements
    </Text>
  ),
  args: {
    color: 'primary',
  },
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="sm">
      {COLORS.map((color) => (
        <Text key={color} size="md">
          Highlight with{' '}
          <Highlight color={color}>{color}</Highlight> color
        </Text>
      ))}
    </Flex>
  ),
};
