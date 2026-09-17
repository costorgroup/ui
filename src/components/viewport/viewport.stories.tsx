import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Center, Fixed, Heading, Text, Viewport } from '../..';

const meta: Meta<typeof Viewport> = {
  title: 'Layout/Viewport',
  component: Viewport,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['subtle', 'surface', 'outline'],
    },
    radius: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large', 'pill', 'circle'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Viewport>;

export const Default: Story = {
  args: {
    radius: 'medium',
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
