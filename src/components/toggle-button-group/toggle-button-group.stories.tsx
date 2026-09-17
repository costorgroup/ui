import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { CheckIcon, CloseIcon, EyeIcon } from '../../icons';
import type { TPaletteColor } from '../../theme/types';
import { Text, ToggleButton, ToggleButtonGroup, ToggleIconButton, Flex } from '../..';
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

const meta: Meta<typeof ToggleButtonGroup> = {
  title: 'Buttons/ToggleButtonGroup',
  component: ToggleButtonGroup,
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
    exclusive: { control: 'boolean' },
  },
  args: {
    orientation: 'horizontal',
    color: 'default',
    variant: 'outline',
    appearance: 'opaque',
    size: 'md',
    disabled: false,
    rounded: false,
    exclusive: true,
    defaultValue: 'center',
  },
};

export default meta;

type Story = StoryObj<typeof ToggleButtonGroup>;

export const Playground: Story = {
  tags: ['!dev'],
  render: (args) => (
    <ToggleButtonGroup {...args}>
      <ToggleButton value="left">Left</ToggleButton>
      <ToggleButton value="center">Center</ToggleButton>
      <ToggleButton value="right">Right</ToggleButton>
    </ToggleButtonGroup>
  ),
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="sm">
      {COLORS.map((color) => (
        <ToggleButtonGroup
          key={color}
          color={color}
          variant="outline"
          defaultValue="center"
        >
          <ToggleButton value="left">{color}</ToggleButton>
          <ToggleButton value="center">Center</ToggleButton>
          <ToggleButton value="right">Right</ToggleButton>
        </ToggleButtonGroup>
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
          <ToggleButtonGroup
            variant={variant}
            color="default"
            defaultValue="center"
          >
            <ToggleButton value="left">Left</ToggleButton>
            <ToggleButton value="center">Center</ToggleButton>
            <ToggleButton value="right">Right</ToggleButton>
          </ToggleButtonGroup>
        </Flex>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex gap="sm" wrap="wrap" align="center">
      {SIZES.map((size) => (
        <ToggleButtonGroup
          key={size}
          size={size}
          variant="outline"
          defaultValue="center"
        >
          <ToggleButton value="left">{size}</ToggleButton>
          <ToggleButton value="center">Center</ToggleButton>
          <ToggleButton value="right">Right</ToggleButton>
        </ToggleButtonGroup>
      ))}
    </Flex>
  ),
};

export const Orientations: Story = {
  render: () => (
    <Flex gap="lg" align="flex-start">
      <ToggleButtonGroup
        orientation="horizontal"
        variant="outline"
        defaultValue="two"
      >
        <ToggleButton value="one">One</ToggleButton>
        <ToggleButton value="two">Two</ToggleButton>
        <ToggleButton value="three">Three</ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        orientation="vertical"
        variant="outline"
        defaultValue="two"
      >
        <ToggleButton value="one">One</ToggleButton>
        <ToggleButton value="two">Two</ToggleButton>
        <ToggleButton value="three">Three</ToggleButton>
      </ToggleButtonGroup>
    </Flex>
  ),
};

export const Exclusive: Story = {
  render: function ExclusiveStory() {
    const [value, setValue] = useState<string | null>('left');

    return (
      <Flex direction="column" gap="sm">
        <ToggleButtonGroup
          exclusive
          value={value}
          onChange={(_, next) => setValue(next as string | null)}
        >
          <ToggleButton value="left">Left</ToggleButton>
          <ToggleButton value="center">Center</ToggleButton>
          <ToggleButton value="right">Right</ToggleButton>
        </ToggleButtonGroup>
        <Text size="sm">value: {String(value)}</Text>
      </Flex>
    );
  },
};

export const Multiple: Story = {
  render: function MultipleStory() {
    const [value, setValue] = useState<Array<string | number>>(['bold']);

    return (
      <Flex direction="column" gap="sm">
        <ToggleButtonGroup
          exclusive={false}
          value={value}
          onChange={(_, next) =>
            setValue((next as Array<string | number>) ?? [])
          }
        >
          <ToggleButton value="bold">Bold</ToggleButton>
          <ToggleButton value="italic">Italic</ToggleButton>
          <ToggleButton value="underline">Underline</ToggleButton>
        </ToggleButtonGroup>
        <Text size="sm">value: {value.join(', ') || 'none'}</Text>
      </Flex>
    );
  },
};

export const WithIconButtons: Story = {
  render: () => (
    <ToggleButtonGroup variant="outline" defaultValue="check">
      <ToggleIconButton value="check" aria-label="Check">
        <CheckIcon />
      </ToggleIconButton>
      <ToggleIconButton value="preview" aria-label="Preview">
        <EyeIcon />
      </ToggleIconButton>
      <ToggleIconButton value="close" aria-label="Close">
        <CloseIcon />
      </ToggleIconButton>
    </ToggleButtonGroup>
  ),
};

export const Pill: Story = {
  render: () => (
    <Flex gap="lg" align="center" wrap="wrap">
      <ToggleButtonGroup rounded variant="solid" defaultValue="center">
        <ToggleButton value="left">Left</ToggleButton>
        <ToggleButton value="center">Center</ToggleButton>
        <ToggleButton value="right">Right</ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup rounded variant="outline" defaultValue="check">
        <ToggleIconButton value="check" aria-label="Check">
          <CheckIcon />
        </ToggleIconButton>
        <ToggleIconButton value="preview" aria-label="Preview">
          <EyeIcon />
        </ToggleIconButton>
        <ToggleIconButton value="close" aria-label="Close">
          <CloseIcon />
        </ToggleIconButton>
      </ToggleButtonGroup>
    </Flex>
  ),
};
