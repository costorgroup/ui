import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Flex } from '../../../index';
import { CheckIcon, CloseIcon, EyeIcon } from '../../../icons';
import type { TPaletteColor } from '../../../theme/types';
import { ButtonGroup, IconButton, Text } from '../../index';
import type { TIconButtonRadius, TIconButtonSize, TIconButtonVariant } from './types';

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

const VARIANTS: TIconButtonVariant[] = [
  'solid',
  'subtle',
  'surface',
  'outline',
  'ghost',
  'plain',
];

const SIZES: TIconButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const RADIUS: TIconButtonRadius[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'pill'];

const meta: Meta<typeof IconButton> = {
  title: 'V3/Buttons/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    appearance: { control: 'select', options: ['opaque', 'transparent'] },
    size: { control: 'select', options: SIZES },
    color: { control: 'select', options: COLORS },
    radius: { control: 'select', options: RADIUS },
    disabled: { control: 'boolean' },
  },
  args: {
    children: <CheckIcon />,
    'aria-label': 'Check',
    variant: 'solid',
    appearance: 'opaque',
    size: 'md',
    color: 'default',
    radius: 'sm',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Playground: Story = {
  tags: ['!dev'],
};

export const Colors: Story = {
  render: () => (
    <Flex gap="sm" wrap="wrap" align="center">
      {COLORS.map((color) => (
        <IconButton key={color} color={color} aria-label={color}>
          <CheckIcon />
        </IconButton>
      ))}
    </Flex>
  ),
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
            <IconButton variant={variant} disabled aria-label="disabled">
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

export const Radius: Story = {
  render: () => (
    <Flex gap="sm" wrap="wrap" align="center">
      {RADIUS.map((radius) => (
        <IconButton key={radius} radius={radius} aria-label={radius}>
          <CheckIcon />
        </IconButton>
      ))}
    </Flex>
  ),
};

export const Group: Story = {
  render: (args) => (
    <Flex gap="lg" align="center" wrap="wrap">
      <ButtonGroup
        variant={args.variant}
        color={args.color}
        size={args.size}
        appearance={args.appearance}
        disabled={args.disabled}
      >
        <IconButton aria-label="Check">
          <CheckIcon />
        </IconButton>
        <IconButton aria-label="Preview">
          <EyeIcon />
        </IconButton>
        <IconButton aria-label="Close">
          <CloseIcon />
        </IconButton>
      </ButtonGroup>
      <ButtonGroup
        rounded
        variant={args.variant}
        color={args.color}
        size={args.size}
        appearance={args.appearance}
        disabled={args.disabled}
      >
        <IconButton aria-label="Check">
          <CheckIcon />
        </IconButton>
        <IconButton aria-label="Preview">
          <EyeIcon />
        </IconButton>
        <IconButton aria-label="Close">
          <CloseIcon />
        </IconButton>
      </ButtonGroup>
    </Flex>
  ),
};
