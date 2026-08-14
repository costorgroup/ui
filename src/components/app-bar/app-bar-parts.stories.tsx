import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../../index';
import { AppBarBase } from './app-bar-base';
import { AppBarLogo } from './app-bar-logo';
import { AppBarItems } from './app-bar-items';
import type { TPaletteColor } from '../../theme/types';
import type { TAppBarVariant } from './app-bar-base/types';

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

const meta: Meta<typeof AppBarBase> = {
  title: 'Components/AppBar/Parts',
  component: AppBarBase,
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

type Story = StoryObj<typeof AppBarBase>;

export const Default: Story = {
  render: (args) => (
    <AppBarBase {...args}>
      <AppBarLogo>
        <a href="#">
          <LogoMark />
          <span>Costor</span>
        </a>
      </AppBarLogo>
      <AppBarItems>
        <Button size="sm" variant="ghost" color={args.color}>
          Docs
        </Button>
        <Button size="sm" color={args.color}>
          Sign in
        </Button>
      </AppBarItems>
    </AppBarBase>
  ),
  args: {
    color: 'primary',
    variant: 'subtle',
    size: 'md',
    position: 'static',
  },
};

export const WithoutLogo: Story = {
  render: (args) => (
    <AppBarBase {...args}>
      <AppBarItems>
        <Button size="sm" variant="ghost" color={args.color}>
          Docs
        </Button>
        <Button size="sm" color={args.color}>
          Sign in
        </Button>
      </AppBarItems>
    </AppBarBase>
  ),
  args: {
    color: 'primary',
    variant: 'subtle',
    size: 'md',
    position: 'static',
  },
};
