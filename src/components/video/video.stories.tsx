import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Flex, Video } from '../../index';

const SAMPLE_SRC =
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

const meta: Meta<typeof Video> = {
  title: 'Data Display/Video',
  component: Video,
  tags: ['autodocs'],
  argTypes: {
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
    controls: {
      control: 'boolean',
    },
    autoHide: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Video>;

export const Default: Story = {
  args: {
    src: SAMPLE_SRC,
    radius: 'medium',
    color: 'primary',
    controls: true,
    autoHide: true,
    width: 480,
  },
};

export const Accent: Story = {
  render: () => (
    <Flex gap="md" wrap="wrap">
      <Video src={SAMPLE_SRC} width={320} color="primary" />
      <Video src={SAMPLE_SRC} width={320} color="error" />
      <Video src={SAMPLE_SRC} width={320} color="success" />
    </Flex>
  ),
};

export const LoopMuted: Story = {
  args: {
    src: SAMPLE_SRC,
    width: 480,
    loop: true,
    muted: true,
    autoPlay: true,
    controls: true,
  },
};
