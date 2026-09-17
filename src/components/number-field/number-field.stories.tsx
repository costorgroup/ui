import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import type { TPaletteColor } from '../../theme/types';
import { NumberField, Text, InputActions, InputButton, Flex } from '../..';
import type { TInputSize, TInputVariant } from '../input/input-wrapper/types';

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

const meta: Meta<typeof NumberField> = {
  title: 'Forms/NumberField',
  component: NumberField,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: { control: 'select', options: SIZES },
    variant: { control: 'select', options: VARIANTS },
    color: { control: 'select', options: COLORS },
    fullWidth: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    spinner: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    helperText: { control: 'text' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
  },
  args: {
    label: 'Quantity',
    helperText: 'Use the arrows to increase or decrease.',
    required: false,
    error: false,
    size: 'md',
    variant: 'surface',
    color: 'primary',
    fullWidth: true,
    min: 0,
    max: 10,
    step: 1,
    defaultValue: 1,
  },
};

export default meta;

type Story = StoryObj<typeof NumberField>;

export const Playground: Story = {
  tags: ['!dev'],
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {COLORS.map((color) => (
        <NumberField key={color} color={color} label={color} defaultValue={1} />
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
          <NumberField variant={variant} label={variant} defaultValue={1} />
        </Flex>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {SIZES.map((size) => (
        <NumberField key={size} size={size} label={size} defaultValue={1} />
      ))}
    </Flex>
  ),
};

export const Spinner: Story = {
  args: {
    label: 'Amount',
    helperText: 'Arrows on both sides step the value.',
    spinner: true,
    min: 0,
    max: 100,
    step: 5,
    defaultValue: 25,
  },
};

export const Controlled: Story = {
  render: function ControlledStory(args) {
    const [value, setValue] = useState(3);

    return (
      <NumberField
        {...args}
        label="Seats"
        helperText={`Current value: ${value}`}
        min={1}
        max={8}
        step={1}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
      />
    );
  },
};

export const ActionBar: Story = {
  render: (args) => (
    <NumberField
      {...args}
      actionBar={
        <Flex align="center" justify="flex-end">
          <InputActions>
            <InputButton radius="sm">Clear value</InputButton>
          </InputActions>
        </Flex>
      }
    />
  ),
};
