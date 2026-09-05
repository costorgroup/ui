import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import {
  Em,
  Text
} from '../../index';

const meta: Meta<typeof Em> = {
  title: 'V2/Typography/Em',
  component: Em,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Em>;

export const Default: Story = {
  render: () => (
    <Text size="md">
      The <Em>design system</Em> is a collection of UI elements
    </Text>
  ),
};
