import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Strong, Text } from '../../index';

const meta: Meta<typeof Strong> = {
  title: 'V3/Typography/Strong',
  component: Strong,
  tags: ['autodocs'],
  args: {
    children: 'design system',
  },
};

export default meta;

type Story = StoryObj<typeof Strong>;

export const Playground: Story = {
  tags: ['!dev'],
  render: (args) => (
    <Text size="md">
      The <Strong {...args} /> is a collection of UI elements
    </Text>
  ),
};

export const Inline: Story = {
  render: () => (
    <Text size="md">
      The <Strong>design system</Strong> is a collection of UI elements
    </Text>
  ),
};
