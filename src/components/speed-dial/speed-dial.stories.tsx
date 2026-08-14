import type { Meta, StoryObj } from '@storybook/react';
import React, { CSSProperties } from 'react';
import { IconButton, SpeedDial } from '../../index';
import {
  CheckIcon,
  CloseIcon,
  ImageIcon,
  MoreHorizontalIcon,
  UploadIcon,
} from '../../icons';

const frame: CSSProperties = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 600,
  height: 400,
  overflow: 'hidden',
  border: '1px solid #e5e7eb',
  background: '#f8fafc',
};

const meta: Meta<typeof SpeedDial> = {
  title: 'Buttons/SpeedDial',
  component: SpeedDial,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={frame}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    itemsDirection: {
      control: 'select',
      options: ['left', 'top', 'right', 'bottom'],
    },
    itemsGap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof SpeedDial>;

const Actions = () => (
  <>
    <IconButton aria-label="Upload" rounded color="primary" variant="subtle">
      <UploadIcon />
    </IconButton>
    <IconButton aria-label="Image" rounded color="primary" variant="subtle">
      <ImageIcon />
    </IconButton>
    <IconButton aria-label="Done" rounded color="primary" variant="subtle">
      <CheckIcon />
    </IconButton>
  </>
);

export const Default: Story = {
  args: {
    itemsDirection: 'top',
    itemsGap: 'sm',
    gap: 'md',
    'aria-label': 'Create',
    icon: <MoreHorizontalIcon />,
    closeIcon: <CloseIcon />,
  },
  render: (args) => (
    <SpeedDial {...args}>
      <Actions />
    </SpeedDial>
  ),
};

export const Right: Story = {
  render: () => (
    <SpeedDial itemsDirection="right" aria-label="Create">
      <Actions />
    </SpeedDial>
  ),
};

export const Bottom: Story = {
  render: () => (
    <SpeedDial itemsDirection="bottom" aria-label="Create">
      <Actions />
    </SpeedDial>
  ),
};
