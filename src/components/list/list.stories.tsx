import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import type { TPaletteColor } from '../../theme/types';
import { List, ListItem, Flex, Text, TextField } from '../..';
import type { TListRadius, TListSize } from './types';
import type { TListVariant } from './variant-styles';

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

const VARIANTS: TListVariant[] = [
  'solid',
  'subtle',
  'surface',
  'outline',
  'plain',
];

const SIZES: TListSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const RADIUS: TListRadius[] = [
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'pill',
  'full',
];

const meta: Meta<typeof List> = {
  title: 'Data Display/List',
  component: List,
  tags: ['autodocs'],
  args: {
    color: 'default',
    variant: 'subtle',
    size: 'md',
    radius: 'md',
  },
  argTypes: {
    color: { control: 'select', options: COLORS },
    variant: { control: 'select', options: VARIANTS },
    size: { control: 'select', options: SIZES },
    radius: { control: 'select', options: RADIUS },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 420 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof List>;

const sampleItems = (
  <>
    <ListItem>Display name</ListItem>
    <ListItem>Email address</ListItem>
    <ListItem>Language preference</ListItem>
  </>
);

export const Default: Story = {
  render: (args) => <List {...args}>{sampleItems}</List>,
};

export const WithFields: Story = {
  args: {
    variant: 'surface',
    color: 'default',
    size: 'sm',
  },
  render: (args) => (
    <List {...args}>
      <ListItem>
        <TextField
          label="Display name"
          defaultValue="Costor"
          color="info"
          variant="surface"
          size="sm"
        />
      </ListItem>
      <ListItem>
        <TextField
          label="Email"
          type="email"
          defaultValue="hello@costor.dev"
          color="info"
          variant="surface"
          size="sm"
        />
      </ListItem>
      <ListItem>
        <Text size="sm" color="default">
          Idle chrome list rows with embedded fields.
        </Text>
      </ListItem>
    </List>
  ),
};

export const Variants: Story = {
  render: () => (
    <Flex direction="column" gap="md" style={{ width: 420 }}>
      {VARIANTS.map((variant) => (
        <List key={variant} variant={variant} color="default" size="sm">
          <ListItem>{variant}</ListItem>
          <ListItem>Second row</ListItem>
          <ListItem>Third row</ListItem>
        </List>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex direction="column" gap="md" style={{ width: 420 }}>
      {SIZES.map((size) => (
        <List key={size} size={size} variant="surface" color="default">
          <ListItem>{size} size list</ListItem>
          <ListItem>Second row</ListItem>
        </List>
      ))}
    </Flex>
  ),
};

export const Colors: Story = {
  args: {
    variant: 'surface',
  },
  render: (args) => (
    <Flex direction="column" gap="md" style={{ width: 420 }}>
      {COLORS.map((color) => (
        <List key={color} {...args} color={color} size="sm">
          <ListItem>{color}</ListItem>
          <ListItem>Second row</ListItem>
        </List>
      ))}
    </Flex>
  ),
};
