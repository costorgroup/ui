import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import type { TPaletteColor } from '../../../theme/types';
import { Flex } from '../../../index';
import { InputActions, InputButton, NativeSelect, Text } from '../../index';
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

const COUNTRIES = [
  { value: 'us', label: 'United States' },
  { value: 'de', label: 'Germany' },
  { value: 'rs', label: 'Serbia' },
  { value: 'gb', label: 'United Kingdom' },
];

const meta: Meta<typeof NativeSelect> = {
  title: 'V3/Forms/NativeSelect',
  component: NativeSelect,
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
    label: { control: 'text' },
    description: { control: 'text' },
    helperText: { control: 'text' },
    placeholder: { control: 'text' },
  },
  args: {
    label: 'Country',
    helperText: 'Used for billing.',
    placeholder: 'Select a country',
    options: COUNTRIES,
    size: 'md',
    variant: 'surface',
    color: 'primary',
    fullWidth: true,
    error: false,
  },
};

export default meta;

type Story = StoryObj<typeof NativeSelect>;

export const Playground: Story = {
  tags: ['!dev'],
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {COLORS.map((color) => (
        <NativeSelect
          key={color}
          color={color}
          label={color}
          options={COUNTRIES}
          defaultValue="us"
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
          <NativeSelect
            variant={variant}
            label={variant}
            options={COUNTRIES}
            defaultValue="us"
          />
        </Flex>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {SIZES.map((size) => (
        <NativeSelect
          key={size}
          size={size}
          label={size}
          options={COUNTRIES}
          defaultValue="us"
        />
      ))}
    </Flex>
  ),
};

export const Error: Story = {
  args: {
    helperText: 'Please choose a country.',
    error: true,
    required: true,
  },
};

export const ActionBar: Story = {
  render: (args) => (
    <NativeSelect
      {...args}
      defaultValue="us"
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
