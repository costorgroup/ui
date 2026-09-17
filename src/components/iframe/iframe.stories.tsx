import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { ThemeProvider, useTheme } from '../../theme';
import {
  Center,
  Heading,
  Iframe,
  IconButton,
  SpeedDial,
  Text,
} from '../..';
import { CheckIcon, ImageIcon, MoreHorizontalIcon, UploadIcon } from '../../icons';

const meta: Meta<typeof Iframe> = {
  title: 'Utilities/Iframe',
  component: Iframe,
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
    },
    title: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Iframe>;

export const Default: Story = {
  args: {
    title: 'srcDoc example',
    srcDoc: '<p style="font-family: sans-serif; padding: 16px;">Loaded via srcDoc</p>',
    style: { height: 160, border: '1px solid #ddd' },
  },
};

const ScreenContent = () => {
  const theme = useTheme();

  return (
    <div
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
        background: theme.surfaces.background,
        color: theme.surfaces.ink,
      }}
    >
      <Center absolute>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textAlign: 'center' }}>
          <Heading as="h2" style={{ margin: 0 }}>
            Preview
          </Heading>
          <Text>Rendered inside the iframe document, themed independently.</Text>
        </div>
      </Center>
      <div
        style={{
          position: 'absolute',
          right: 16,
          bottom: 16,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 12,
        }}
      >
        <SpeedDial
          itemsDirection="top"
          aria-label="Create"
          icon={<MoreHorizontalIcon />}
        >
          <IconButton aria-label="Upload" radius="pill" color="primary" variant="subtle">
            <UploadIcon />
          </IconButton>
          <IconButton aria-label="Image" radius="pill" color="primary" variant="subtle">
            <ImageIcon />
          </IconButton>
          <IconButton aria-label="Done" radius="pill" color="primary" variant="subtle">
            <CheckIcon />
          </IconButton>
        </SpeedDial>
      </div>
    </div>
  );
};

export const WithChildren: Story = {
  render: () => (
    <Iframe
      title="600x400 screen"
      style={{
        width: 600,
        height: 400,
        border: '1px solid #e5e7eb',
      }}
    >
      <ThemeProvider defaultAppearance="light">
        <ScreenContent />
      </ThemeProvider>
    </Iframe>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <Iframe
      title="600x400 dark screen"
      style={{
        width: 600,
        height: 400,
        border: '1px solid #e5e7eb',
      }}
    >
      <ThemeProvider defaultAppearance="dark">
        <ScreenContent />
      </ThemeProvider>
    </Iframe>
  ),
};
