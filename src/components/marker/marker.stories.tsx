import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { CheckIcon, FolderIcon, SearchIcon } from '../../icons';
import type { TPaletteColor } from '../../theme/types';
import { CircularProgress, Marker, MarkerContent, MarkerIcon, Text, Flex } from '../..';
import type { TMarkerVariant } from './types';

const VARIANTS: TMarkerVariant[] = ['default', 'border', 'separator'];
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

const meta: Meta<typeof Marker> = {
  title: 'Data Display/Marker',
  component: Marker,
  tags: ['autodocs'],
  args: {
    variant: 'default',
    color: 'default',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: VARIANTS,
    },
    color: {
      control: 'select',
      options: COLORS,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Marker>;

export const Default: Story = {
  render: (args) => (
    <Marker {...args}>
      <MarkerIcon>
        <SearchIcon />
      </MarkerIcon>
      <MarkerContent>Explored 4 files</MarkerContent>
    </Marker>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <Flex direction="column" gap="md" style={{ maxWidth: 420 }}>
      {VARIANTS.map((variant) => (
        <Marker key={variant} {...args} variant={variant}>
          <MarkerContent>
            {variant === 'separator'
              ? 'A separator marker'
              : variant === 'border'
                ? 'A border marker for row boundaries.'
                : 'A default marker for inline notes.'}
          </MarkerContent>
        </Marker>
      ))}
    </Flex>
  ),
};

export const Separator: Story = {
  render: (args) => (
    <Flex direction="column" gap="sm" style={{ maxWidth: 420 }}>
      <Marker {...args} variant="separator">
        <MarkerContent>Today</MarkerContent>
      </Marker>
      <Marker {...args} variant="separator">
        <MarkerContent>Worked for 42s</MarkerContent>
      </Marker>
      <Marker {...args} variant="separator">
        <MarkerContent>Conversation compacted</MarkerContent>
      </Marker>
    </Flex>
  ),
};

export const Border: Story = {
  render: (args) => (
    <Flex direction="column" style={{ maxWidth: 420 }}>
      <Marker {...args} variant="border">
        <MarkerIcon>
          <FolderIcon />
        </MarkerIcon>
        <MarkerContent>Switched to release-candidate</MarkerContent>
      </Marker>
      <Marker {...args} variant="border">
        <MarkerIcon>
          <SearchIcon />
        </MarkerIcon>
        <MarkerContent>Reviewed 8 related files</MarkerContent>
      </Marker>
      <Marker {...args} variant="border">
        <MarkerIcon>
          <CheckIcon />
        </MarkerIcon>
        <MarkerContent>Opened implementation notes</MarkerContent>
      </Marker>
    </Flex>
  ),
};

export const Status: Story = {
  render: (args) => (
    <Flex direction="column" gap="sm" style={{ maxWidth: 420 }}>
      <Marker {...args} role="status">
        <MarkerIcon>
          <CircularProgress width={14} height={14} color={args.color} />
        </MarkerIcon>
        <MarkerContent>Compacting conversation</MarkerContent>
      </Marker>
      <Marker {...args} role="status">
        <MarkerIcon>
          <CircularProgress width={14} height={14} color={args.color} />
        </MarkerIcon>
        <MarkerContent>Running tests</MarkerContent>
      </Marker>
    </Flex>
  ),
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="sm" style={{ maxWidth: 420 }}>
      {COLORS.map((color) => (
        <Marker key={color} color={color}>
          <MarkerIcon>
            <CheckIcon />
          </MarkerIcon>
          <MarkerContent>{color}</MarkerContent>
        </Marker>
      ))}
    </Flex>
  ),
};

export const AsLink: Story = {
  render: (args) => (
    <Flex direction="column" gap="sm" style={{ maxWidth: 420 }}>
      <Marker {...args} as="a" href="#pull-request">
        <MarkerIcon>
          <FolderIcon />
        </MarkerIcon>
        <MarkerContent>View the pull request</MarkerContent>
      </Marker>
      <Text size="sm">
        Nested link:{' '}
        <Marker {...args}>
          <MarkerContent>
            Revert <a href="#revert">this change</a>
          </MarkerContent>
        </Marker>
      </Text>
    </Flex>
  ),
};
