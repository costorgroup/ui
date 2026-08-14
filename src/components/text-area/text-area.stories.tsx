import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { TextArea } from '../../index';

const meta: Meta<typeof TextArea> = {
  title: 'Forms & Inputs/TextArea',
  component: TextArea,
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
    rows: { control: 'number' },
    autoGrow: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    label: 'Bio',
    helperText: 'Max 500 characters.',
    placeholder: 'Tell us a little about yourself',
    rows: 4,
    required: true,
    error: false,
    size: 'md',
    variant: 'subtle',
    color: 'primary',
    fullWidth: true,
    autoGrow: false,
  },
};

export const AutoGrow: Story = {
  args: {
    label: 'Notes',
    helperText: 'Grows as you type.',
    placeholder: 'Start typing…',
    rows: 2,
    autoGrow: true,
    size: 'md',
    variant: 'subtle',
    color: 'primary',
    fullWidth: true,
  },
};

export const Error: Story = {
  args: {
    label: 'Bio',
    helperText: 'Bio is required.',
    placeholder: 'Tell us a little about yourself',
    rows: 4,
    required: true,
    error: true,
    size: 'md',
    variant: 'subtle',
    color: 'primary',
    fullWidth: true,
  },
};
