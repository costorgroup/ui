import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Flex } from '../../../index';
import type { TPaletteColor } from '../../../theme/types';
import { Button, Tooltip } from '../../index';
import type { TTooltipPlacement, TTooltipVariant } from './types';

const PLACEMENTS: TTooltipPlacement[] = [
  'top-start',
  'top',
  'top-end',
  'bottom-start',
  'bottom',
  'bottom-end',
  'left-start',
  'left',
  'left-end',
  'right-start',
  'right',
  'right-end',
];

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
];

const VARIANTS: TTooltipVariant[] = [
  'solid',
  'subtle',
  'surface',
  'outline',
  'plain',
];

const meta: Meta<typeof Tooltip> = {
  title: 'V2/Overlays/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: PLACEMENTS,
    },
    variant: {
      control: 'select',
      options: VARIANTS,
    },
    color: {
      control: 'select',
      options: COLORS,
    },
    offset: {
      control: 'number',
    },
    render: {
      table: { disable: true },
    },
    children: {
      table: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => (
    <Flex justify="center" align="center" style={{ minHeight: 240 }}>
      <Tooltip {...args}>
        <Button>Hover me</Button>
      </Tooltip>
    </Flex>
  ),
  args: {
    title: 'Tooltip',
    placement: 'top',
    offset: 8,
    variant: 'surface',
    color: 'default',
  },
};

export const Placements: Story = {
  render: () => (
    <Flex direction="column" gap="xl" align="center" style={{ padding: 48 }}>
      <Flex gap="sm" wrap="wrap" justify="center">
        {(['top-start', 'top', 'top-end'] as const).map((placement) => (
          <Tooltip key={placement} placement={placement} title={placement}>
            <Button variant="outline">{placement}</Button>
          </Tooltip>
        ))}
      </Flex>
      <Flex gap="xl" align="center">
        <Flex direction="column" gap="sm">
          {(['left-start', 'left', 'left-end'] as const).map((placement) => (
            <Tooltip key={placement} placement={placement} title={placement}>
              <Button variant="outline">{placement}</Button>
            </Tooltip>
          ))}
        </Flex>
        <Flex direction="column" gap="sm">
          {(['right-start', 'right', 'right-end'] as const).map((placement) => (
            <Tooltip key={placement} placement={placement} title={placement}>
              <Button variant="outline">{placement}</Button>
            </Tooltip>
          ))}
        </Flex>
      </Flex>
      <Flex gap="sm" wrap="wrap" justify="center">
        {(['bottom-start', 'bottom', 'bottom-end'] as const).map((placement) => (
          <Tooltip key={placement} placement={placement} title={placement}>
            <Button variant="outline">{placement}</Button>
          </Tooltip>
        ))}
      </Flex>
    </Flex>
  ),
};

export const Variants: Story = {
  render: () => (
    <Flex gap="sm" wrap="wrap" justify="center" align="center" style={{ minHeight: 120 }}>
      {VARIANTS.map((variant) => (
        <Tooltip key={variant} title={variant} variant={variant}>
          <Button variant="outline">{variant}</Button>
        </Tooltip>
      ))}
    </Flex>
  ),
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="md" align="center" style={{ padding: 24 }}>
      {COLORS.map((color) => (
        <Tooltip key={color} title={color} color={color} variant="surface">
          <Button variant="outline">{color}</Button>
        </Tooltip>
      ))}
    </Flex>
  ),
};

export const Offset: Story = {
  render: () => (
    <Flex gap="lg" justify="center" align="center" style={{ minHeight: 200 }}>
      <Tooltip placement="top" offset={4} title="offset={4}">
        <Button variant="outline">4px</Button>
      </Tooltip>
      <Tooltip placement="top" offset={16} title="offset={16}">
        <Button variant="outline">16px</Button>
      </Tooltip>
      <Tooltip placement="top" offset={32} title="offset={32}">
        <Button variant="outline">32px</Button>
      </Tooltip>
    </Flex>
  ),
};

export const CustomRender: Story = {
  render: () => (
    <Flex justify="center" align="center" style={{ minHeight: 240 }}>
      <Tooltip
        variant="surface"
        color="info"
        render={() => (
          <>
            <strong>Custom</strong> content
          </>
        )}
      >
        <Button>Hover me</Button>
      </Tooltip>
    </Flex>
  ),
};
