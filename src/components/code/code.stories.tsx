import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import type { TPaletteColor } from '../../theme/types';
import { Code, Text, Flex } from '../..';
import type { TCodeSize, TCodeVariant } from './types';

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

const VARIANTS: TCodeVariant[] = [
  'solid',
  'subtle',
  'surface',
  'outline',
  'plain',
];

const SIZES: TCodeSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta: Meta<typeof Code> = {
  title: 'Typography/Code',
  component: Code,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: VARIANTS,
    },
    size: {
      control: 'select',
      options: SIZES,
    },
    color: {
      control: 'select',
      options: COLORS,
    },
  },
  args: {
    children: 'console.log("Hello, world!")',
    variant: 'subtle',
    size: 'sm',
    color: 'default',
  },
};

export default meta;

type Story = StoryObj<typeof Code>;

export const Playground: Story = {
  tags: ['!dev'],
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="sm">
      {COLORS.map((color) => (
        <Text key={color} size="sm">
          This code will be in '{color}' color:{' '}
          <Code color={color}>console.log()</Code>
        </Text>
      ))}
    </Flex>
  ),
};

export const Variants: Story = {
  render: () => (
    <Flex gap="sm" wrap="wrap" align="center">
      {VARIANTS.map((variant) => (
        <Code key={variant} variant={variant}>
          {variant}
        </Code>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex gap="sm" wrap="wrap" align="center">
      {SIZES.map((size) => (
        <Code key={size} size={size}>
          {size}
        </Code>
      ))}
    </Flex>
  ),
};

export const Inline: Story = {
  render: () => (
    <Text size="md">
      Run <Code>npm install @costor/ui</Code> to add the library to your project.
    </Text>
  ),
};
