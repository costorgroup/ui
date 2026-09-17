import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Button, ChromaConicSpin, NeonPulse, Panel, WavePing, type TAnimatedPlayMode, Flex, Text, useTheme } from '..';

const PLAY: TAnimatedPlayMode[] = ['always', 'hover'];
const RADIUS = ['none', 'sm', 'md', 'lg', 'xl', 'pill'] as const;

const meta: Meta<typeof ChromaConicSpin> = {
  title: 'Feedback/Animated',
  tags: ['autodocs'],
  args: {
    play: 'hover',
    thickness: 2,
    duration: 4,
    radius: 'md',
  },
  argTypes: {
    play: {
      control: 'select',
      options: PLAY,
    },
    thickness: { control: { type: 'number', min: 1, max: 8, step: 1 } },
    radius: {
      control: 'select',
      options: RADIUS,
    },
    origin: {
      control: 'text',
      description: 'Conic gradient center (CSS position), e.g. "100% 0%" for top right.',
    },
    maskComposite: {
      control: 'select',
      options: ['add', 'subtract', 'intersect', 'exclude'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof ChromaConicSpin>;

const chromaColors = (theme: ReturnType<typeof useTheme>) => {
  const { lighter, main, darker } = theme.palette.info;

  return [lighter, main, darker];
};

export const ChromaConicSpinButton: Story = {
  render: function ChromaConicSpinButtonStory(args) {
    const theme = useTheme();

    return (
      <ChromaConicSpin {...args} colors={chromaColors(theme)}>
        <Button size="sm">Launch app</Button>
      </ChromaConicSpin>
    );
  },
};

export const ChromaConicSpinTopRight: Story = {
  args: {
    play: 'always',
    origin: '100% 0%',
  },
  render: function ChromaConicSpinTopRightStory(args) {
    const theme = useTheme();

    return (
      <ChromaConicSpin {...args} colors={chromaColors(theme)}>
        <Button size="sm">Top-right origin</Button>
      </ChromaConicSpin>
    );
  },
};

export const NeonPulseButton: StoryObj<typeof NeonPulse> = {
  args: {
    play: 'hover',
    thickness: 2,
    duration: 1.4,
    radius: 'pill',
  },
  render: (args) => (
    <NeonPulse {...args}>
      <Button size="sm">Go live</Button>
    </NeonPulse>
  ),
};

export const WavePingButton: StoryObj<typeof WavePing> = {
  args: {
    play: 'hover',
    thickness: 2,
    duration: 1.4,
    spread: 0.5,
    radius: 'pill',
  },
  render: (args) => (
    <WavePing {...args}>
      <Button size="sm" color="info">
        Ping
      </Button>
    </WavePing>
  ),
};

export const PanelWithChroma: Story = {
  render: function PanelWithChromaStory() {
    const theme = useTheme();
    const { lighter, light, main, dark, darker } = theme.palette.info;

    return (
      <ChromaConicSpin
        play="always"
        thickness={3}
        colors={[lighter, light, main, dark, darker]}
        radius="lg"
        style={{ width: 380 }}
      >
        <Panel variant="surface" elevation={2} radius="lg" style={{ padding: 20 }}>
          <Flex direction="column" gap="md">
            <Text>Wrap any v3 component to add a border effect.</Text>
            <Flex gap="sm">
              <Button size="sm">Cancel</Button>
              <Button size="sm" color="info">
                Save
              </Button>
            </Flex>
          </Flex>
        </Panel>
      </ChromaConicSpin>
    );
  },
};

export const PlayModes: Story = {
  render: function PlayModesStory() {
    const theme = useTheme();

    return (
      <Flex gap="lg" wrap="wrap" justify="center">
        <NeonPulse play="always" radius="md">
          <Button size="sm">Always</Button>
        </NeonPulse>
        <WavePing play="hover" radius="md">
          <Button size="sm" color="info">
            Hover
          </Button>
        </WavePing>
        <ChromaConicSpin
          play="always"
          thickness={2}
          colors={chromaColors(theme)}
          radius="md"
        >
          <Button size="sm">Chroma</Button>
        </ChromaConicSpin>
      </Flex>
    );
  },
};
