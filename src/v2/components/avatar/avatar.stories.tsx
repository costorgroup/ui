import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Flex } from '../../../index';
import { Avatar, AvatarGroup, Text } from '../../index';
import type { TAvatarRadius, TAvatarSize } from './types';

const SIZES: TAvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const RADIUS: TAvatarRadius[] = [
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'pill',
  'full',
];

const meta: Meta<typeof Avatar> = {
  title: 'V3/Data Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: SIZES },
    radius: { control: 'select', options: RADIUS },
    name: { control: 'text' },
    src: { control: 'text' },
  },
  args: {
    name: 'Remy Sharp',
    src: 'https://i.pravatar.cc/150?img=1',
    size: 'md',
    radius: 'full',
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Playground: Story = {
  tags: ['!dev'],
};

export const Initials: Story = {
  render: () => (
    <Flex gap="md" align="center">
      <Avatar name="Remy Sharp" />
      <Avatar name="Travis Howard" size="sm" />
      <Avatar name="Cindy Baker" size="lg" radius="lg" />
      <Avatar name="A" />
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex gap="md" align="center">
      {SIZES.map((size) => (
        <Avatar key={size} name="Ada Lovelace" size={size} />
      ))}
    </Flex>
  ),
};

export const Radius: Story = {
  render: () => (
    <Flex gap="md" align="center">
      {RADIUS.map((radius) => (
        <Avatar key={radius} name="Ada Lovelace" radius={radius} />
      ))}
    </Flex>
  ),
};

export const BrokenImage: Story = {
  render: () => (
    <Flex gap="md" align="center">
      <Avatar name="Broken Link" src="https://broken.invalid/avatar.jpg" />
      <Avatar name="No Source" />
    </Flex>
  ),
};

export const Group: Story = {
  render: () => (
    <Flex direction="column" gap="lg">
      <Flex direction="column" gap="xs">
        <Text size="sm">Default max</Text>
        <AvatarGroup>
          <Avatar name="Remy Sharp" src="https://i.pravatar.cc/150?img=1" />
          <Avatar name="Travis Howard" src="https://i.pravatar.cc/150?img=2" />
          <Avatar name="Cindy Baker" src="https://i.pravatar.cc/150?img=3" />
          <Avatar name="Agnes Walker" src="https://i.pravatar.cc/150?img=4" />
          <Avatar name="Trevor Henderson" src="https://i.pravatar.cc/150?img=5" />
          <Avatar name="Extra Person" src="https://i.pravatar.cc/150?img=6" />
        </AvatarGroup>
      </Flex>
      <Flex direction="column" gap="xs">
        <Text size="sm">total + renderSurplus</Text>
        <AvatarGroup
          total={4251}
          renderSurplus={(surplus) => <span>+{surplus.toString()[0]}k</span>}
        >
          <Avatar name="Remy Sharp" src="https://i.pravatar.cc/150?img=1" />
          <Avatar name="Travis Howard" src="https://i.pravatar.cc/150?img=2" />
        </AvatarGroup>
      </Flex>
      <Flex direction="column" gap="xs">
        <Text size="sm">max=3</Text>
        <AvatarGroup max={3} size="sm" spacing="sm">
          <Avatar name="Remy Sharp" src="https://i.pravatar.cc/150?img=1" />
          <Avatar name="Travis Howard" src="https://i.pravatar.cc/150?img=2" />
          <Avatar name="Cindy Baker" src="https://i.pravatar.cc/150?img=3" />
          <Avatar name="Agnes Walker" src="https://i.pravatar.cc/150?img=4" />
        </AvatarGroup>
      </Flex>
    </Flex>
  ),
};
