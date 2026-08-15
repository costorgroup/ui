import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Flex, Text, ToggleButton } from '../../index';

const meta: Meta<typeof ToggleButton> = {
  title: 'Buttons/ToggleButton',
  component: ToggleButton,
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
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof ToggleButton>;

export const Default: Story = {
  args: {
    children: 'Toggle',
    variant: 'outline',
    size: 'md',
    color: 'primary',
  },
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [active, setActive] = useState(false);

    return (
      <Flex align="center" gap="md">
        <ToggleButton
          active={active}
          onChange={(_, next) => setActive(next)}
        >
          Bold
        </ToggleButton>
        <Text size="sm">active: {String(active)}</Text>
      </Flex>
    );
  },
};
