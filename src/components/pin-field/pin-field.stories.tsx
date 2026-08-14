import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { PinField, Text } from '../../index';

const meta: Meta<typeof PinField> = {
  title: 'Forms & Inputs/PinField',
  component: PinField,
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
    type: {
      control: 'select',
      options: ['numeric', 'alphanumeric', 'alphabetic'],
    },
    length: { control: 'number' },
    mask: { control: 'boolean' },
    otp: { control: 'boolean' },
    attached: { control: 'boolean' },
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

type Story = StoryObj<typeof PinField>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <>
        <PinField {...args} value={value} onChange={setValue} />
        <Text size="sm" style={{ marginTop: 12 }}>
          Value: {value || '—'}
        </Text>
      </>
    );
  },
  args: {
    label: 'One-time code',
    helperText: 'Enter the 4-digit code from your authenticator.',
    length: 4,
    type: 'numeric',
    otp: true,
    placeholder: '○',
    size: 'md',
    variant: 'subtle',
    color: 'primary',
    fullWidth: true,
    error: false,
  },
};

export const Alphanumeric: Story = {
  render: (args) => {
    const [value, setValue] = useState('');

    return <PinField {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Invite code',
    helperText: 'Letters and numbers are allowed.',
    length: 6,
    type: 'alphanumeric',
    placeholder: '○',
    size: 'md',
    variant: 'subtle',
    color: 'primary',
  },
};

export const Masked: Story = {
  render: (args) => {
    const [value, setValue] = useState('');

    return <PinField {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'PIN',
    helperText: 'Your PIN is hidden as you type.',
    length: 4,
    type: 'numeric',
    mask: true,
    placeholder: '○',
    size: 'md',
    variant: 'subtle',
    color: 'primary',
  },
};

export const Attached: Story = {
  render: (args) => {
    const [value, setValue] = useState('');

    return <PinField {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Security code',
    length: 6,
    type: 'numeric',
    otp: true,
    attached: true,
    placeholder: '○',
    size: 'md',
    variant: 'subtle',
    color: 'primary',
  },
};

export const Error: Story = {
  render: (args) => {
    const [value, setValue] = useState('12');

    return <PinField {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'One-time code',
    helperText: 'Invalid code. Try again.',
    length: 4,
    type: 'numeric',
    error: true,
    placeholder: '○',
    size: 'md',
    variant: 'subtle',
    color: 'primary',
  },
};
