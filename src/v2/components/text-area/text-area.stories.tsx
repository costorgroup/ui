import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import type { TPaletteColor } from '../../../theme/types';
import { Flex } from '../../../index';
import { InputActions, InputButton, Text, TextArea } from '../../index';
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

const meta: Meta<typeof TextArea> = {
  title: 'V3/Forms/TextArea',
  component: TextArea,
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
    rows: { control: 'number' },
    autoGrow: { control: 'boolean' },
  },
  args: {
    label: 'Bio',
    helperText: 'Max 500 characters.',
    placeholder: 'Tell us a little about yourself',
    rows: 4,
    required: true,
    error: false,
    size: 'md',
    variant: 'surface',
    color: 'primary',
    fullWidth: true,
    autoGrow: false,
  },
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Playground: Story = {
  tags: ['!dev'],
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {COLORS.map((color) => (
        <TextArea key={color} color={color} label={color} rows={2} defaultValue={color} />
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
          <TextArea variant={variant} label={variant} rows={2} defaultValue={variant} />
        </Flex>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {SIZES.map((size) => (
        <TextArea key={size} size={size} label={size} rows={2} defaultValue={size} />
      ))}
    </Flex>
  ),
};

export const AutoGrow: Story = {
  args: {
    label: 'Notes',
    helperText: 'Grows as you type.',
    placeholder: 'Start typing…',
    rows: 2,
    autoGrow: true,
    required: false,
  },
};

export const Error: Story = {
  args: {
    helperText: 'Bio is required.',
    error: true,
  },
};

export const ActionBar: Story = {
  render: (args) => (
    <TextArea
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
