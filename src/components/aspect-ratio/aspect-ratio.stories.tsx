import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { AspectRatio, Center, Panel, Text } from '../..';

const meta: Meta<typeof AspectRatio> = {
  title: 'Layout/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
  argTypes: {
    ratio: { control: 'number' },
    maxWidth: { control: 'text' },
    maxHeight: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 720, maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof AspectRatio>;

const Placeholder = ({ children }: { children: React.ReactNode }) => (
  <Panel variant="surface" style={{ width: '100%', height: '100%' }}>
    <Center style={{ width: '100%', height: '100%' }}>
      <Text>{children}</Text>
    </Center>
  </Panel>
);

export const Default: Story = {
  args: { ratio: 16 / 9, maxWidth: 480 },
  render: (args) => (
    <AspectRatio {...args}>
      <Placeholder>16 / 9</Placeholder>
    </AspectRatio>
  ),
};

export const Constrained: Story = {
  args: {
    ratio: 16 / 9,
    maxWidth: 640,
    maxHeight: 180,
  },
  render: (args) => (
    <AspectRatio {...args}>
      <Placeholder>
        maxWidth={String(args.maxWidth)} · maxHeight={String(args.maxHeight)}
      </Placeholder>
    </AspectRatio>
  ),
};

export const Image: Story = {
  args: { ratio: 4 / 3 },
  render: (args) => (
    <AspectRatio {...args}>
      <img
        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800"
        alt="Food"
      />
    </AspectRatio>
  ),
};

export const Video: Story = {
  args: { ratio: 16 / 9 },
  render: (args) => (
    <AspectRatio {...args}>
      <iframe
        title="Example video"
        src="https://www.youtube.com/embed/QhBnZ6NPOY0"
        allowFullScreen
        style={{ border: 0 }}
      />
    </AspectRatio>
  ),
};
