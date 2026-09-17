import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Center, CircularProgress, Panel, Text } from '../..';

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
    <Panel variant="surface" style={{ height: 120, width: 320 }}>
      <Center {...args} style={{ width: '100%', height: '100%' }}>
        <Text>Centered content</Text>
      </Center>
    </Panel>
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
          border: '1px solid currentColor',
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
    <Panel variant="surface" style={{ position: 'relative', height: 160 }}>
      <Text style={{ padding: 12 }}>Parent content</Text>
      <Center {...args}>
        <Text>Absolutely centered</Text>
      </Center>
    </Panel>
  ),
};

export const AbsoluteAxes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['horizontal', 'vertical', 'both'] as const).map((axis) => (
        <Panel key={axis} variant="surface" style={{ position: 'relative', height: 100 }}>
          <Center absolute axis={axis}>
            <Text>{axis}</Text>
          </Center>
        </Panel>
      ))}
    </div>
  ),
};

export const Overlay: Story = {
  render: () => (
    <Panel variant="surface" style={{ position: 'relative', height: 160 }}>
      <Text style={{ padding: 16 }}>Some content that is being loaded…</Text>
      <Center absolute>
        <CircularProgress />
      </Center>
    </Panel>
  ),
};
