import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Center, Fixed, Heading, Text, Viewport } from '../../index';

const meta: Meta<typeof Viewport> = {
  title: 'Layout/Viewport',
  component: Viewport,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'subtle', 'surface', 'outline', 'ghost', 'plain'],
    },
    radius: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large', 'pill', 'circle'],
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
  },
};

export default meta;

type Story = StoryObj<typeof Viewport>;

export const Default: Story = {
  args: {
    radius: 'medium',
    color: 'default',
    variant: 'surface',
    style: { width: 600, height: 400 },
  },
  render: (args) => (
    <Viewport {...args}>
      <Center absolute>
        <Heading as="h3" style={{ margin: 0, textAlign: 'center' }}>
          Viewport
        </Heading>
      </Center>
      <Fixed top="md" right="md">
        <Text size="sm">fixed</Text>
      </Fixed>
    </Viewport>
  ),
};
