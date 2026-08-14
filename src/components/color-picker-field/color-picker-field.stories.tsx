import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { ColorPickerField, Flex, Text } from '../../index';
import type { TColorFormat } from './types';

const FORMATS: TColorFormat[] = [
  'hex',
  'hexa',
  'rgb',
  'rgba',
  'hsl',
  'hsla',
];

const meta: Meta<typeof ColorPickerField> = {
  title: 'Forms & Inputs/ColorPickerField',
  component: ColorPickerField,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      include: [
        'label',
        'description',
        'helperText',
        'format',
        'defaultValue',
        'placeholder',
        'size',
        'variant',
        'color',
        'fullWidth',
        'required',
        'error',
        'disabled',
      ],
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['subtle', 'surface', 'outline'],
    },
    color: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'success',
        'error',
        'warning',
        'info',
        'dark',
        'light',
      ],
    },
    format: {
      control: 'select',
      options: FORMATS,
    },
    defaultValue: { control: 'text' },
    placeholder: { control: 'text' },
    fullWidth: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    helperText: { control: 'text' },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    name: { table: { disable: true } },
    id: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof ColorPickerField>;

export const Default: Story = {
  args: {
    label: 'Brand color',
    helperText: 'Output format is set with the format prop.',
    format: 'hexa',
    defaultValue: '#3b82f6ff',
    size: 'md',
    variant: 'subtle',
    color: 'primary',
    fullWidth: true,
  },
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
