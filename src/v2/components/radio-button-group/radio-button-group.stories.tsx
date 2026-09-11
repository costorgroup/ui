import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import type { TPaletteColor } from '../../../theme/types';
import { Flex } from '../../../index';
import { RadioButton, RadioButtonGroup, Text } from '../../index';
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

type TPlan = {
  id: string;
  name: string;
  blurb: string;
};

const plans: TPlan[] = [
  { id: 'free', name: 'Free', blurb: 'For individuals' },
  { id: 'pro', name: 'Pro', blurb: 'For growing teams' },
  { id: 'team', name: 'Team', blurb: 'Includes shared workspaces' },
];

const meta: Meta<typeof RadioButtonGroup> = {
  title: 'V3/Forms/RadioButtonGroup',
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
    size: { control: 'select', options: SIZES },
    variant: { control: 'select', options: VARIANTS },
    color: { control: 'select', options: COLORS },
    fullWidth: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    helperText: { control: 'text' },
  },
  args: {
    label: 'Plan',
    helperText: 'Change plans whenever you like.',
    name: 'plan',
    direction: 'vertical',
    size: 'md',
    variant: 'surface',
    color: 'primary',
    fullWidth: true,
    error: false,
  },
};

export default meta;

type Story = StoryObj<typeof RadioButtonGroup>;

export const Playground: Story = {
  tags: ['!dev'],
  render: (args) => {
    const [plan, setPlan] = useState('free');

    return (
      <RadioButtonGroup
        {...args}
        value={plan}
        onChange={(_, next) => setPlan(next as string)}
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
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="lg">
      {COLORS.map((color) => (
        <RadioButtonGroup
          key={color}
          color={color}
          label={color}
          defaultValue="a"
          name={`color-${color}`}
        >
          <RadioButton value="a" label="A" />
          <RadioButton value="b" label="B" />
        </RadioButtonGroup>
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
          <RadioButtonGroup
            variant={variant}
            defaultValue="a"
            name={`variant-${variant}`}
          >
            <RadioButton value="a" label="A" />
            <RadioButton value="b" label="B" />
          </RadioButtonGroup>
        </Flex>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex direction="column" gap="lg">
      {SIZES.map((size) => (
        <RadioButtonGroup
          key={size}
          size={size}
          label={size}
          defaultValue="a"
          name={`size-${size}`}
        >
          <RadioButton value="a" label="A" />
          <RadioButton value="b" label="B" />
        </RadioButtonGroup>
      ))}
    </Flex>
  ),
};

export const Objects: Story = {
  render: () => {
    const [plan, setPlan] = useState<TPlan>(plans[1]);

    return (
      <RadioButtonGroup
        label="Plan"
        helperText={plan.blurb}
        value={plan}
        onChange={(_, next) => setPlan(next)}
        isValueEqual={(a, b) => a.id === b.id}
      >
        {plans.map((item) => (
          <RadioButton
            key={item.id}
            value={item}
            label={item.name}
            description={item.blurb}
          />
        ))}
      </RadioButtonGroup>
    );
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
    name: 'plan-uncontrolled',
    defaultValue: 'pro',
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
    helperText: 'Please select a plan.',
    name: 'plan-error',
    defaultValue: '',
    error: true,
  },
};
