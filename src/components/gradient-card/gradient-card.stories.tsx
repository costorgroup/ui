import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Flex, GradientCard, Heading, Text } from '../../index';
import type { TPaletteColor } from '../../theme/types';

const COLORS: TPaletteColor[] = [
  'default',
  'primary',
  'secondary',
  'success',
  'error',
  'warning',
  'info',
  'dark',
  'light',
];

const meta: Meta<typeof GradientCard> = {
  title: 'Data Display/GradientCard',
  component: GradientCard,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: COLORS,
    },
    radius: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large', 'pill', 'circle'],
    },
    padding: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof GradientCard>;

export const Default: Story = {
  args: {
    color: 'primary',
    radius: 'large',
    padding: 'xl',
  },
  render: (args) => (
    <GradientCard {...args} style={{ width: 320, minHeight: 160 }}>
      <Flex direction="column" gap="sm" align="center">
        <Heading as="h4" color="light">
          Gradient card
        </Heading>
        <Text color="light" size="sm">
          Palette-driven gradient surface.
        </Text>
      </Flex>
    </GradientCard>
  ),
};

export const Colors: Story = {
  render: () => (
    <Flex gap="md" wrap="wrap">
      {COLORS.map((color) => (
        <GradientCard
          key={color}
          color={color}
          padding="lg"
          radius="large"
          style={{ width: 140, minHeight: 100 }}
        >
          <Text color={color === 'light' ? 'dark' : 'light'} size="sm">
            {color}
          </Text>
        </GradientCard>
      ))}
    </Flex>
  ),
};

export const Radius: Story = {
  render: () => (
    <Flex gap="md" wrap="wrap" align="center">
      {(['none', 'small', 'medium', 'large', 'pill'] as const).map((radius) => (
        <GradientCard
          key={radius}
          color="primary"
          radius={radius}
          padding="lg"
          style={{ width: 120, minHeight: 80 }}
        >
          <Text color="light" size="sm">
            {radius}
          </Text>
        </GradientCard>
      ))}
    </Flex>
  ),
};

export const Padding: Story = {
  render: () => (
    <Flex gap="md" wrap="wrap" align="center">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((padding) => (
        <GradientCard
          key={padding}
          color="secondary"
          radius="large"
          padding={padding}
          style={{ width: 140, minHeight: 80 }}
        >
          <Text color="light" size="sm">
            {padding}
          </Text>
        </GradientCard>
      ))}
    </Flex>
  ),
};
