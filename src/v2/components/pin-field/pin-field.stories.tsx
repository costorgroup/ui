import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import type { TPaletteColor } from '../../../theme/types';
import { Flex } from '../../../index';
import { InputActions, InputButton, PinField, Text } from '../../index';
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

const VARIANTS: TInputVariant[] = ['subtle', 'surface', 'outline'];
const SIZES: TInputSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta: Meta<typeof PinField> = {
  title: 'V3/Forms/PinField',
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
    size: { control: 'select', options: SIZES },
    variant: { control: 'select', options: VARIANTS },
    color: { control: 'select', options: COLORS },
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
  args: {
    label: 'One-time code',
    helperText: 'Enter the 4-digit code from your authenticator.',
    length: 4,
    type: 'numeric',
    otp: true,
    placeholder: '○',
    size: 'md',
    variant: 'surface',
    color: 'primary',
    fullWidth: true,
    error: false,
  },
};

export default meta;

type Story = StoryObj<typeof PinField>;

export const Playground: Story = {
  tags: ['!dev'],
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {COLORS.map((color) => (
        <PinField key={color} color={color} label={color} length={4} />
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
          <PinField variant={variant} label={variant} length={4} />
        </Flex>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {SIZES.map((size) => (
        <PinField key={size} size={size} label={size} length={4} />
      ))}
    </Flex>
  ),
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
  },
};

export const Error: Story = {
  render: (args) => {
    const [value, setValue] = useState('12');

    return <PinField {...args} value={value} onChange={setValue} />;
  },
  args: {
    helperText: 'Invalid code. Try again.',
    error: true,
  },
};

export const ActionBar: Story = {
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <PinField
        {...args}
        value={value}
        onChange={setValue}
        actionBar={
          <Flex align="center" justify="flex-end">
            <InputActions>
              <InputButton radius="sm">Clear value</InputButton>
            </InputActions>
          </Flex>
        }
      />
    );
  },
};
