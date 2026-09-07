import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTheme } from '@emotion/react';
import React from 'react';
import { Flex } from '../../../index';
import {
  Button,
  Text
} from '../../index';
import type { TPaletteColor } from '../../../theme/types';
import type { TButtonSize, TButtonVariant } from './types';

const SEMANTIC_COLORS = ['info', 'success', 'error', 'warning'] as const satisfies readonly TPaletteColor[];

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

const VARIANTS: TButtonVariant[] = [
  'solid',
  'subtle',
  'surface',
  'outline',
  'ghost',
  'plain',
];

const SIZES: TButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta: Meta<typeof Button> = {
  title: 'V2/Buttons/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    appearance: { control: 'select', options: ['opaque', 'transparent'] },
    size: { control: 'select', options: SIZES },
    color: { control: 'select', options: COLORS },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'solid',
    appearance: 'opaque',
    size: 'md',
    color: 'default',
    disabled: false,
  },
};

export const Variants: Story = {
  render: () => (
    <Flex direction="column" gap="lg">
      {VARIANTS.map((variant) => (
        <Flex key={variant} direction="column" gap="xs">
          <Text size="sm">{variant}</Text>
          <Flex gap="sm" wrap="wrap" align="center">
            {COLORS.map((color) => (
              <Button key={color} variant={variant} color={color}>
                {color}
              </Button>
            ))}
            <Button variant={variant} color="default" disabled>
              disabled
            </Button>
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
        <Button key={size} size={size} color="info">
          {size}
        </Button>
      ))}
    </Flex>
  ),
};

export const MacSemanticColors: Story = {
  render: function MacSemanticColorsStory() {
    const theme = useTheme();

    return (
      <Flex direction="column" gap="md">
        <Text size="sm">
          Semantic palettes are derived from main via createColorScale (±5–10%).
        </Text>
        <Flex gap="sm" wrap="wrap">
          {SEMANTIC_COLORS.map((color) => (
            <Button key={color} color={color}>
              {color} · {theme.colors[color].main}
            </Button>
          ))}
        </Flex>
      </Flex>
    );
  },
};
