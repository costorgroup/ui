import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { NoSsr, Text } from '../../index';

const meta: Meta<typeof NoSsr> = {
  title: 'Utilities/NoSsr',
  component: NoSsr,
  tags: ['autodocs'],
  argTypes: {
    defer: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof NoSsr>;

export const Default: Story = {
  args: {
    defer: false,
    fallback: <Text>Rendered as fallback (SSR / before mount)</Text>,
    children: <Text>Rendered on the client</Text>,
  },
};

export const Defer: Story = {
  args: {
    defer: true,
    fallback: <Text>Waiting for the next frame…</Text>,
    children: <Text>Rendered after the first paint</Text>,
  },
};
