import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Flex } from '../../../index';
import type { TPaletteColor } from '../../../theme/types';
import { Button, ButtonGroup, Text } from '../../index';
import type { TButtonRadius, TButtonSize, TButtonVariant } from './types';

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

const VARIANTS: TButtonVariant[] = [
  'solid',
  'subtle',
  'surface',
  'outline',
  'ghost',
  'plain',
];

const SIZES: TButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const RADIUS: TButtonRadius[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'pill'];

const meta: Meta<typeof Button> = {
  title: 'V3/Buttons/Button',
  component: Button,
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
    children: 'Button',
    variant: 'solid',
    appearance: 'opaque',
    size: 'md',
    color: 'default',
    radius: 'sm',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  tags: ['!dev'],
};

export const Colors: Story = {
  render: () => (
    <Flex gap="sm" wrap="wrap" align="center">
      {COLORS.map((color) => (
        <Button key={color} color={color}>
          {color}
        </Button>
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
              <Button key={color} variant={variant} color={color}>
                {color}
              </Button>
            ))}
            <Button variant={variant} disabled>
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

export const Radius: Story = {
  render: () => (
    <Flex gap="sm" wrap="wrap" align="center">
      {RADIUS.map((radius) => (
        <Button key={radius} radius={radius}>
          {radius}
        </Button>
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
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </ButtonGroup>
      <ButtonGroup
        rounded
        variant={args.variant}
        color={args.color}
        size={args.size}
        appearance={args.appearance}
        disabled={args.disabled}
      >
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </ButtonGroup>
    </Flex>
  ),
};
