import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import {
  Flex,
  Text,
  ToggleButton,
  ToggleButtonGroup,
  ToggleIconButton,
} from '../../index';
import { CheckIcon, CloseIcon, EyeIcon } from '../../icons';

const meta: Meta<typeof ToggleButtonGroup> = {
  title: 'Buttons/ToggleButtonGroup',
  component: ToggleButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
    },
    exclusive: { control: 'boolean' },
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
    variant: {
      control: 'select',
      options: ['solid', 'subtle', 'surface', 'outline', 'ghost', 'plain'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof ToggleButtonGroup>;

export const Default: Story = {
  args: {
    orientation: 'horizontal',
    color: 'primary',
    variant: 'outline',
    exclusive: true,
    defaultValue: 'center',
  },
  render: (args) => (
    <ToggleButtonGroup {...args}>
      <ToggleButton value="left">Left</ToggleButton>
      <ToggleButton value="center">Center</ToggleButton>
      <ToggleButton value="right">Right</ToggleButton>
    </ToggleButtonGroup>
  ),
};

export const Exclusive: Story = {
  render: function ExclusiveStory() {
    const [value, setValue] = useState<string | null>('left');

    return (
      <Flex direction="column" gap="sm">
        <ToggleButtonGroup
          exclusive
          value={value}
          onChange={(_, next) => setValue(next as string | null)}
        >
          <ToggleButton value="left">Left</ToggleButton>
          <ToggleButton value="center">Center</ToggleButton>
          <ToggleButton value="right">Right</ToggleButton>
        </ToggleButtonGroup>
        <Text size="sm">value: {String(value)}</Text>
      </Flex>
    );
  },
};

export const Multiple: Story = {
  render: function MultipleStory() {
    const [value, setValue] = useState<Array<string | number>>(['bold']);

    return (
      <Flex direction="column" gap="sm">
        <ToggleButtonGroup
          exclusive={false}
          value={value}
          onChange={(_, next) => setValue((next as Array<string | number>) ?? [])}
        >
          <ToggleButton value="bold">Bold</ToggleButton>
          <ToggleButton value="italic">Italic</ToggleButton>
          <ToggleButton value="underline">Underline</ToggleButton>
        </ToggleButtonGroup>
        <Text size="sm">value: {value.join(', ') || 'none'}</Text>
      </Flex>
    );
  },
};

export const WithIconButtons: Story = {
  render: () => (
    <ToggleButtonGroup variant="outline" color="primary" defaultValue="check">
      <ToggleIconButton value="check" aria-label="Check">
        <CheckIcon />
      </ToggleIconButton>
      <ToggleIconButton value="preview" aria-label="Preview">
        <EyeIcon />
      </ToggleIconButton>
      <ToggleIconButton value="close" aria-label="Close">
        <CloseIcon />
      </ToggleIconButton>
    </ToggleButtonGroup>
  ),
};
