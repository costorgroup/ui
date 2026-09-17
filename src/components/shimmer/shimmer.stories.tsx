import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Heading, Shimmer, Text, Flex } from '../..';
import type { TPaletteColor } from '../../theme/types';

const COLORS: TPaletteColor[] = [
  'default',
  'primary',
  'secondary',
  'success',
  'error',
  'warning',
  'info',
];

const meta: Meta<typeof Shimmer> = {
  title: 'Typography/Shimmer',
  component: Shimmer,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: COLORS,
    },
    duration: {
      control: 'number',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Shimmer>;

export const Default: Story = {
  args: {
    children: 'Loading your workspace…',
    color: 'default',
  },
  render: (args) => (
    <Heading as="h3" style={{ margin: 0 }}>
      <Shimmer {...args} />
    </Heading>
  ),
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {COLORS.map((color) => (
        <Flex key={color} direction="column" gap="xs">
          <Text size="sm">color={color}</Text>
          <Heading as="h4" style={{ margin: 0 }}>
            <Shimmer color={color}>Generating with AI</Shimmer>
          </Heading>
        </Flex>
      ))}
    </Flex>
  ),
};

export const InlineText: Story = {
  render: () => (
    <Text>
      Your report is <Shimmer color="primary">still processing</Shimmer>,
      hang tight.
    </Text>
  ),
};
