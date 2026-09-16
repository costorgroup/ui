import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Flex } from '../../../index';
import type { TPaletteColor } from '../../../theme/types';
import { CircularProgress, Text } from '../../index';

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

const VARIANTS = [
  'solid',
  'subtle',
  'surface',
] as const;

const meta: Meta<typeof CircularProgress> = {
  title: 'V3/Feedback/CircularProgress',
  component: CircularProgress,
  tags: ['autodocs'],
  args: {
    width: 24,
    height: 24,
    color: 'default',
    variant: 'solid',
    thickness: 2,
  },
  argTypes: {
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
    color: {
      control: 'select',
      options: COLORS,
    },
    variant: {
      control: 'select',
      options: VARIANTS,
    },
    thickness: {
      control: { type: 'number', min: 1, max: 8, step: 0.5 },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CircularProgress>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <Flex gap="lg" wrap="wrap" align="center">
      {VARIANTS.map((variant) => (
        <Flex key={variant} direction="column" gap="xs" align="center">
          <CircularProgress variant={variant} width={32} height={32} />
          <Text size="sm">{variant}</Text>
        </Flex>
      ))}
    </Flex>
  ),
};

export const Colors: Story = {
  render: () => (
    <Flex gap="md" wrap="wrap" align="center">
      {COLORS.map((color) => (
        <Flex key={color} direction="column" gap="xs" align="center">
          <CircularProgress color={color} width={28} height={28} />
          <Text size="sm">{color}</Text>
        </Flex>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex gap="lg" align="center">
      <CircularProgress width={16} height={16} />
      <CircularProgress width={24} height={24} />
      <CircularProgress width={40} height={40} />
      <CircularProgress width={64} height={64} />
    </Flex>
  ),
};

export const Thickness: Story = {
  render: () => (
    <Flex gap="lg" align="center">
      <CircularProgress width={40} height={40} thickness={1} />
      <CircularProgress width={40} height={40} thickness={2} />
      <CircularProgress width={40} height={40} thickness={3} />
      <CircularProgress width={40} height={40} thickness={4} />
    </Flex>
  ),
};
