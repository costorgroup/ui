import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Flex, Text, ToggleIconButton } from '../../index';
import { CheckIcon, EyeIcon } from '../../icons';

const meta: Meta<typeof ToggleIconButton> = {
  title: 'Buttons/ToggleIconButton',
  component: ToggleIconButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'subtle', 'surface', 'outline', 'ghost', 'plain'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
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
    rounded: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof ToggleIconButton>;

export const Default: Story = {
  args: {
    variant: 'outline',
    size: 'md',
    color: 'primary',
    rounded: false,
    'aria-label': 'Check',
    children: <CheckIcon />,
  },
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [active, setActive] = useState(true);

    return (
      <Flex align="center" gap="md">
        <ToggleIconButton
          aria-label="Preview"
          active={active}
          onChange={(_, next) => setActive(next)}
        >
          <EyeIcon />
        </ToggleIconButton>
        <Text size="sm">active: {String(active)}</Text>
      </Flex>
    );
  },
};
