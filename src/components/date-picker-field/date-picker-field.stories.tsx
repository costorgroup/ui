import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { AdapterDayjs } from '../../adapters/AdapterDayjs';
import {
  DateAdapterProvider,
  DatePickerField,
  Flex,
  Text,
} from '../../index';

const meta: Meta<typeof DatePickerField> = {
  title: 'Forms & Inputs/DatePickerField',
  component: DatePickerField,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 320, minHeight: 420 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      include: [
        'mode',
        'datePickerDisplayType',
        'timePickerDisplayType',
        'ampm',
        'disabled',
        'error',
        'size',
        'variant',
        'color',
        'placeholder',
      ],
    },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['date', 'time', 'datetime'],
    },
    datePickerDisplayType: {
      control: 'select',
      options: ['wheel', 'calendar'],
    },
    timePickerDisplayType: {
      control: 'select',
      options: ['wheel'],
    },
    ampm: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['subtle', 'outline', 'surface'],
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
    onChange: { table: { disable: true } },
    adapter: { table: { disable: true } },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    minDate: { table: { disable: true } },
    maxDate: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof DatePickerField>;

export const Default: Story = {
  args: {
    label: 'Event date',
    description: 'Wheel date picker by default.',
    mode: 'date',
    datePickerDisplayType: 'wheel',
    size: 'md',
    variant: 'subtle',
    color: 'primary',
  },
};

export const Calendar: Story = {
  args: {
    label: 'Event date',
    description: 'Classic calendar grid.',
    mode: 'date',
    datePickerDisplayType: 'calendar',
  },
};

export const Time: Story = {
  args: {
    label: 'Start time',
    mode: 'time',
    timePickerDisplayType: 'wheel',
    ampm: true,
  },
};

export const DateTime: Story = {
  args: {
    label: 'Appointment',
    description: 'Date and time wheels.',
    mode: 'datetime',
    datePickerDisplayType: 'wheel',
    timePickerDisplayType: 'wheel',
  },
};

export const MinMax: Story = {
  render: function MinMaxStory() {
    const [value, setValue] = useState<Date | null>(new Date());
    const today = new Date();
    const minDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 3,
    );
    const maxDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 14,
    );

    return (
      <Flex direction="column" gap="md">
        <DatePickerField
          label="Limited range"
          description="Only a short window is selectable."
          mode="date"
          datePickerDisplayType="calendar"
          value={value}
          onChange={setValue}
          minDate={minDate}
          maxDate={maxDate}
        />
        <Text size="sm">
          {value ? value.toLocaleString() : 'No date selected'}
        </Text>
      </Flex>
    );
  },
};

export const WithDayjsAdapter: Story = {
  render: function DayjsStory() {
    const [value, setValue] = useState<Date | null>(null);

    return (
      <DateAdapterProvider adapter={AdapterDayjs}>
        <Flex direction="column" gap="md">
          <DatePickerField
            label="Dayjs adapter"
            description="Uses @costor/ui/adapters/AdapterDayjs via provider."
            mode="datetime"
            value={value}
            onChange={setValue}
          />
          <Text size="sm">
            {value ? value.toISOString() : 'No value'}
          </Text>
        </Flex>
      </DateAdapterProvider>
    );
  },
};
