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
import { SettingsPreview, BlurBackdrop } from '../window/settings-preview';
import {
  chromeOpaqueFill,
  paletteTint,
} from '../../surface';
import {
  CHROME_IDLE,
  CHROME_HOVER,
  CHROME_FOCUS,
  PALETTE_TINT,
} from '../../idle-variant-styles';
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

const TokenSwatch = ({
  label,
  colors,
}: {
  label: string;
  colors: string | string[];
}) => (
  <Flex direction="column" gap="xs" align="center">
    <Color colors={colors} aria-label={label} title={label} />
    <Text size="sm">{label}</Text>
  </Flex>
);

const ThemeTokenGuide = () => {
  const theme = useTheme();
  const { base, default: contrast } = theme.colors;

  return (
    <Flex direction="column" gap="md" style={{ maxWidth: 640 }}>
      <Text size="sm">
        base — theme canvas (main / light / lighter / dark / darker).
        base.contrastText — chrome mixer (darken or lighten tabs, accordion,
        idle fills). default — user contrast scale. default.main — theme text
        and default button fill. Other palettes (primary, info, …) are chosen
        per component.
      </Text>
      <Text size="sm">
        Chrome washes mix base.contrastText onto base.main (or transparent).
        Text and contrast fills use default.main, not base.contrastText.
      </Text>
      <Flex gap="sm" wrap="wrap" justify="center">
        <TokenSwatch label="base.main" colors={base.main} />
        <TokenSwatch label="base.contrastText" colors={base.contrastText} />
        <TokenSwatch label="default.main" colors={contrast.main} />
        <TokenSwatch
          label="palette tint 15%"
          colors={paletteTint(theme, contrast.main, PALETTE_TINT)}
        />
        <TokenSwatch
          label="idle 5%"
          colors={chromeOpaqueFill(theme, CHROME_IDLE)}
        />
        <TokenSwatch
          label="hover 10%"
          colors={chromeOpaqueFill(theme, CHROME_HOVER)}
        />
        <TokenSwatch
          label="focus 15%"
          colors={chromeOpaqueFill(theme, CHROME_FOCUS)}
        />
      </Flex>
    </Flex>
  );
};

const SIZES: TColorSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const ThemedStoryCanvas = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 24,
        boxSizing: 'border-box',
        width: '100%',
        minHeight: '100vh',
        padding: 32,
        backgroundColor: theme.colors.base.main,
        color: theme.colors.default.main,
      }}
    >
      {children}
    </div>
  );
};

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
  parameters: {
    layout: 'fullscreen',
  },
  render: function ThemesStory() {
    const [presetId, setPresetId] = useState<TThemePresetId>('dark');
    const preset = themePresetMap[presetId];

    return (
      <ThemeProvider theme={preset}>
        <ThemedStoryCanvas>
          <ThemeSwitcher
            size="md"
            justify="center"
            active={presetId}
            onSelect={setPresetId}
          />
          <ThemeTokenGuide />
          <BlurBackdrop>
            <SettingsPreview />
          </BlurBackdrop>
        </ThemedStoryCanvas>
      </ThemeProvider>
    );
  },
};
