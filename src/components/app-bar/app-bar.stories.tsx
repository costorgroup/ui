import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AppBar, Button, Flex } from '../../index';
import type { TPaletteColor } from '../../theme/types';
import type { TAppBarVariant } from './types';

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

const VARIANTS: TAppBarVariant[] = [
  'solid',
  'subtle',
  'surface',
  'outline',
  'ghost',
  'plain',
];

const LogoMark = () => (
  <svg viewBox="0 0 32 32" width={32} height={32} aria-hidden>
    <rect width="32" height="32" rx="8" fill="currentColor" opacity="0.9" />
    <path
      d="M8 16.5L13.5 22 24 10"
      fill="none"
      stroke="#fff"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const meta: Meta<typeof AppBar> = {
  title: 'Layout/AppBar',
  component: AppBar,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: COLORS,
    },
    variant: {
      control: 'select',
      options: VARIANTS,
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    position: {
      control: 'select',
      options: ['static', 'sticky', 'fixed'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof AppBar>;

export const Default: Story = {
  args: {
    color: 'primary',
    variant: 'subtle',
    size: 'md',
    position: 'static',
    logo: (
      <a href="#">
        <LogoMark />
        <span>Costor</span>
      </a>
    ),
    children: (
      <>
        <Button size="sm" variant="ghost">
          Docs
        </Button>
        <Button size="sm">Sign in</Button>
      </>
    ),
  },
};

export const Solid: Story = {
  args: {
    ...Default.args,
    variant: 'solid',
    children: (
      <>
        <Button size="sm" variant="ghost" color="primary">
          Docs
        </Button>
        <Button size="sm" variant="outline" color="light">
          Sign in
        </Button>
      </>
    ),
  },
};

export const Variants: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {VARIANTS.map((variant) => (
        <AppBar
          key={variant}
          variant={variant}
          color="primary"
          logo={
            <a href="#">
              <LogoMark />
              <span>{variant}</span>
            </a>
          }
        >
          <Button size="sm" variant="ghost">
            Action
          </Button>
        </AppBar>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <AppBar
          key={size}
          size={size}
          logo={
            <>
              <LogoMark />
              <span>size={size}</span>
            </>
          }
        >
          <Button size="sm">Sign in</Button>
        </AppBar>
      ))}
    </Flex>
  ),
};
