import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTheme } from '@emotion/react';
import React, { useState } from 'react';
import { Flex, Text, ThemeProvider } from '../../../index';
import type { TPaletteColor } from '../../../theme/types';
import {
  themePresetMap,
  type TThemePresetId,
} from '../../../theme/presets';
import { ThemeSwitcher } from '../../../../.storybook/theme-switcher';
import { Color } from '../../index';
import { ThemedSettingsCanvas } from '../window/settings-preview';
import type { TColorSize } from './types';

const PALETTE_COLORS: TPaletteColor[] = [
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

const SIZES: TColorSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta: Meta<typeof Color> = {
  title: 'V2/Data Display/Color',
  component: Color,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: SIZES,
    },
    colors: {
      control: 'color',
    },
    selected: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Color>;

export const Default: Story = {
  args: {
    size: 'md',
    selected: false,
  },
  render: function DefaultStory(args) {
    const theme = useTheme();

    return (
      <Color {...args} colors={args.colors ?? theme.colors.default.main} />
    );
  },
};

export const Sizes: Story = {
  render: function SizesStory() {
    const theme = useTheme();

    return (
      <Flex gap="sm" wrap="wrap" align="center">
        {SIZES.map((size) => (
          <Color
            key={size}
            size={size}
            colors={theme.colors.default.main}
            aria-label={size}
          />
        ))}
      </Flex>
    );
  },
};

export const Slices: Story = {
  render: function SlicesStory() {
    const { colors } = useTheme();

    return (
      <Flex gap="lg" wrap="wrap" align="center">
        <Flex direction="column" gap="xs" align="center">
          <Color colors={colors.info.main} aria-label="One color" />
          <Text size="sm">1 color</Text>
        </Flex>
        <Flex direction="column" gap="xs" align="center">
          <Color
            colors={[colors.base.main, colors.default.main]}
            aria-label="Two colors"
          />
          <Text size="sm">2 colors</Text>
        </Flex>
        <Flex direction="column" gap="xs" align="center">
          <Color
            colors={[colors.info.main, colors.success.main, colors.warning.main]}
            aria-label="Three colors"
          />
          <Text size="sm">3 colors</Text>
        </Flex>
        <Flex direction="column" gap="xs" align="center">
          <Color
            colors={[
              colors.base.main,
              colors.primary.main,
              colors.secondary.main,
              colors.info.main,
            ]}
            aria-label="Four colors"
          />
          <Text size="sm">4 colors</Text>
        </Flex>
      </Flex>
    );
  },
};

export const Palette: Story = {
  render: function PaletteStory() {
    const theme = useTheme();

    return (
      <Flex gap="sm" wrap="wrap" align="center">
        {PALETTE_COLORS.map((color) => (
          <Flex key={color} direction="column" gap="xs" align="center">
            <Color colors={theme.colors[color].main} aria-label={color} />
            <Text size="sm">{color}</Text>
          </Flex>
        ))}
      </Flex>
    );
  },
};

export const Themes: Story = {
  render: function ThemesStory() {
    const [presetId, setPresetId] = useState<TThemePresetId>('dark');
    const preset = themePresetMap[presetId];

    return (
      <Flex direction="column" gap="lg" align="center">
        <ThemeSwitcher
          size="md"
          justify="center"
          active={presetId}
          onSelect={setPresetId}
        />
        <ThemeProvider theme={preset}>
          <ThemedSettingsCanvas />
        </ThemeProvider>
      </Flex>
    );
  },
};
