import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import type { TPaletteColor } from '../../../theme/types';
import { Flex } from '../../../index';
import { ColorPickerField, InputActions, InputButton, Text } from '../../index';
import type { TInputSize, TInputVariant } from '../input/input-wrapper/types';
import type { TColorFormat } from './types';

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
const FORMATS: TColorFormat[] = ['hex', 'hexa', 'rgb', 'rgba', 'hsl', 'hsla'];

const meta: Meta<typeof ColorPickerField> = {
  title: 'V3/Forms/ColorPickerField',
  component: ColorPickerField,
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
    format: { control: 'select', options: FORMATS },
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
    label: 'Brand color',
    helperText: 'Output format is set with the format prop.',
    format: 'hexa',
    defaultValue: '#3b82f6ff',
    size: 'md',
    variant: 'surface',
    color: 'primary',
    fullWidth: true,
    error: false,
  },
};

export default meta;

type Story = StoryObj<typeof ColorPickerField>;

export const Playground: Story = {
  tags: ['!dev'],
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {COLORS.map((color) => (
        <ColorPickerField
          key={color}
          color={color}
          label={color}
          defaultValue="#3b82f6ff"
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
          <ColorPickerField
            variant={variant}
            label={variant}
            defaultValue="#3b82f6ff"
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
        <ColorPickerField
          key={size}
          size={size}
          label={size}
          defaultValue="#3b82f6ff"
        />
      ))}
    </Flex>
  ),
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [value, setValue] = useState('#a855f7cc');

    return (
      <Flex direction="column" gap="sm">
        <ColorPickerField
          label="Purple"
          value={value}
          format="hexa"
          onChange={setValue}
        />
        <Text size="sm">{value}</Text>
      </Flex>
    );
  },
};

export const HexOnly: Story = {
  args: {
    label: 'Solid color',
    format: 'hex',
    defaultValue: '#ef4444',
    helperText: 'Alpha spectrum is hidden when format has no alpha channel.',
  },
};

export const Error: Story = {
  args: {
    helperText: 'Choose a valid brand color.',
    error: true,
    required: true,
  },
};

export const ActionBar: Story = {
  render: (args) => (
    <ColorPickerField
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
