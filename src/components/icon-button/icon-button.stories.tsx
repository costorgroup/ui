import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Flex, IconButton, Text } from '../../index';
import { CheckIcon } from '../../icons';
import type { TPaletteColor } from '../../theme/types';
import type { TIconButtonSize, TIconButtonVariant } from './types';

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

const VARIANTS: TIconButtonVariant[] = [
  'solid',
  'subtle',
  'surface',
  'outline',
  'ghost',
  'plain',
];

const SIZES: TIconButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta: Meta<typeof IconButton> = {
  title: 'Buttons/IconButton',
  component: IconButton,
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
    rounded: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    children: <CheckIcon />,
    'aria-label': 'Check',
    variant: 'solid',
    size: 'md',
    color: 'primary',
    rounded: false,
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
              <IconButton
                key={color}
                variant={variant}
                color={color}
                aria-label={color}
              >
                <CheckIcon />
              </IconButton>
            ))}
            <IconButton
              variant={variant}
              color="primary"
              disabled
              aria-label="disabled"
            >
              <CheckIcon />
            </IconButton>
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
        <IconButton key={size} size={size} aria-label={size}>
          <CheckIcon />
        </IconButton>
      ))}
    </Flex>
  ),
};

export const Rounded: Story = {
  render: () => (
    <Flex gap="sm" wrap="wrap" align="center">
      {SIZES.map((size) => (
        <IconButton key={size} size={size} rounded aria-label={size}>
          <CheckIcon />
        </IconButton>
      ))}
    </Flex>
  ),
};
