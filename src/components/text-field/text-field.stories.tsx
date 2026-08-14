import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { TextField } from '../../index';

const meta: Meta<typeof TextField> = {
  title: 'Forms & Inputs/TextField',
  component: TextField,
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
    label: { control: 'text' },
    description: { control: 'text' },
    helperText: { control: 'text' },
    placeholder: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    label: 'Email',
    helperText: 'We’ll never share your email.',
    placeholder: 'you@example.com',
    required: true,
    error: false,
    size: 'md',
    variant: 'subtle',
    color: 'primary',
    fullWidth: true,
  },
};

export const Error: Story = {
  args: {
    label: 'Email',
    helperText: 'Enter a valid email address.',
    placeholder: 'you@example.com',
    required: true,
    error: true,
    size: 'md',
    variant: 'subtle',
    color: 'primary',
    fullWidth: true,
  },
};
