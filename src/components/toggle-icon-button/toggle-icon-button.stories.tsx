import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { CheckIcon, CloseIcon, EyeIcon } from '../../icons';
import type { TPaletteColor } from '../../theme/types';
import { Text, ToggleButtonGroup, ToggleIconButton, Flex } from '../..';
import type {
  TToggleIconButtonRadius,
  TToggleIconButtonSize,
  TToggleIconButtonVariant,
} from './types';

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

const VARIANTS: TToggleIconButtonVariant[] = [
  'solid',
  'subtle',
  'surface',
  'outline',
  'ghost',
  'plain',
];

const SIZES: TToggleIconButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const RADII: TToggleIconButtonRadius[] = [
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'pill',
];

const meta: Meta<typeof ToggleIconButton> = {
  title: 'Buttons/ToggleIconButton',
  component: ToggleIconButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    appearance: { control: 'select', options: ['opaque', 'transparent'] },
    size: { control: 'select', options: SIZES },
    color: { control: 'select', options: COLORS },
    radius: { control: 'select', options: RADII },
    disabled: { control: 'boolean' },
  },
  args: {
    children: <CheckIcon />,
    'aria-label': 'Check',
    variant: 'outline',
    appearance: 'opaque',
    size: 'md',
    color: 'default',
    radius: 'sm',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof ToggleIconButton>;

export const Playground: Story = {
  tags: ['!dev'],
};

export const Colors: Story = {
  render: () => (
    <Flex gap="sm" wrap="wrap" align="center">
      {COLORS.map((color) => (
        <ToggleIconButton
          key={color}
          color={color}
          defaultActive
          aria-label={color}
        >
          <CheckIcon />
        </ToggleIconButton>
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
            <ToggleIconButton variant={variant} aria-label="off">
              <CheckIcon />
            </ToggleIconButton>
            <ToggleIconButton variant={variant} defaultActive aria-label="on">
              <CheckIcon />
            </ToggleIconButton>
            <ToggleIconButton variant={variant} disabled aria-label="disabled">
              <CheckIcon />
            </ToggleIconButton>
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
        <ToggleIconButton
          key={size}
          size={size}
          defaultActive
          aria-label={size}
        >
          <CheckIcon />
        </ToggleIconButton>
      ))}
    </Flex>
  ),
};

export const Radii: Story = {
  render: () => (
    <Flex gap="sm" wrap="wrap" align="center">
      {RADII.map((radius) => (
        <ToggleIconButton
          key={radius}
          radius={radius}
          defaultActive
          aria-label={radius}
        >
          <CheckIcon />
        </ToggleIconButton>
      ))}
    </Flex>
  ),
};

export const Group: Story = {
  render: (args) => (
    <ToggleButtonGroup
      variant={args.variant}
      color={args.color}
      size={args.size}
      appearance={args.appearance}
      disabled={args.disabled}
      defaultValue="check"
    >
      <ToggleIconButton value="check" aria-label="Check">
        <CheckIcon />
      </ToggleIconButton>
      <ToggleIconButton value="preview" aria-label="Preview">
        <EyeIcon />
      </ToggleIconButton>
      <ToggleIconButton value="close" aria-label="Close">
        <CloseIcon />
      </ToggleIconButton>
    </ToggleButtonGroup>
  ),
};
