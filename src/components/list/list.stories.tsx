import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Flex, List, ListItem } from '../../index';
import type { TListSize, TListStyle } from './types';

const LIST_STYLES: TListStyle[] = ['ordered', 'unordered', 'none'];
const LIST_SIZES: TListSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta: Meta<typeof List> = {
  title: 'Data Display/List',
  component: List,
  tags: ['autodocs'],
  argTypes: {
    listStyle: {
      control: 'select',
      options: LIST_STYLES,
    },
    size: {
      control: 'select',
      options: LIST_SIZES,
    },
    color: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'success',
        'error',
        'warning',
        'info',
        'dark',
        'light',
      ],
    },
    titleAs: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    title: { control: 'text' },
    description: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof List>;

export const Default: Story = {
  args: {
    listStyle: 'unordered',
    size: 'md',
    color: 'primary',
    title: 'Getting started',
    description: 'Follow these steps to set up your workspace.',
  },
  render: (args) => (
    <List {...args}>
      <ListItem>Create a new project</ListItem>
      <ListItem>Install the design system package</ListItem>
      <ListItem>Wrap your app with the theme provider</ListItem>
    </List>
  ),
};

export const Ordered: Story = {
  args: {
    listStyle: 'ordered',
    size: 'md',
    color: 'secondary',
    title: 'Verification steps',
    description: 'Complete each step in order.',
  },
  render: (args) => (
    <List {...args}>
      <ListItem>Confirm your email address</ListItem>
      <ListItem>Enable two-factor authentication</ListItem>
      <ListItem>Review account recovery options</ListItem>
    </List>
  ),
};

export const WithoutHeader: Story = {
  args: {
    listStyle: 'unordered',
    size: 'md',
    color: 'primary',
  },
  render: (args) => (
    <List {...args}>
      <ListItem>First item</ListItem>
      <ListItem>Second item</ListItem>
      <ListItem>Third item</ListItem>
    </List>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex direction="column" gap="lg">
      {LIST_SIZES.map((size) => (
        <List
          key={size}
          size={size}
          listStyle="unordered"
          color="primary"
          title={size}
          description={`List size ${size}`}
        >
          <ListItem>First item</ListItem>
          <ListItem>Second item</ListItem>
          <ListItem>Third item</ListItem>
        </List>
      ))}
    </Flex>
  ),
};

export const Styles: Story = {
  render: () => (
    <Flex direction="column" gap="lg">
      {LIST_STYLES.map((listStyle) => (
        <List
          key={listStyle}
          listStyle={listStyle}
          color="primary"
          title={listStyle}
        >
          <ListItem>{listStyle} — one</ListItem>
          <ListItem>{listStyle} — two</ListItem>
          <ListItem>{listStyle} — three</ListItem>
        </List>
      ))}
    </Flex>
  ),
};
