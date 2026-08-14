import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { RichTextField } from '../../index';

const meta: Meta<typeof RichTextField> = {
  title: 'Forms & Inputs/RichTextField',
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
    showToolbar: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    helperText: { control: 'text' },
    placeholder: { control: 'text' },
    rows: { control: 'number' },
  },
};

export default meta;

type Story = StoryObj<typeof RichTextField>;

export const Default: Story = {
  args: {
    label: 'Description',
    helperText: 'Supports basic formatting.',
    placeholder: 'Write something…',
    rows: 5,
    required: true,
    error: false,
    size: 'md',
    variant: 'subtle',
    color: 'primary',
    fullWidth: true,
    showToolbar: true,
    defaultValue: '<p>Hello <strong>world</strong></p>',
  },
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
    label: 'Description',
    helperText: 'Description is required.',
    placeholder: 'Write something…',
    rows: 4,
    required: true,
    error: true,
    size: 'md',
    variant: 'subtle',
    color: 'primary',
    fullWidth: true,
  },
};

export const WithoutToolbar: Story = {
  args: {
    label: 'Comment',
    placeholder: 'Leave a comment…',
    showToolbar: false,
    rows: 3,
    size: 'md',
    variant: 'outline',
    color: 'primary',
  },
};
