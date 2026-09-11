import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Flex, Text, useTheme } from '../../../index';
import { Panel } from '../../index';
import type { TPanelVariant } from './types';

const ELEVATIONS = [0, 1, 2, 3, 4, 6, 8, 12, 16, 24] as const;
const VARIANTS: TPanelVariant[] = ['subtle', 'surface', 'outline'];
const RADIUS = ['none', 'sm', 'md', 'lg', 'xl', 'pill'] as const;

const meta: Meta<typeof Panel> = {
  title: 'V3/Surfaces/Panel',
  component: Panel,
  tags: ['autodocs'],
  args: {
    elevation: 1,
    variant: 'surface',
    radius: 'md',
    children: 'Panel',
  },
  argTypes: {
    elevation: {
      control: { type: 'range', min: 0, max: 24, step: 1 },
    },
    variant: {
      control: 'select',
      options: VARIANTS,
    },
    radius: {
      control: 'select',
      options: RADIUS,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Panel>;

export const Playground: Story = {
  tags: ['!dev'],
  render: (args) => (
    <Panel {...args} style={{ width: 240, padding: 20 }}>
      <Text>{args.children}</Text>
    </Panel>
  ),
};

export const Variants: Story = {
  render: function VariantsStory() {
    const { mode } = useTheme();

    return (
      <Flex direction="column" gap="md">
        <Text size="sm">
          {mode === 'dark'
            ? 'Dark: filled variants lift the panel. Outline is border only.'
            : 'Light: elevation adds shadow. Outline has no fill.'}
        </Text>
        <Flex gap="md" wrap="wrap">
          {VARIANTS.map((variant) => (
            <Panel
              key={variant}
              variant={variant}
              elevation={2}
              style={{ width: 160, padding: 16 }}
            >
              <Text size="sm">{variant}</Text>
            </Panel>
          ))}
        </Flex>
      </Flex>
    );
  },
};

export const Elevations: Story = {
  render: function ElevationsStory() {
    const { mode } = useTheme();

    return (
      <Flex direction="column" gap="md">
        <Text size="sm">
          {mode === 'dark'
            ? 'Dark mode: higher elevation lightens the fill.'
            : 'Light mode: higher elevation deepens the shadow.'}
        </Text>
        <Flex gap="md" wrap="wrap">
          {ELEVATIONS.map((elevation) => (
            <Panel
              key={elevation}
              elevation={elevation}
              style={{ width: 120, padding: 16 }}
            >
              <Text size="sm">elevation={elevation}</Text>
            </Panel>
          ))}
        </Flex>
      </Flex>
    );
  },
};

export const Radius: Story = {
  render: () => (
    <Flex gap="md" wrap="wrap">
      {RADIUS.map((radius) => (
        <Panel key={radius} elevation={1} radius={radius} style={{ width: 120, padding: 16 }}>
          <Text size="sm">{radius}</Text>
        </Panel>
      ))}
    </Flex>
  ),
};
