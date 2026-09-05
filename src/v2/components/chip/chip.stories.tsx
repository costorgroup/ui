import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Flex, Text } from '../../../index';
import type { TPaletteColor } from '../../../theme/types';
import { Chip } from '../../index';

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

const VARIANTS = [
  'solid',
  'subtle',
  'surface',
  'outline',
  'ghost',
  'plain',
] as const;

const meta: Meta<typeof Chip> = {
  title: 'V2/Data Display/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: VARIANTS,
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: COLORS,
    },
    rounded: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    children: 'Chip',
    variant: 'solid',
    size: 'md',
    color: 'default',
    rounded: false,
  },
};

export const Variants: Story = {
  render: () => (
    <Flex gap="sm" wrap="wrap" align="center">
      {VARIANTS.map((variant) => (
        <Chip key={variant} variant={variant}>
          {variant}
        </Chip>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex gap="sm" wrap="wrap" align="center">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Chip key={size} size={size}>
          {size}
        </Chip>
      ))}
    </Flex>
  ),
};

export const Rounded: Story = {
  render: () => (
    <Flex gap="sm" wrap="wrap" align="center">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Chip key={size} size={size} rounded>
          {size}
        </Chip>
      ))}
    </Flex>
  ),
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {COLORS.map((color) => (
        <Flex key={color} gap="sm" wrap="wrap" align="center">
          <Text size="sm" style={{ minWidth: 72 }}>
            {color}
          </Text>
          <Chip color={color} variant="solid" rounded>
            solid
          </Chip>
          <Chip color={color} variant="subtle" rounded>
            subtle
          </Chip>
          <Chip color={color} variant="surface" rounded>
            surface
          </Chip>
          <Chip color={color} variant="outline" rounded>
            outline
          </Chip>
        </Flex>
      ))}
    </Flex>
  ),
};
