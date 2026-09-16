import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Flex } from '../../../index';
import type { TPaletteColor } from '../../../theme/types';
import { Video } from '../../index';

const SAMPLE_SRC =
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

const COLORS: TPaletteColor[] = [
  'base',
  'primary',
  'secondary',
  'success',
  'error',
  'warning',
  'info',
  'dark',
  'light',
  'default',
  'inverted',
];
const RADIUS = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'pill', 'full'] as const;

const meta: Meta<typeof Video> = {
  title: 'V3/Data Display/Video',
  component: Video,
  tags: ['autodocs'],
  args: {
    src: SAMPLE_SRC,
    radius: 'md',
    color: 'default',
    controls: true,
    autoHide: true,
    width: 480,
  },
  argTypes: {
    radius: {
      control: 'select',
      options: RADIUS,
    },
    color: {
      control: 'select',
      options: COLORS,
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

export const Playground: Story = {
  tags: ['!dev'],
};

export const Accent: Story = {
  render: () => (
    <Flex gap="md" wrap="wrap">
      <Video src={SAMPLE_SRC} width={320} color="inverted" />
      <Video src={SAMPLE_SRC} width={320} color="primary" />
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
