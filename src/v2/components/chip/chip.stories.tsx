import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Flex, Text } from '../../../index';
import type { TPaletteColor } from '../../../theme/types';
import { Chip } from '../../index';
import type { TChipRadius, TChipSize, TChipVariant } from './types';

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

const VARIANTS: TChipVariant[] = [
  'solid',
  'subtle',
  'surface',
  'outline',
  'ghost',
  'plain',
];

const SIZES: TChipSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const RADIUS: TChipRadius[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'pill'];

const meta: Meta<typeof Chip> = {
  title: 'V3/Data Display/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    appearance: { control: 'select', options: ['opaque', 'transparent'] },
    size: { control: 'select', options: SIZES },
    color: { control: 'select', options: COLORS },
    radius: { control: 'select', options: RADIUS },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Chip',
    variant: 'solid',
    appearance: 'opaque',
    size: 'md',
    color: 'default',
    radius: 'sm',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const Playground: Story = {
  tags: ['!dev'],
};

export const Colors: Story = {
  render: () => (
    <Flex gap="sm" wrap="wrap" align="center">
      {COLORS.map((color) => (
        <Chip key={color} color={color}>
          {color}
        </Chip>
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
          <Flex gap="sm" wrap="wrap" align="center">
            {COLORS.map((color) => (
              <Chip key={color} variant={variant} color={color}>
                {color}
              </Chip>
            ))}
            <Chip variant={variant} disabled>
              disabled
            </Chip>
          </Flex>
        </Flex>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex gap="sm" wrap="wrap" align="center">
      {SIZES.map((size) => (
        <Chip key={size} size={size}>
          {size}
        </Chip>
      ))}
    </Flex>
  ),
};

export const Radius: Story = {
  render: () => (
    <Flex gap="sm" wrap="wrap" align="center">
      {RADIUS.map((radius) => (
        <Chip key={radius} radius={radius}>
          {radius}
        </Chip>
      ))}
    </Flex>
  ),
};

export const Clickable: Story = {
  render: () => (
    <Flex gap="sm" wrap="wrap" align="center">
      <Chip>Static</Chip>
      <Chip onClick={() => undefined}>Click me</Chip>
      <Chip disabled onClick={() => undefined}>
        Disabled
      </Chip>
    </Flex>
  ),
};

export const Deletable: Story = {
  render: () => {
    const [chips, setChips] = useState(['React', 'Vue', 'Svelte']);

    return (
      <Flex gap="sm" wrap="wrap" align="center">
        {chips.map((chip) => (
          <Chip
            key={chip}
            radius="pill"
            onDelete={() => setChips((current) => current.filter((item) => item !== chip))}
          >
            {chip}
          </Chip>
        ))}
      </Flex>
    );
  },
};

export const ClickAndDelete: Story = {
  render: () => {
    const [chips, setChips] = useState(['Inbox', 'Sent', 'Archive']);
    const [selected, setSelected] = useState('Inbox');

    return (
      <Flex gap="sm" wrap="wrap" align="center">
        {chips.map((chip) => (
          <Chip
            key={chip}
            radius="pill"
            variant={selected === chip ? 'solid' : 'subtle'}
            onClick={() => setSelected(chip)}
            onDelete={() => {
              setChips((current) => current.filter((item) => item !== chip));
              if (selected === chip) {
                setSelected(
                  chips.filter((item) => item !== chip)[0] ?? '',
                );
              }
            }}
          >
            {chip}
          </Chip>
        ))}
      </Flex>
    );
  },
};
