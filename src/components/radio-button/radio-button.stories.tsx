import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { RadioButton } from '../../index';

const DIRECTIONS = ['ltr', 'ltr-alt', 'rtl', 'rtl-alt'] as const;

const meta: Meta<typeof RadioButton> = {
  title: 'Forms & Inputs/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    direction: {
      control: 'select',
      options: [...DIRECTIONS],
    },
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
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    helperText: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof RadioButton>;

export const Default: Story = {
  args: {
    label: 'Pro',
    description: 'Best for growing teams.',
    name: 'plan',
    value: 'pro',
    defaultChecked: true,
    direction: 'ltr',
    size: 'md',
    variant: 'subtle',
    color: 'primary',
    fullWidth: true,
    error: false,
  },
};

export const LtrAlt: Story = {
  args: {
    ...Default.args,
    direction: 'ltr-alt',
  },
};

export const Rtl: Story = {
  args: {
    ...Default.args,
    direction: 'rtl',
  },
};

export const RtlAlt: Story = {
  args: {
    ...Default.args,
    direction: 'rtl-alt',
  },
};
