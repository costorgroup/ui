import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Flex, Link, Text } from '../../index';
import type { TPaletteColor } from '../../theme/types';
import type { TLinkSize, TLinkVariant } from './types';

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
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    children: 'Read the docs',
    href: '#',
    variant: 'hover',
    size: 'md',
    color: 'primary',
  },
};

export const Inline: Story = {
  render: () => (
    <Text>
      See the{' '}
      <Link href="#">installation guide</Link> to add Costor UI to your project.
    </Text>
  ),
};

export const Variants: Story = {
  render: () => (
    <Flex gap="lg" wrap="wrap" align="center">
      {VARIANTS.map((variant) => (
        <Link key={variant} href="#" variant={variant}>
          {variant}
        </Link>
      ))}
    </Flex>
  ),
};
