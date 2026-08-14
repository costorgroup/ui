import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { NumberField } from '../../index';

const meta: Meta<typeof NumberField> = {
  title: 'Forms & Inputs/NumberField',
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
};

export default meta;

type Story = StoryObj<typeof NumberField>;

export const Default: Story = {
  args: {
    label: 'Quantity',
    helperText: 'Use the arrows to increase or decrease.',
    required: false,
    error: false,
    size: 'md',
    variant: 'subtle',
    color: 'primary',
    fullWidth: true,
    min: 0,
    max: 10,
    step: 1,
    defaultValue: 1,
  },
};

export const Spinner: Story = {
  args: {
    label: 'Amount',
    helperText: 'Arrows on both sides step the value.',
    spinner: true,
    size: 'md',
    variant: 'subtle',
    color: 'primary',
    fullWidth: true,
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
