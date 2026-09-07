import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Flex } from '../../../index';
import { EmojiPickerField, Text } from '../../index';

const meta: Meta<typeof EmojiPickerField> = {
  title: 'V2/Forms/EmojiPickerField',
  component: EmojiPickerField,
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
      ],
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

type Story = StoryObj<typeof EmojiPickerField>;

export const Default: Story = {
  args: {
    label: 'Reaction',
    helperText: 'Search or pick a category.',
    defaultValue: '👍',
    size: 'md',
    variant: 'subtle',
    color: 'default',
    fullWidth: true,
  },
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
