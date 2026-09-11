import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Flex } from '../../../index';
import { CheckIcon, CloseIcon, EyeIcon } from '../../../icons';
import type { TPaletteColor } from '../../../theme/types';
import { Button, ButtonGroup, IconButton, Text } from '../../index';
import type { TButtonSize, TButtonVariant } from '../button/types';

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

const VARIANTS: TButtonVariant[] = [
  'solid',
  'subtle',
  'surface',
  'outline',
  'ghost',
  'plain',
];

const SIZES: TButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta: Meta<typeof ButtonGroup> = {
  title: 'V3/Buttons/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
    },
    color: { control: 'select', options: COLORS },
    variant: { control: 'select', options: VARIANTS },
    appearance: { control: 'select', options: ['opaque', 'transparent'] },
    size: { control: 'select', options: SIZES },
    disabled: { control: 'boolean' },
    rounded: { control: 'boolean' },
  },
  args: {
    orientation: 'horizontal',
    color: 'default',
    variant: 'outline',
    appearance: 'opaque',
    size: 'md',
    disabled: false,
    rounded: false,
  },
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const Playground: Story = {
  tags: ['!dev'],
  render: (args) => (
    <ButtonGroup {...args}>
      <Button>Left</Button>
      <Button>Center</Button>
      <Button>Right</Button>
    </ButtonGroup>
  ),
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="sm">
      {COLORS.map((color) => (
        <ButtonGroup key={color} color={color} variant="outline">
          <Button>{color}</Button>
          <Button>Center</Button>
          <Button>Right</Button>
        </ButtonGroup>
      ))}
    </Flex>
  ),
};

export const Variants: Story = {
  render: () => (
    <Flex direction="column" gap="lg">
      {VARIANTS.map((variant) => (
        <Flex key={variant} direction="column" gap="xs">
          <Text size="sm">{variant}</Text>
          <ButtonGroup variant={variant} color="default">
            <Button>Left</Button>
            <Button>Center</Button>
            <Button>Right</Button>
          </ButtonGroup>
        </Flex>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex gap="sm" wrap="wrap" align="center">
      {SIZES.map((size) => (
        <ButtonGroup key={size} size={size} variant="outline">
          <Button>{size}</Button>
          <Button>Center</Button>
          <Button>Right</Button>
        </ButtonGroup>
      ))}
    </Flex>
  ),
};

export const Orientations: Story = {
  render: () => (
    <Flex gap="lg" align="flex-start">
      <ButtonGroup orientation="horizontal" variant="outline">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical" variant="outline">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </Flex>
  ),
};

export const WithIconButtons: Story = {
  render: () => (
    <ButtonGroup variant="outline">
      <IconButton aria-label="Check">
        <CheckIcon />
      </IconButton>
      <IconButton aria-label="Preview">
        <EyeIcon />
      </IconButton>
      <IconButton aria-label="Close">
        <CloseIcon />
      </IconButton>
    </ButtonGroup>
  ),
};

export const Mixed: Story = {
  render: () => (
    <ButtonGroup variant="outline">
      <Button>Edit</Button>
      <IconButton aria-label="Preview">
        <EyeIcon />
      </IconButton>
      <IconButton aria-label="Close">
        <CloseIcon />
      </IconButton>
    </ButtonGroup>
  ),
};

export const Pill: Story = {
  render: () => (
    <Flex gap="lg" align="center" wrap="wrap">
      <ButtonGroup rounded variant="solid">
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </ButtonGroup>
      <ButtonGroup rounded variant="outline">
        <IconButton aria-label="Check">
          <CheckIcon />
        </IconButton>
        <IconButton aria-label="Preview">
          <EyeIcon />
        </IconButton>
        <IconButton aria-label="Close">
          <CloseIcon />
        </IconButton>
      </ButtonGroup>
    </Flex>
  ),
};

export const OverrideChild: Story = {
  render: () => (
    <ButtonGroup variant="outline" color="default">
      <Button>Default</Button>
      <Button color="error" variant="solid">
        Override
      </Button>
      <Button>Default</Button>
    </ButtonGroup>
  ),
};
