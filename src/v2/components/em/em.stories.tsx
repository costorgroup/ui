import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Flex } from '../../../index';
import type { TPaletteColor } from '../../../theme/types';
import { Em, Text } from '../../index';

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

const meta: Meta<typeof Em> = {
  title: 'V3/Typography/Em',
  component: Em,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: COLORS,
    },
  },
  args: {
    children: 'design system',
  },
};

export default meta;

type Story = StoryObj<typeof Em>;

export const Playground: Story = {
  tags: ['!dev'],
  render: (args) => (
    <Text size="md">
      The <Em {...args} /> is a collection of UI elements
    </Text>
  ),
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="sm">
      {COLORS.map((color) => (
        <Text key={color} size="md">
          This emphasis will be in '{color}' color:{' '}
          <Em color={color}>design system</Em>
        </Text>
      ))}
    </Flex>
  ),
};
