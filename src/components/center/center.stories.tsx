import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Center, Spinner, Text } from '../../index';

const meta: Meta<typeof Center> = {
  title: 'Layout/Center',
  component: Center,
  tags: ['autodocs'],
  argTypes: {
    absolute: { control: 'boolean' },
    axis: {
      control: 'inline-radio',
      options: ['both', 'horizontal', 'vertical'],
    },
    inline: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Center>;

export const Default: Story = {
  render: (args) => (
    <Center
      {...args}
      style={{ height: 120, width: 320, background: '#f3f4f6' }}
    >
      <Text>Centered content</Text>
    </Center>
  ),
};

export const Inline: Story = {
  args: { inline: true },
  render: (args) => (
    <Text>
      Visit{' '}
      <Center
        {...args}
        as="a"
        href="https://example.com"
        style={{
          padding: '4px 10px',
          background: '#e5e7eb',
          borderRadius: 6,
          textDecoration: 'none',
        }}
      >
        example.com
      </Center>
    </Text>
  ),
};

export const Absolute: Story = {
  args: { absolute: true, axis: 'both' },
  render: (args) => (
    <div style={{ position: 'relative', height: 160, background: '#f3f4f6' }}>
      <Text style={{ padding: 12 }}>Parent content</Text>
      <Center {...args}>
        <Text>Absolutely centered</Text>
      </Center>
    </div>
  ),
};

export const AbsoluteAxes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['horizontal', 'vertical', 'both'] as const).map((axis) => (
        <div
          key={axis}
          style={{ position: 'relative', height: 100, background: '#f3f4f6' }}
        >
          <Center absolute axis={axis}>
            <Text>{axis}</Text>
          </Center>
        </div>
      ))}
    </div>
  ),
};

export const Overlay: Story = {
  render: () => (
    <div style={{ position: 'relative', height: 160, background: '#f3f4f6' }}>
      <Text style={{ padding: 16 }}>Some content that is being loaded…</Text>
      <Center absolute>
        <Spinner />
      </Center>
    </div>
  ),
};
