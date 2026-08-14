import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button, Flex, Text } from '../../index';
const meta: Meta<typeof Flex> = {
  title: 'Layout/Flex',
  component: Flex,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'],
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    inline: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Flex>;

export const Default: Story = {
  render: (args) => (
    <Flex {...args} style={{ width: 420, padding: 12, border: '1px dashed #ccc' }}>
      <Button>One</Button>
      <Button variant="outline">Two</Button>
      <Button variant="ghost">Three</Button>
    </Flex>
  ),
  args: {
    direction: 'row',
    align: 'center',
    justify: 'start',
    gap: 'md',
    wrap: 'wrap',
    inline: false,
  },
};

export const Column: Story = {
  render: () => (
    <Flex direction="column" gap="sm" align="stretch" style={{ width: 240 }}>
      <Text>First</Text>
      <Text>Second</Text>
      <Text>Third</Text>
    </Flex>
  ),
};

export const SpaceBetween: Story = {
  render: () => (
    <Flex justify="space-between" align="center" gap="none" style={{ width: 420 }}>
      <Text>Left</Text>
      <Button size="sm">Action</Button>
    </Flex>
  ),
};

export const CustomGap: Story = {
  render: () => (
    <Flex gap="12px" align="center">
      <Button size="sm">12px</Button>
      <Button size="sm" variant="outline">
        raw string gap
      </Button>
    </Flex>
  ),
};
