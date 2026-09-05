import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Flex } from '../../../index';
import type { TPaletteColor } from '../../../theme/types';
import {
  Code,
  Text
} from '../../index';

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
];

const meta: Meta<typeof Code> = {
  title: 'V2/Typography/Code',
  component: Code,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'solid',
        'subtle',
        'surface',
        'outline',
        'plain',
      ],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: COLORS,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Code>;

export const Default: Story = {
  args: {
    children: 'console.log("Hello, world!")',
    variant: 'subtle',
    size: 'sm',
    color: 'base',
  },
};

export const Inline: Story = {
  render: () => (
    <Text size="md">
      Run <Code>npm install @costor/ui</Code> to add the library to your project.
    </Text>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex gap="sm" wrap="wrap" align="center">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Code key={size} size={size}>
          console.log()
        </Code>
      ))}
    </Flex>
  ),
};

export const Variants: Story = {
  render: () => (
    <Flex gap="sm" wrap="wrap" align="center">
      {(
        [
          'solid',
          'subtle',
          'surface',
          'outline',
          'plain',
        ] as const
      ).map((variant) => (
        <Code key={variant} variant={variant}>
          console.log()
        </Code>
      ))}
    </Flex>
  ),
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {COLORS.map((color) => (
        <Flex key={color} gap="sm" wrap="wrap" align="center">
          <Text size="sm" style={{ minWidth: 72 }}>
            {color}
          </Text>
          <Code color={color} variant="subtle">
            console.log()
          </Code>
          <Code color={color} variant="surface">
            console.log()
          </Code>
          <Code color={color} variant="solid">
            console.log()
          </Code>
        </Flex>
      ))}
    </Flex>
  ),
};
