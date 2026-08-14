import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Chip, RangeField } from '../../index';

const meta: Meta<typeof RangeField> = {
  title: 'Forms & Inputs/RangeField',
  component: RangeField,
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
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    valuePosition: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    fullWidth: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    helperText: { control: 'text' },
    track: {
      control: 'select',
      options: ['normal', 'inverted', false],
    },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
  },
};

export default meta;

type Story = StoryObj<typeof RangeField>;

export const Default: Story = {
  args: {
    label: 'Volume',
    helperText: 'Hover the thumb to see the value.',
    required: false,
    error: false,
    size: 'md',
    variant: 'subtle',
    color: 'primary',
    fullWidth: true,
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 40,
  },
};

export const Controlled: Story = {
  render: function ControlledStory(args) {
    const [value, setValue] = useState(50);

    return (
      <RangeField
        {...args}
        label="Brightness"
        helperText={`Current value: ${value}`}
        min={0}
        max={100}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
      />
    );
  },
};

export const Multi: Story = {
  render: function MultiStory(args) {
    const [value, setValue] = useState<[number, number]>([20, 80]);

    return (
      <RangeField
        {...args}
        label="Price"
        helperText={`From ${value[0]} to ${value[1]}`}
        multi
        min={0}
        max={100}
        value={value}
        onChange={(_, next) => {
          if (Array.isArray(next)) {
            setValue(next);
          }
        }}
      />
    );
  },
};

export const Vertical: Story = {
  args: {
    label: 'Gain',
    helperText: 'Vertical slider, value on the right.',
    direction: 'vertical',
    min: 0,
    max: 100,
    defaultValue: 55,
  },
};

export const CustomValue: Story = {
  args: {
    label: 'Rating',
    helperText: 'Custom thumb value with renderValue.',
    min: 0,
    max: 5,
    step: 1,
    defaultValue: 3,
    renderValue: ({ formatted }) => (
      <Chip color="primary" size="sm">
        {formatted}★
      </Chip>
    ),
  },
};

export const TrackOff: Story = {
  args: {
    label: 'No fill',
    helperText: 'track={false} keeps the rail without a colored fill.',
    track: false,
    min: 0,
    max: 100,
    defaultValue: 45,
  },
};

export const Inverted: Story = {
  args: {
    label: 'Remaining',
    helperText: 'Inverted track fills from the thumb to the end.',
    track: 'inverted',
    min: 0,
    max: 100,
    defaultValue: 35,
  },
};

export const InvertedMulti: Story = {
  render: function InvertedMultiStory(args) {
    const [value, setValue] = useState<[number, number]>([25, 70]);

    return (
      <RangeField
        {...args}
        label="Excluded range"
        helperText="Inverted dual track fills the outside."
        multi
        track="inverted"
        min={0}
        max={100}
        value={value}
        onChange={(_, next) => {
          if (Array.isArray(next)) {
            setValue(next);
          }
        }}
      />
    );
  },
};

export const Error: Story = {
  args: {
    label: 'Threshold',
    helperText: 'Value is outside the allowed range.',
    error: true,
    size: 'md',
    variant: 'subtle',
    color: 'primary',
    fullWidth: true,
    min: 0,
    max: 100,
    defaultValue: 90,
  },
};
