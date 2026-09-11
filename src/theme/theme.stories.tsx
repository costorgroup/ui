import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { CSSProperties, useState } from 'react';
import { ThemeSwitcher } from '../../.storybook/theme-switcher';
import { Flex, Text } from '../components';
import { Color, ColorPickerField, ThemePreview } from '../v2';
import { Button } from '../v2/components/button';
import { SettingsPreview, BlurBackdrop } from '../v2/components/window/settings-preview';
import type { TThemeAppearance } from './appearance';
import { ThemeProvider } from './provider';
import { useTheme } from './use-theme';

type TSurfaceDraft = {
  panelBackground: string;
  panelBorder: string;
  textPrimary: string;
  textSecondary: string;
  backdrop: string;
  divider: string;
  mixer: string;
};

const SURFACE_FIELDS: { key: keyof TSurfaceDraft; label: string }[] = [
  { key: 'panelBackground', label: 'Panel background' },
  { key: 'panelBorder', label: 'Panel border' },
  { key: 'textPrimary', label: 'Text primary' },
  { key: 'textSecondary', label: 'Text secondary' },
  { key: 'backdrop', label: 'Backdrop' },
  { key: 'divider', label: 'Divider' },
  { key: 'mixer', label: 'Mixer' },
];

const LIGHT_SURFACES: TSurfaceDraft = {
  panelBackground: '#ffffff',
  panelBorder: '#0000000d',
  textPrimary: '#000000',
  textSecondary: '#00000099',
  backdrop: '#00000080',
  divider: '#0000001a',
  mixer: '#000000',
};

const DARK_SURFACES: TSurfaceDraft = {
  panelBackground: '#111111',
  panelBorder: '#ffffff1f',
  textPrimary: '#ffffff',
  textSecondary: '#ffffff99',
  backdrop: '#00000080',
  divider: '#ffffff1a',
  mixer: '#ffffff',
};

const ModeAdjust = ({
  appearance,
  defaults,
}: {
  appearance: TThemeAppearance;
  defaults: TSurfaceDraft;
}) => {
  const theme = useTheme();
  const [draft, setDraft] = useState(defaults);

  const pane: CSSProperties = {
    position: 'relative',
    boxSizing: 'border-box',
    flex: 1,
    minWidth: 0,
    height: '100%',
    overflow: 'hidden',
    backgroundColor: draft.backdrop,
  };

  const fields: CSSProperties = {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    width: 280,
    maxHeight: 'calc(100% - 32px)',
    overflow: 'auto',
    padding: 12,
    borderRadius: theme.radius.large,
    backgroundColor: draft.panelBackground,
    border: `1px solid ${draft.panelBorder}`,
    color: draft.textPrimary,
  };

  const panel: CSSProperties = {
    position: 'absolute',
    right: 24,
    bottom: 24,
    boxSizing: 'border-box',
    width: 260,
    padding: 16,
    borderRadius: theme.radius.large,
    backgroundColor: draft.panelBackground,
    border: `1px solid ${draft.panelBorder}`,
  };

  return (
    <div style={pane}>
      <div style={fields}>
        {SURFACE_FIELDS.map((field) => (
          <ColorPickerField
            key={field.key}
            label={field.label}
            size="sm"
            format="hexa"
            value={draft[field.key]}
            onChange={(value) =>
              setDraft((current) => ({ ...current, [field.key]: value }))
            }
          />
        ))}
      </div>
      <div style={panel}>
        <div style={{ color: draft.textPrimary, fontSize: 15, lineHeight: 1.4 }}>
          {appearance === 'light' ? 'Light' : 'Dark'} primary
        </div>
        <div
          style={{
            height: 1,
            margin: '12px 0',
            backgroundColor: draft.divider,
          }}
        />
        <div style={{ color: draft.textSecondary, fontSize: 13, lineHeight: 1.4 }}>
          Secondary text
        </div>
      </div>
    </div>
  );
};

const SCALE_KEYS = ['lighter', 'light', 'main', 'dark', 'darker'] as const;

const Playground = () => {
  const theme = useTheme();
  const pack = theme.accents.find((item) => item.id === theme.accent);
  const { base, default: contrast, inverted, primary, secondary } = theme.palette;

  return (
    <div
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 32,
        width: '100%',
        minHeight: '100vh',
        padding: 32,
        backgroundColor: base.main,
        color: contrast.main,
      }}
    >
      <Flex direction="column" gap="sm" align="center">
        <Text size="sm">
          appearance {theme.appearance} → mode {theme.mode}
          {pack ? ` · ${pack.name}` : ''}
        </Text>
        <ThemeSwitcher size="md" justify="center" labeled />
      </Flex>

      <Flex gap="lg" wrap="wrap" align="flex-end" justify="center">
        <Flex direction="column" gap="xs" align="center">
          <ThemePreview
            colors={[base.main, primary.main]}
            aria-label="Resolved theme"
          />
          <Text size="sm">canvas + primary</Text>
        </Flex>
        <Flex direction="column" gap="xs" align="center">
          <Color colors={base.main} aria-label="base" />
          <Text size="sm">base</Text>
        </Flex>
        <Flex direction="column" gap="xs" align="center">
          <Color colors={contrast.main} aria-label="default" />
          <Text size="sm">default</Text>
        </Flex>
        <Flex direction="column" gap="xs" align="center">
          <Color colors={inverted.main} aria-label="inverted" />
          <Text size="sm">inverted</Text>
        </Flex>
        <Flex direction="column" gap="xs" align="center">
          <Color colors={primary.main} aria-label="primary" />
          <Text size="sm">primary</Text>
        </Flex>
        <Flex direction="column" gap="xs" align="center">
          <Color colors={secondary.main} aria-label="secondary" />
          <Text size="sm">secondary</Text>
        </Flex>
      </Flex>

      <Flex gap="sm" wrap="wrap" justify="center">
        {SCALE_KEYS.map((key) => (
          <Flex key={key} direction="column" gap="xs" align="center">
            <Color colors={primary[key]} aria-label={`primary.${key}`} />
            <Text size="sm">{key}</Text>
          </Flex>
        ))}
      </Flex>

      <Flex
        direction="column"
        gap="md"
        style={{
          boxSizing: 'border-box',
          width: '100%',
          maxWidth: 420,
          padding: 20,
          borderRadius: theme.radius.medium,
          backgroundColor: base.light,
          color: contrast.main,
          border: `1px solid ${base.contrastText}22`,
        }}
      >
        <Text>Card uses base.light on the {theme.mode} canvas.</Text>
        <Flex gap="sm">
          <Button color="primary">Primary</Button>
          <Button color="default" variant="outline">
            Default
          </Button>
        </Flex>
      </Flex>

      <BlurBackdrop>
        <SettingsPreview />
      </BlurBackdrop>
    </div>
  );
};

const meta: Meta = {
  title: 'V2/Theme',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj;

export const PlaygroundStory: Story = {
  name: 'Playground',
  render: () => (
    <ThemeProvider defaultAppearance="auto">
      <Playground />
    </ThemeProvider>
  ),
};

export const Adjust: Story = {
  parameters: {
    fill: true,
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        minHeight: '100vh',
      }}
    >
      <ThemeProvider appearance="light" allowedModes={['light', 'dark']}>
        <ModeAdjust appearance="light" defaults={LIGHT_SURFACES} />
      </ThemeProvider>
      <ThemeProvider appearance="dark" allowedModes={['light', 'dark']}>
        <ModeAdjust appearance="dark" defaults={DARK_SURFACES} />
      </ThemeProvider>
    </div>
  ),
};
