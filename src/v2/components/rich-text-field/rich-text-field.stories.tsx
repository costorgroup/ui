import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import type { TPaletteColor } from '../../../theme/types';
import { Flex } from '../../../index';
import { InputActions, InputButton, RichTextField, Text } from '../../index';
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

const meta: Meta<typeof RichTextField> = {
  title: 'V3/Forms/RichTextField',
  component: RichTextField,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 560 }}>
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
    showToolbar: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    helperText: { control: 'text' },
    placeholder: { control: 'text' },
    rows: { control: 'number' },
  },
  args: {
    label: 'Description',
    helperText: 'Supports basic formatting.',
    placeholder: 'Write something…',
    rows: 5,
    required: true,
    error: false,
    size: 'md',
    variant: 'surface',
    color: 'primary',
    fullWidth: true,
    showToolbar: true,
    defaultValue: '<p>Hello <strong>world</strong></p>',
  },
};

export default meta;

type Story = StoryObj<typeof RichTextField>;

export const Playground: Story = {
  tags: ['!dev'],
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {COLORS.map((color) => (
        <RichTextField
          key={color}
          color={color}
          label={color}
          rows={3}
          defaultValue="<p>Hello <strong>world</strong></p>"
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
          <RichTextField
            variant={variant}
            label={variant}
            rows={3}
            defaultValue="<p>Hello <strong>world</strong></p>"
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
        <RichTextField
          key={size}
          size={size}
          label={size}
          rows={3}
          defaultValue="<p>Hello <strong>world</strong></p>"
        />
      ))}
    </Flex>
  ),
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState(
      '<p>Edit this <em>controlled</em> content.</p>',
    );

    return (
      <RichTextField
        {...args}
        value={value}
        onChange={setValue}
        label="Notes"
        helperText="HTML is synced via onChange."
      />
    );
  },
};

export const Error: Story = {
  args: {
    helperText: 'Description is required.',
    error: true,
    required: true,
  },
};

export const WithoutToolbar: Story = {
  args: {
    label: 'Comment',
    placeholder: 'Leave a comment…',
    showToolbar: false,
    rows: 3,
    variant: 'outline',
  },
};

export const ActionBar: Story = {
  render: (args) => (
    <RichTextField
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
