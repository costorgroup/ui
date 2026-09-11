import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTheme } from '@emotion/react';
import React from 'react';
import {
  Button,
  Text,
  Heading,
  ChromaConicSpin,
  NeonPulse,
  WavePing,
  Window,
  WindowActions,
  WindowContent,
  WindowHead,
  type TAnimatedPlayMode,
} from '../index';

const meta: Meta<typeof ChromaConicSpin> = {
  title: 'V2/Animated',
  tags: ['autodocs'],
  argTypes: {
    play: {
      control: 'select',
      options: ['always', 'hover'] satisfies TAnimatedPlayMode[],
    },
    thickness: { control: { type: 'number', min: 1, max: 8, step: 1 } },
    origin: {
      control: 'text',
      description: 'Conic gradient center (CSS position), e.g. "100% 0%" for top right.',
    },
    maskComposite: {
      control: 'select',
      options: ['add', 'subtract', 'intersect', 'exclude'],
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: 280,
          display: 'grid',
          placeItems: 'center',
          padding: 48,
          background: '#08070f',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ChromaConicSpin>;

export const ChromaConicSpinButton: Story = {
  args: {
    play: 'hover',
    thickness: 2,
    duration: 4,
  },
  render: (args) => (
    <ChromaConicSpin
      {...args}
      colors={['#22e3ff', '#7c5cff', '#ff2bd6']}
      radius="medium"
    >
      <Button size="sm" color="default">
        Launch app
      </Button>
    </ChromaConicSpin>
  ),
};

export const ChromaConicSpinTopRight: Story = {
  args: {
    play: 'always',
    thickness: 2,
    duration: 4,
    origin: '100% 0%',
  },
  render: (args) => (
    <ChromaConicSpin
      {...args}
      colors={['#22e3ff', '#7c5cff', '#ff2bd6']}
      radius="medium"
    >
      <Button size="sm" color="default">
        Top-right origin
      </Button>
    </ChromaConicSpin>
  ),
};

export const NeonPulseButton: StoryObj<typeof NeonPulse> = {
  args: {
    play: 'hover',
    thickness: 2,
    duration: 1.4,
    color: '#7c5cff',
  },
  render: (args) => (
    <NeonPulse {...args} radius="pill">
      <Button size="sm" color="default">
        Go live
      </Button>
    </NeonPulse>
  ),
};

export const WavePingButton: StoryObj<typeof WavePing> = {
  args: {
    play: 'hover',
    thickness: 2,
    duration: 1.4,
    spread: 0.5,
    color: '#22e3ff',
  },
  render: (args) => (
    <WavePing {...args} radius="pill">
      <Button size="sm" color="info">
        Ping
      </Button>
    </WavePing>
  ),
};

export const WindowWithChroma: Story = {
  render: function WindowWithChromaStory() {
    const theme = useTheme();
    const { lighter, light, main, dark, darker } = theme.palette.info;

    return (
      <ChromaConicSpin
        play="always"
        thickness={3}
        colors={[lighter, light, main, dark, darker]}
        radius="large"
        style={{ width: 380 }}
      >
        <Window>
          <WindowHead>
            <Heading as="h3">Animated window</Heading>
          </WindowHead>
          <WindowContent>
            <Text>Wrap any V2 or V1 component to add a border effect.</Text>
          </WindowContent>
          <WindowActions>
            <Button size="sm" color="default">
              Cancel
            </Button>
            <Button size="sm" color="info">
              Save
            </Button>
          </WindowActions>
        </Window>
      </ChromaConicSpin>
    );
  },
};

export const PlayModes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 24,
        justifyContent: 'center',
      }}
    >
      <NeonPulse play="always" color="#7c5cff" radius="medium">
        <Button size="sm" color="default">
          Always
        </Button>
      </NeonPulse>
      <WavePing play="hover" color="#22e3ff" radius="medium">
        <Button size="sm" color="info">
          Hover
        </Button>
      </WavePing>
      <ChromaConicSpin
        play="always"
        thickness={2}
        colors={['#22e3ff', '#7c5cff', '#ff2bd6']}
        radius="medium"
      >
        <Button size="sm" color="default">
          Chroma
        </Button>
      </ChromaConicSpin>
    </div>
  ),
};
