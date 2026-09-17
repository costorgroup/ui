import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import type { TPaletteColor } from '../../theme/types';
import { EmojiPickerField, InputActions, InputButton, Text, Flex } from '../..';
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

const meta: Meta<typeof EmojiPickerField> = {
  title: 'Forms/EmojiPickerField',
  component: EmojiPickerField,
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
    defaultValue: { control: 'text' },
    placeholder: { control: 'text' },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    name: { table: { disable: true } },
    id: { table: { disable: true } },
  },
  args: {
    label: 'Reaction',
    helperText: 'Search or pick a category.',
    defaultValue: '👍',
    size: 'md',
    variant: 'surface',
    color: 'primary',
    fullWidth: true,
    error: false,
  },
};

export default meta;

type Story = StoryObj<typeof EmojiPickerField>;

export const Playground: Story = {
  tags: ['!dev'],
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {COLORS.map((color) => (
        <EmojiPickerField
          key={color}
          color={color}
          label={color}
          defaultValue="👍"
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
          <EmojiPickerField
            variant={variant}
            label={variant}
            defaultValue="👍"
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
        <EmojiPickerField
          key={size}
          size={size}
          label={size}
          defaultValue="👍"
        />
      ))}
    </Flex>
  ),
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [value, setValue] = useState('🎉');

    return (
      <Flex direction="column" gap="sm">
        <EmojiPickerField
          label="Celebrate"
          value={value}
          onChange={setValue}
        />
        <Text size="sm">{value}</Text>
      </Flex>
    );
  },
};

export const Error: Story = {
  args: {
    helperText: 'Pick an emoji.',
    error: true,
    required: true,
  },
};

export const ActionBar: Story = {
  render: (args) => (
    <EmojiPickerField
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
