import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Flex } from '../../../index';
import type { TPaletteColor } from '../../../theme/types';
import { Text, ToggleButton, ToggleButtonGroup } from '../../index';
import type {
  TToggleButtonRadius,
  TToggleButtonSize,
  TToggleButtonVariant,
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

const VARIANTS: TToggleButtonVariant[] = [
  'solid',
  'subtle',
  'surface',
  'outline',
  'ghost',
  'plain',
];

const SIZES: TToggleButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const RADII: TToggleButtonRadius[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'pill'];

const meta: Meta<typeof ToggleButton> = {
  title: 'V3/Buttons/ToggleButton',
  component: ToggleButton,
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
    children: 'Toggle',
    variant: 'outline',
    appearance: 'opaque',
    size: 'md',
    color: 'default',
    radius: 'sm',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof ToggleButton>;

export const Playground: Story = {
  tags: ['!dev'],
};

export const Colors: Story = {
  render: () => (
    <Flex gap="sm" wrap="wrap" align="center">
      {COLORS.map((color) => (
        <ToggleButton key={color} color={color} defaultActive>
          {color}
        </ToggleButton>
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
            <ToggleButton variant={variant}>Off</ToggleButton>
            <ToggleButton variant={variant} defaultActive>
              On
            </ToggleButton>
            <ToggleButton variant={variant} disabled>
              disabled
            </ToggleButton>
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
        <ToggleButton key={size} size={size} defaultActive>
          {size}
        </ToggleButton>
      ))}
    </Flex>
  ),
};

export const Radii: Story = {
  render: () => (
    <Flex gap="sm" wrap="wrap" align="center">
      {RADII.map((radius) => (
        <ToggleButton key={radius} radius={radius} defaultActive>
          {radius}
        </ToggleButton>
      ))}
    </Flex>
  ),
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [active, setActive] = useState(false);

    return (
      <Flex align="center" gap="md">
        <ToggleButton active={active} onChange={(_, next) => setActive(next)}>
          Bold
        </ToggleButton>
        <Text size="sm">active: {String(active)}</Text>
      </Flex>
    );
  },
};

export const Group: Story = {
  render: (args) => (
    <ToggleButtonGroup
      variant={args.variant}
      color={args.color}
      size={args.size}
      appearance={args.appearance}
      disabled={args.disabled}
      defaultValue="center"
    >
      <ToggleButton value="left">Left</ToggleButton>
      <ToggleButton value="center">Center</ToggleButton>
      <ToggleButton value="right">Right</ToggleButton>
    </ToggleButtonGroup>
  ),
};
