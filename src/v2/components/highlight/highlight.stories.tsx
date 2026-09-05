import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Flex } from '../../../index';
import type { TPaletteColor } from '../../../theme/types';
import {
  Highlight,
  Text
} from '../../index';

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
];

const meta: Meta<typeof Highlight> = {
  title: 'V2/Typography/Highlight',
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
    color: 'default',
  },
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="sm">
      {COLORS.map((color) => (
        <Text key={color} size="md">
          Highlight with <Highlight color={color}>{color}</Highlight> color
        </Text>
      ))}
    </Flex>
  ),
};
