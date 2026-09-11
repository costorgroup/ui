import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Flex } from '../../../index';
import type { TPaletteColor } from '../../../theme/types';
import { Heading } from '../../index';
import type { THeadingAs } from './types';

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

const LEVELS: THeadingAs[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const meta: Meta<typeof Heading> = {
  title: 'V3/Typography/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: LEVELS,
    },
    color: {
      control: 'select',
      options: COLORS,
    },
  },
  args: {
    children: 'Heading',
    as: 'h3',
    color: 'default',
  },
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const Playground: Story = {
  tags: ['!dev'],
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="sm">
      {COLORS.map((color) => (
        <Heading key={color} as="h3" color={color}>
          This text will be in '{color}' color.
        </Heading>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex direction="column" gap="sm">
      {LEVELS.map((level) => (
        <Heading key={level} as={level} color="default">
          This text will be in '{level}' size.
        </Heading>
      ))}
    </Flex>
  ),
};
