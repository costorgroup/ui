import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  ArrowBottomIcon,
  ArrowRightIcon,
  ArrowTopIcon,
  CheckIcon,
  CloseIcon,
  EyeClosedIcon,
  EyeDropperIcon,
  EyeIcon,
  ImageIcon,
  MoreHorizontalIcon,
  RedoIcon,
  UndoIcon,
  UploadIcon,
  StarIcon,
  StarBorderIcon,
  PlayIcon,
  PauseIcon,
  VolumeIcon,
  VolumeOffIcon,
  FullscreenIcon,
  FullscreenExitIcon,
  FolderIcon,
  FileIcon,
} from './index';

const icons = [
  { name: 'EyeIcon', Icon: EyeIcon },
  { name: 'EyeClosedIcon', Icon: EyeClosedIcon },
  { name: 'EyeDropperIcon', Icon: EyeDropperIcon },
  { name: 'CloseIcon', Icon: CloseIcon },
  { name: 'CheckIcon', Icon: CheckIcon },
  { name: 'MoreHorizontalIcon', Icon: MoreHorizontalIcon },
  { name: 'ArrowRightIcon', Icon: ArrowRightIcon },
  { name: 'ArrowTopIcon', Icon: ArrowTopIcon },
  { name: 'ArrowBottomIcon', Icon: ArrowBottomIcon },
  { name: 'UndoIcon', Icon: UndoIcon },
  { name: 'RedoIcon', Icon: RedoIcon },
  { name: 'ImageIcon', Icon: ImageIcon },
  { name: 'UploadIcon', Icon: UploadIcon },
  { name: 'StarIcon', Icon: StarIcon },
  { name: 'StarBorderIcon', Icon: StarBorderIcon },
  { name: 'PlayIcon', Icon: PlayIcon },
  { name: 'PauseIcon', Icon: PauseIcon },
  { name: 'VolumeIcon', Icon: VolumeIcon },
  { name: 'VolumeOffIcon', Icon: VolumeOffIcon },
  { name: 'FullscreenIcon', Icon: FullscreenIcon },
  { name: 'FullscreenExitIcon', Icon: FullscreenExitIcon },
  { name: 'FolderIcon', Icon: FolderIcon },
  { name: 'FileIcon', Icon: FileIcon },
] as const;

const meta: Meta = {
  title: 'Utilities/Icons',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj;

export const All: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(8.5rem, 1fr))',
        gap: '1rem',
      }}
    >
      {icons.map(({ name, Icon }) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem',
            borderRadius: '0.5rem',
            background: '#f7f7f8',
            color: '#1c1c1f',
          }}
        >
          <Icon width="1.75em" height="1.75em" />
          <span style={{ fontSize: '0.75rem', textAlign: 'center' }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const EyeDropper: Story = {
  render: () => <EyeDropperIcon width="2em" height="2em" />,
};
