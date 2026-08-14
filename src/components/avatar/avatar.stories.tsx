import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Avatar, AvatarGroup, Flex, Text } from '../../index';
const meta: Meta<typeof Avatar> = {
  title: 'Data Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    radius: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large', 'pill', 'circle'],
    },
    name: {
      control: 'text',
    },
    src: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    name: 'Remy Sharp',
    src: 'https://i.pravatar.cc/150?img=1',
    size: 'md',
    radius: 'circle',
  },
};

export const Initials: Story = {
  render: () => (
    <Flex gap="md" align="center">
      <Avatar name="Remy Sharp" />
      <Avatar name="Travis Howard" size="sm" />
      <Avatar name="Cindy Baker" size="lg" radius="large" />
      <Avatar name="A" />
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
        <Text size="sm">max={3}</Text>
        <AvatarGroup max={3} size="sm" spacing="small">
          <Avatar name="Remy Sharp" src="https://i.pravatar.cc/150?img=1" />
          <Avatar name="Travis Howard" src="https://i.pravatar.cc/150?img=2" />
          <Avatar name="Cindy Baker" src="https://i.pravatar.cc/150?img=3" />
          <Avatar name="Agnes Walker" src="https://i.pravatar.cc/150?img=4" />
        </AvatarGroup>
      </Flex>
    </Flex>
  ),
};
