import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import type { TPaletteColor } from '../../../theme/types';
import { Flex } from '../../../index';
import { CheckBox, Text } from '../../index';
import type { TInputSize, TInputVariant } from '../input/input-wrapper/types';
import type { TCheckBoxDirection } from './types';

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

const VARIANTS: TInputVariant[] = ['subtle', 'surface', 'outline'];
const SIZES: TInputSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const DIRECTIONS: TCheckBoxDirection[] = ['ltr', 'ltr-alt', 'rtl', 'rtl-alt'];

const meta: Meta<typeof CheckBox> = {
  title: 'V3/Forms/CheckBox',
  component: CheckBox,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    direction: { control: 'select', options: DIRECTIONS },
    size: { control: 'select', options: SIZES },
    variant: { control: 'select', options: VARIANTS },
    color: { control: 'select', options: COLORS },
    fullWidth: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    helperText: { control: 'text' },
  },
  args: {
    label: 'Email me updates',
    description: 'You can unsubscribe anytime.',
    defaultChecked: true,
    direction: 'ltr',
    size: 'md',
    variant: 'surface',
    color: 'primary',
    fullWidth: true,
    error: false,
  },
};

export default meta;

type Story = StoryObj<typeof CheckBox>;

export const Playground: Story = {
  tags: ['!dev'],
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="sm">
      {COLORS.map((color) => (
        <CheckBox key={color} color={color} label={color} defaultChecked />
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
          <CheckBox variant={variant} label={variant} defaultChecked />
        </Flex>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex direction="column" gap="sm">
      {SIZES.map((size) => (
        <CheckBox key={size} size={size} label={size} defaultChecked />
      ))}
    </Flex>
  ),
};

export const Directions: Story = {
  render: (args) => (
    <Flex direction="column" gap="md">
      {DIRECTIONS.map((direction) => (
        <CheckBox
          key={direction}
          {...args}
          direction={direction}
          label={direction}
        />
      ))}
    </Flex>
  ),
};

export const Error: Story = {
  args: {
    label: 'Accept terms',
    helperText: 'You must accept the terms to continue.',
    defaultChecked: false,
    error: true,
  },
};
