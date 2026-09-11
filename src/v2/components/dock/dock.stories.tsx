import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Flex } from '../../../index';
import {
  FolderIcon,
  MoreHorizontalIcon,
  PlayIcon,
  SearchIcon,
  StarIcon,
} from '../../../icons';
import { Dock, DockItem, DockSeparator, Text } from '../../index';
import type { TDockOrientation, TDockVariant } from './types';

const VARIANTS: TDockVariant[] = ['subtle', 'surface', 'plain'];
const ORIENTATIONS: TDockOrientation[] = ['horizontal', 'vertical'];

const meta: Meta<typeof Dock> = {
  title: 'V3/Layout/Dock',
  component: Dock,
  tags: ['autodocs'],
  args: {
    appearance: 'opaque',
    variant: 'surface',
    orientation: 'horizontal',
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ORIENTATIONS,
    },
    appearance: {
      control: 'select',
      options: ['opaque', 'transparent'],
    },
    variant: {
      control: 'select',
      options: VARIANTS,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dock>;

const Items = () => (
  <>
    <DockItem aria-label="Search">
      <SearchIcon />
    </DockItem>
    <DockItem aria-label="Star">
      <StarIcon />
    </DockItem>
    <DockSeparator />
    <DockItem aria-label="Folder">
      <FolderIcon />
    </DockItem>
    <DockItem aria-label="Play">
      <PlayIcon />
    </DockItem>
    <DockSeparator />
    <DockItem aria-label="More">
      <MoreHorizontalIcon />
    </DockItem>
  </>
);

export const Playground: Story = {
  tags: ['!dev'],
  render: (args) => (
    <Dock {...args}>
      <Items />
    </Dock>
  ),
};

export const Variants: Story = {
  render: () => (
    <Flex direction="column" gap="lg">
      {VARIANTS.map((variant) => (
        <Flex key={variant} direction="column" gap="xs">
          <Text size="sm">{variant}</Text>
          <Dock variant={variant}>
            <Items />
          </Dock>
        </Flex>
      ))}
    </Flex>
  ),
};

export const Orientations: Story = {
  render: () => (
    <Flex gap="xl" align="flex-start">
      {ORIENTATIONS.map((orientation) => (
        <Flex key={orientation} direction="column" gap="xs">
          <Text size="sm">{orientation}</Text>
          <Dock orientation={orientation}>
            <Items />
          </Dock>
        </Flex>
      ))}
    </Flex>
  ),
};

export const Colored: Story = {
  render: (args) => (
    <Dock {...args}>
      <DockItem color="info" aria-label="Search">
        <SearchIcon />
      </DockItem>
      <DockItem color="warning" aria-label="Star">
        <StarIcon />
      </DockItem>
      <DockSeparator />
      <DockItem color="secondary" aria-label="Folder">
        <FolderIcon />
      </DockItem>
      <DockItem color="success" aria-label="Play">
        <PlayIcon />
      </DockItem>
      <DockSeparator />
      <DockItem color="primary" aria-label="More">
        <MoreHorizontalIcon />
      </DockItem>
    </Dock>
  ),
};
