import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import type { TPaletteColor } from '../../../theme/types';
import { AdapterDayjs } from '../../../adapters/AdapterDayjs';
import { DateAdapterProvider, Flex } from '../../../index';
import { DatePickerField, InputActions, InputButton, Text } from '../../index';
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

const VARIANTS: TInputVariant[] = ['surface', 'subtle', 'outline'];
const SIZES: TInputSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const SAMPLE_DATE = new Date(2026, 8, 10);

const meta: Meta<typeof DatePickerField> = {
  title: 'V3/Forms/DatePickerField',
  component: DatePickerField,
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
    fullWidth: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    helperText: { control: 'text' },
    placeholder: { control: 'text' },
    onChange: { table: { disable: true } },
    adapter: { table: { disable: true } },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    minDate: { table: { disable: true } },
    maxDate: { table: { disable: true } },
    name: { table: { disable: true } },
    id: { table: { disable: true } },
  },
  args: {
    label: 'Event date',
    helperText: 'Wheel date picker by default.',
    mode: 'date',
    datePickerDisplayType: 'wheel',
    defaultValue: SAMPLE_DATE,
    size: 'md',
    variant: 'surface',
    color: 'primary',
    fullWidth: true,
    error: false,
  },
};

export default meta;

type Story = StoryObj<typeof DatePickerField>;

export const Playground: Story = {
  tags: ['!dev'],
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {COLORS.map((color) => (
        <DatePickerField
          key={color}
          color={color}
          label={color}
          defaultValue={SAMPLE_DATE}
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
          <DatePickerField
            variant={variant}
            label={variant}
            defaultValue={SAMPLE_DATE}
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
        <DatePickerField
          key={size}
          size={size}
          label={size}
          defaultValue={SAMPLE_DATE}
        />
      ))}
    </Flex>
  ),
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [value, setValue] = useState<Date | null>(SAMPLE_DATE);

    return (
      <Flex direction="column" gap="sm">
        <DatePickerField
          label="Appointment"
          value={value}
          onChange={setValue}
        />
        <Text size="sm">
          {value ? value.toLocaleString() : 'No date selected'}
        </Text>
      </Flex>
    );
  },
};

export const Calendar: Story = {
  args: {
    label: 'Event date',
    helperText: 'Classic calendar grid.',
    mode: 'date',
    datePickerDisplayType: 'calendar',
  },
};

export const Time: Story = {
  args: {
    label: 'Start time',
    helperText: '24-hour value is formatted with AM/PM.',
    mode: 'time',
    timePickerDisplayType: 'wheel',
    ampm: true,
  },
};

export const DateTime: Story = {
  args: {
    label: 'Appointment',
    helperText: 'Date and time wheels.',
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
      <Flex direction="column" gap="sm">
        <DatePickerField
          label="Limited range"
          helperText="Only a short window is selectable."
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
    const [value, setValue] = useState<Date | null>(SAMPLE_DATE);

    return (
      <DateAdapterProvider adapter={AdapterDayjs}>
        <Flex direction="column" gap="sm">
          <DatePickerField
            label="Dayjs adapter"
            helperText="Uses @costor/ui/adapters/AdapterDayjs via provider."
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

export const Error: Story = {
  args: {
    helperText: 'Pick a date.',
    error: true,
    required: true,
  },
};

export const ActionBar: Story = {
  render: (args) => (
    <DatePickerField
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
