import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { FolderIcon, SearchIcon } from '../../icons';
import { Avatar, Button, Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, Link, Flex } from '../..';

const RADIUS = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'pill'] as const;

const meta: Meta<typeof Empty> = {
  title: 'Data Display/Empty',
  component: Empty,
  tags: ['autodocs'],
  args: {
    appearance: 'transparent',
    variant: 'plain',
    radius: 'md',
  },
  argTypes: {
    appearance: {
      control: 'select',
      options: ['opaque', 'transparent'],
    },
    variant: {
      control: 'select',
      options: ['plain', 'surface'],
    },
    radius: {
      control: 'select',
      options: RADIUS,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Empty>;

export const Playground: Story = {
  tags: ['!dev'],
  render: (args) => (
    <Empty {...args}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderIcon />
        </EmptyMedia>
        <EmptyTitle>No projects yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any projects yet. Get started by creating
          your first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Flex gap="sm" justify="center" wrap="wrap">
          <Button size="sm">Create project</Button>
          <Button size="sm" variant="outline">
            Import project
          </Button>
        </Flex>
        <Link size="sm" href="#learn">
          Learn more
        </Link>
      </EmptyContent>
    </Empty>
  ),
};

export const Default: Story = {
  render: (args) => (
    <Empty {...args}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderIcon />
        </EmptyMedia>
        <EmptyTitle>No projects yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any projects yet. Get started by creating
          your first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Flex gap="sm" justify="center" wrap="wrap">
          <Button size="sm">Create project</Button>
          <Button size="sm" variant="outline">
            Import project
          </Button>
        </Flex>
        <Link size="sm" href="#learn">
          Learn more
        </Link>
      </EmptyContent>
    </Empty>
  ),
};

export const Surface: Story = {
  args: {
    variant: 'surface',
    appearance: 'opaque',
  },
  render: (args) => (
    <Empty {...args}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchIcon />
        </EmptyMedia>
        <EmptyTitle>No results</EmptyTitle>
        <EmptyDescription>
          We couldn&apos;t find anything matching your search. Try a different
          query or <a href="#filters">clear filters</a>.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm" variant="subtle">
          Reset search
        </Button>
      </EmptyContent>
    </Empty>
  ),
};

export const AvatarMedia: Story = {
  render: (args) => (
    <Empty {...args} variant="surface">
      <EmptyHeader>
        <EmptyMedia>
          <Avatar name="Lee Robinson" size="lg" />
        </EmptyMedia>
        <EmptyTitle>User offline</EmptyTitle>
        <EmptyDescription>
          This user is currently offline. Leave a message or try again later.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Leave message</Button>
      </EmptyContent>
    </Empty>
  ),
};
