import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { FolderIcon, MoreHorizontalIcon, StarIcon } from '../../icons';
import { Button, IconButton, Flex } from '../..';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemIcon,
  ItemTitle,
} from './';
import type { TItemRadius, TItemSize } from './types';

const SIZES: TItemSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const RADIUS: TItemRadius[] = [
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'pill',
  'full',
];

const meta: Meta<typeof Item> = {
  title: 'Data Display/Item',
  component: Item,
  tags: ['autodocs'],
  args: {
    appearance: 'opaque',
    radius: 'md',
    size: 'md',
    direction: 'horizontal',
  },
  argTypes: {
    appearance: {
      control: 'select',
      options: ['opaque', 'transparent'],
    },
    radius: {
      control: 'select',
      options: RADIUS,
    },
    size: {
      control: 'select',
      options: SIZES,
    },
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
  render: (args) => (
    <Item {...args} style={{ maxWidth: 560 }}>
      <ItemIcon>
        <FolderIcon />
      </ItemIcon>
      <ItemContent>
        <ItemTitle>Project files</ItemTitle>
        <ItemDescription>
          24 documents in Design / 2026. Last updated 2 hours ago.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="subtle">
          Open
        </Button>
        <IconButton aria-label="More" size="sm" variant="ghost">
          <MoreHorizontalIcon />
        </IconButton>
      </ItemActions>
    </Item>
  ),
};

export default meta;

type Story = StoryObj<typeof Item>;

export const Playground: Story = {
  tags: ['!dev'],
};

export const Image: Story = {
  render: (args) => (
    <Item {...args} style={{ maxWidth: 560 }}>
      <ItemIcon>
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop"
          alt=""
        />
      </ItemIcon>
      <ItemContent>
        <ItemTitle>Gradient study</ItemTitle>
        <ItemDescription>
          Cover art for the spring campaign. PNG, 2400 × 2400.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="ghost">
          Edit
        </Button>
      </ItemActions>
    </Item>
  ),
};

export const Stack: Story = {
  render: (args) => (
    <Flex direction="column" gap="sm" style={{ maxWidth: 560 }}>
      <Item {...args}>
        <ItemIcon>
          <FolderIcon />
        </ItemIcon>
        <ItemContent>
          <ItemTitle>Documents</ItemTitle>
          <ItemDescription>12 folders, 148 files</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="ghost">
            Open
          </Button>
        </ItemActions>
      </Item>
      <Item {...args}>
        <ItemIcon>
          <StarIcon />
        </ItemIcon>
        <ItemContent>
          <ItemTitle>Starred</ItemTitle>
          <ItemDescription>8 items you marked as important</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="ghost">
            Open
          </Button>
        </ItemActions>
      </Item>
    </Flex>
  ),
};

export const Transparent: Story = {
  args: {
    appearance: 'transparent',
  },
};

export const Sizes: Story = {
  render: () => (
    <Flex direction="column" gap="md" style={{ maxWidth: 640 }}>
      {SIZES.map((size) => (
        <Item key={size} size={size}>
          <ItemIcon>
            <FolderIcon />
          </ItemIcon>
          <ItemContent>
            <ItemTitle>{size}</ItemTitle>
            <ItemDescription>
              Icon, type, and padding scale with size.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size={size === 'xs' ? 'xs' : 'sm'} variant="subtle">
              Open
            </Button>
          </ItemActions>
        </Item>
      ))}
    </Flex>
  ),
};

export const Vertical: Story = {
  args: {
    direction: 'vertical',
  },
  render: (args) => (
    <Item {...args} style={{ maxWidth: 280 }}>
      <ItemIcon>
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop"
          alt=""
        />
      </ItemIcon>
      <ItemContent>
        <ItemTitle>Gradient study</ItemTitle>
        <ItemDescription>
          Cover art for the spring campaign. PNG, 2400 × 2400.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="subtle">
          Open
        </Button>
        <IconButton aria-label="More" size="sm" variant="ghost">
          <MoreHorizontalIcon />
        </IconButton>
      </ItemActions>
    </Item>
  ),
};
