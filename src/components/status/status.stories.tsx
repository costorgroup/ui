import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import type { TPaletteColor } from '../../theme/types';
import { Flex, Text } from '../..';
import { Status } from './';
import type { TStatusSize } from './types';

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

const SIZES: TStatusSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta: Meta<typeof Status> = {
  title: 'Data Display/Status',
  component: Status,
  tags: ['autodocs'],
  args: {
    color: 'success',
    size: 'md',
    pulse: false,
  },
  argTypes: {
    color: { control: 'select', options: COLORS },
    size: { control: 'select', options: SIZES },
    pulse: { control: 'boolean' },
  },
  parameters: {
    controls: {
      include: ['color', 'size', 'pulse'],
    },
  },
  render: (args) => (
    <Text>
      <Status {...args} /> Active
    </Text>
  ),
};

export default meta;

type Story = StoryObj<typeof Status>;

export const Playground: Story = {};

export const Colors: Story = {
  render: () => (
    <Flex gap="lg" wrap="wrap" align="center">
      {COLORS.map((color) => (
        <Text key={color}>
          <Status color={color} /> {color}
        </Text>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex gap="lg" wrap="wrap" align="center">
      {SIZES.map((size) => (
        <Text key={size}>
          <Status size={size} /> {size}
        </Text>
      ))}
    </Flex>
  ),
};

export const TextSizes: Story = {
  name: 'Aligned with text sizes',
  render: () => (
    <Flex direction="column" gap="sm">
      {SIZES.map((size) => (
        <Text key={size} size={size}>
          <Status size={size} /> Active
        </Text>
      ))}
    </Flex>
  ),
};

export const Examples: Story = {
  render: () => (
    <Flex direction="column" gap="sm">
      <Text>
        <Status color="success" /> Active
      </Text>
      <Text>
        <Status color="warning" /> Pending
      </Text>
      <Text>
        <Status color="error" /> Failed
      </Text>
      <Text>
        <Status color="info" /> In review
      </Text>
      <Text>
        <Status color="secondary" /> Archived
      </Text>
    </Flex>
  ),
};

export const Pulse: Story = {
  render: () => (
    <Flex gap="lg" align="center">
      <Text>
        <Status color="success" pulse /> Live
      </Text>
      <Text>
        <Status color="error" pulse /> Recording
      </Text>
    </Flex>
  ),
};

export const Standalone: Story = {
  render: () => (
    <Flex gap="md" align="center">
      <Status color="success" aria-label="Online" />
      <Status color="warning" aria-label="Away" />
      <Status color="error" aria-label="Busy" />
    </Flex>
  ),
};
