import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { RadioButton, RadioButtonGroup } from '../../index';

const meta: Meta<typeof RadioButtonGroup> = {
  title: 'Forms & Inputs/RadioButtonGroup',
  component: RadioButtonGroup,
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
      options: ['vertical', 'horizontal'],
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

type Story = StoryObj<typeof RadioButtonGroup>;

export const Default: Story = {
  render: (args) => {
    const [plan, setPlan] = useState('free');

    return (
      <RadioButtonGroup
        {...args}
        value={plan}
        onChange={(event) => setPlan(event.target.value)}
      >
        <RadioButton value="free" label="Free" />
        <RadioButton value="pro" label="Pro" />
        <RadioButton
          value="team"
          label="Team"
          helperText="Includes shared workspaces."
        />
      </RadioButtonGroup>
    );
  },
  args: {
    label: 'Plan',
    helperText: 'Change plans whenever you like.',
    name: 'plan',
    direction: 'vertical',
    size: 'md',
    variant: 'subtle',
    color: 'primary',
    fullWidth: true,
    error: false,
  },
};

export const Uncontrolled: Story = {
  render: (args) => (
    <RadioButtonGroup {...args}>
      <RadioButton value="free" label="Free" />
      <RadioButton value="pro" label="Pro" />
      <RadioButton value="team" label="Team" />
    </RadioButtonGroup>
  ),
  args: {
    label: 'Plan',
    name: 'plan-uncontrolled',
    defaultValue: 'pro',
    direction: 'vertical',
    size: 'md',
    variant: 'subtle',
    color: 'primary',
    fullWidth: true,
  },
};

export const Error: Story = {
  render: (args) => (
    <RadioButtonGroup {...args}>
      <RadioButton value="free" label="Free" />
      <RadioButton value="pro" label="Pro" />
      <RadioButton value="team" label="Team" />
    </RadioButtonGroup>
  ),
  args: {
    label: 'Plan',
    helperText: 'Please select a plan.',
    name: 'plan-error',
    defaultValue: '',
    direction: 'vertical',
    size: 'md',
    variant: 'subtle',
    color: 'primary',
    fullWidth: true,
    error: true,
  },
};
