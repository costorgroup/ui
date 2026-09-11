import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import type { TPaletteColor } from '../../../theme/types';
import { Flex } from '../../../index';
import { RadioButton, Text } from '../../index';
import type { TInputSize, TInputVariant } from '../input/input-wrapper/types';
import type { TRadioButtonDirection } from './types';

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
const DIRECTIONS: TRadioButtonDirection[] = ['ltr', 'ltr-alt', 'rtl', 'rtl-alt'];

const meta: Meta<typeof RadioButton> = {
  title: 'V3/Forms/RadioButton',
  component: RadioButton,
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
    label: 'Pro',
    description: 'Best for growing teams.',
    name: 'plan',
    value: 'pro',
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

type Story = StoryObj<typeof RadioButton>;

export const Playground: Story = {
  tags: ['!dev'],
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="sm">
      {COLORS.map((color) => (
        <RadioButton
          key={color}
          color={color}
          label={color}
          name={`color-${color}`}
          value={color}
          defaultChecked
        />
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
          <RadioButton
            variant={variant}
            label={variant}
            name={`variant-${variant}`}
            value={variant}
            defaultChecked
          />
        </Flex>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex direction="column" gap="sm">
      {SIZES.map((size) => (
        <RadioButton
          key={size}
          size={size}
          label={size}
          name={`size-${size}`}
          value={size}
          defaultChecked
        />
      ))}
    </Flex>
  ),
};

export const Directions: Story = {
  render: (args) => (
    <Flex direction="column" gap="md">
      {DIRECTIONS.map((direction) => (
        <RadioButton
          key={direction}
          {...args}
          direction={direction}
          name={`direction-${direction}`}
          label={direction}
        />
      ))}
    </Flex>
  ),
};
