import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button, Flex, Text } from '../../index';
import type { TPaletteColor } from '../../theme/types';
import type { TButtonSize, TButtonVariant } from './types';

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

const VARIANTS: TButtonVariant[] = [
  'solid',
  'subtle',
  'surface',
  'outline',
  'ghost',
  'plain',
];

const SIZES: TButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta: Meta<typeof Button> = {
  title: 'Buttons/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
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
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'solid',
    size: 'md',
    color: 'primary',
    disabled: false,
  },
};

export const Variants: Story = {
  render: () => (
    <Flex direction="column" gap="lg">
      {VARIANTS.map((variant) => (
        <Flex key={variant} direction="column" gap="xs">
          <Text size="sm">{variant}</Text>
          <Flex gap="sm" wrap="wrap" align="center">
            {COLORS.map((color) => (
              <Button key={color} variant={variant} color={color}>
                {color}
              </Button>
            ))}
            <Button variant={variant} color="primary" disabled>
              disabled
            </Button>
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex gap="sm" wrap="wrap" align="center">
      {SIZES.map((size) => (
        <Button key={size} size={size}>
          {size}
        </Button>
      ))}
    </Flex>
  ),
};
