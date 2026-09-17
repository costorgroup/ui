import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Skeleton, Text, Flex } from '../..';
import type { TSkeletonRadius } from './types';

const RADIUS: TSkeletonRadius[] = [
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'pill',
  'full',
];

const meta: Meta<typeof Skeleton> = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  args: {
    width: 240,
    height: 20,
    radius: 'md',
    animation: 'pulse',
  },
  argTypes: {
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
    radius: {
      control: 'select',
      options: RADIUS,
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', false],
    },
    animationOffset: {
      control: 'number',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Playground: Story = {
  tags: ['!dev'],
};

export const Animations: Story = {
  render: () => (
    <Flex direction="column" gap="md" style={{ width: 320 }}>
      <Flex direction="column" gap="xs">
        <Text size="sm">pulse</Text>
        <Skeleton width="100%" height={18} animation="pulse" />
      </Flex>
      <Flex direction="column" gap="xs">
        <Text size="sm">wave</Text>
        <Skeleton width="100%" height={18} animation="wave" />
      </Flex>
      <Flex direction="column" gap="xs">
        <Text size="sm">none</Text>
        <Skeleton width="100%" height={18} animation={false} />
      </Flex>
    </Flex>
  ),
};

export const Radius: Story = {
  render: () => (
    <Flex gap="md" align="center" wrap="wrap">
      <Skeleton width={48} height={48} radius="full" />
      <Skeleton width={120} height={48} radius="lg" />
      <Skeleton width={180} height={16} radius="pill" />
      <Skeleton width={200} height={120} radius="md" />
    </Flex>
  ),
};

export const CardPlaceholder: Story = {
  render: () => (
    <Flex direction="column" gap="sm" style={{ width: 280 }}>
      <Skeleton width="100%" height={140} radius="lg" animation="wave" />
      <Skeleton width="70%" height={18} animationOffset={120} />
      <Skeleton width="100%" height={14} animationOffset={240} />
      <Skeleton width="90%" height={14} animationOffset={360} />
    </Flex>
  ),
};

export const Staggered: Story = {
  render: () => (
    <Flex direction="column" gap="sm" style={{ width: 320 }}>
      {[0, 150, 300, 450].map((offset) => (
        <Skeleton
          key={offset}
          width="100%"
          height={16}
          animation="pulse"
          animationOffset={offset}
        />
      ))}
    </Flex>
  ),
};
