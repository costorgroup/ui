import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Flex } from '../../../index';
import type { TPaletteColor } from '../../../theme/types';
import { Text } from '../../index';
import type { TTextSize } from './types';

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

const SIZES: TTextSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta: Meta<typeof Text> = {
  title: 'V3/Typography/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: COLORS,
    },
    size: {
      control: 'select',
      options: SIZES,
    },
  },
  args: {
    children: 'Readable body text using the default color.',
    size: 'md',
    color: 'default',
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Playground: Story = {
  tags: ['!dev'],
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="sm">
      {COLORS.map((color) => (
        <Text key={color} color={color}>
          This text will be in '{color}' color.
        </Text>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex direction="column" gap="sm">
      {SIZES.map((size) => (
        <Text key={size} size={size} color="default">
          This text will be in '{size}' size.
        </Text>
      ))}
    </Flex>
  ),
};
