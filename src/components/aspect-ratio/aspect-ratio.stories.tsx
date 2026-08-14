import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AspectRatio, Flex, Text } from '../../index';

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

export const Default: Story = {
  args: { ratio: 16 / 9, maxWidth: 480 },
  render: (args) => (
    <AspectRatio {...args}>
      <Flex
        align="center"
        justify="center"
        style={{ background: '#e5e7eb' }}
      >
        <Text>16 / 9</Text>
      </Flex>
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
      <Flex
        align="center"
        justify="center"
        style={{ background: '#e5e7eb' }}
      >
        <Text>
          maxWidth={String(args.maxWidth)} · maxHeight={String(args.maxHeight)}
        </Text>
      </Flex>
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

export const Map: Story = {
  args: { ratio: 16 / 9 },
  render: (args) => (
    <AspectRatio {...args}>
      <iframe
        title="Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.184133698489!2d-73.98811708459418!3d40.75889597932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </AspectRatio>
  ),
};
