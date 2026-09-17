import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import type { TPaletteColor } from '../../theme/types';
import { Link, Text, Flex } from '../..';
import type { TLinkSize, TLinkVariant } from './types';

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

const VARIANTS: TLinkVariant[] = ['underline', 'hover', 'plain'];
const SIZES: TLinkSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta: Meta<typeof Link> = {
  title: 'Typography/Link',
  component: Link,
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
    children: 'Read the docs',
    href: '#',
    variant: 'plain',
    size: 'md',
    color: 'primary',
  },
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Playground: Story = {
  tags: ['!dev'],
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="sm">
      {COLORS.map((color) => (
        <Link key={color} href="#" color={color}>
          This link will be in '{color}' color.
        </Link>
      ))}
    </Flex>
  ),
};

export const Variants: Story = {
  render: () => (
    <Flex gap="lg" wrap="wrap" align="center">
      {VARIANTS.map((variant) => (
        <Link key={variant} href="#" variant={variant}>
          This link will be in '{variant}' variant.
        </Link>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex direction="column" gap="sm">
      {SIZES.map((size) => (
        <Link key={size} href="#" size={size}>
          This link will be in '{size}' size.
        </Link>
      ))}
    </Flex>
  ),
};

export const Inline: Story = {
  render: () => (
    <Text>
      See the <Link href="#">installation guide</Link> to add Costor UI to your
      project.
    </Text>
  ),
};
