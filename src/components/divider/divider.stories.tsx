import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Divider, Flex, Text } from '../../index';
import type { TPaletteColor } from '../../theme/types';
import type { TDividerSize, TDividerVariant } from './types';

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

const VARIANTS: TDividerVariant[] = ['solid', 'dashed', 'dotted'];
const SIZES: TDividerSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta: Meta<typeof Divider> = {
  title: 'Layout/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
    },
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
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    size: 'md',
    color: 'default',
  },
};

export const WithLabel: Story = {
  args: {
    children: 'or',
    color: 'primary',
  },
};

export const Vertical: Story = {
  render: () => (
    <Flex align="center" gap="md" style={{ height: 120 }}>
      <Text>Left</Text>
      <Divider orientation="vertical" />
      <Text>Right</Text>
    </Flex>
  ),
};

export const Variants: Story = {
  render: () => (
    <Flex direction="column" gap="lg">
      {VARIANTS.map((variant) => (
        <Flex key={variant} direction="column" gap="xs">
          <Text size="sm">{variant}</Text>
          <Divider variant={variant} />
        </Flex>
      ))}
    </Flex>
  ),
};
