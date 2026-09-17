import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { accentSwatch } from '../../theme/palettes';
import { ThemePreview, Flex, Text, useTheme } from '../..';

const meta: Meta<typeof ThemePreview> = {
  title: 'Data Display/ThemePreview',
  component: ThemePreview,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ThemePreview>;

export const Default: Story = {
  render: function DefaultStory() {
    const theme = useTheme();

    return (
      <ThemePreview
        colors={[theme.surfaces.background, theme.surfaces.ink]}
        aria-label="Current theme"
      />
    );
  },
};

export const Pairs: Story = {
  render: () => (
    <Flex gap="lg" wrap="wrap" align="flex-end">
      <Flex direction="column" gap="xs" align="center">
        <ThemePreview colors={['#ffffff', '#111827']} aria-label="Light" />
        <Text size="sm">Light</Text>
      </Flex>
      <Flex direction="column" gap="xs" align="center">
        <ThemePreview colors={['#18181b', '#fafafa']} aria-label="Dark" />
        <Text size="sm">Dark</Text>
      </Flex>
      <Flex direction="column" gap="xs" align="center">
        <ThemePreview colors={['#071A35', '#e8eefc']} aria-label="Navy" />
        <Text size="sm">Navy</Text>
      </Flex>
      <Flex direction="column" gap="xs" align="center">
        <ThemePreview colors={['#2b6de5', '#ffffff']} aria-label="Blue" />
        <Text size="sm">Blue</Text>
      </Flex>
    </Flex>
  ),
};

export const Palettes: Story = {
  render: function PalettesStory() {
    const theme = useTheme();
    const { accent, accents, setAccent } = theme;

    return (
      <Flex gap="md" wrap="wrap">
        {accents.map((item) => {
          const selected = accent === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setAccent(item.id)}
              aria-pressed={selected}
              aria-label={item.name}
              style={{
                display: 'inline-flex',
                margin: 0,
                padding: 3,
                lineHeight: 0,
                appearance: 'none',
                border: selected
                  ? `2px solid ${accentSwatch(item)}`
                  : '2px solid transparent',
                borderRadius: 10,
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              <ThemePreview
                colors={[
                  theme.surfaces.background,
                  accentSwatch(item),
                ]}
              />
            </button>
          );
        })}
      </Flex>
    );
  },
};
