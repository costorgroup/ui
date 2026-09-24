import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import type { TPaletteColor } from '../../theme/types';
import { Dropzone, Text, Flex } from '../..';
import type { TInputVariant } from '../input/input-wrapper/types';

const COLORS: TPaletteColor[] = [
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
  'inverted',
];

const VARIANTS: TInputVariant[] = ['subtle', 'surface', 'outline'];

const meta: Meta<typeof Dropzone> = {
  title: 'Forms/Dropzone',
  component: Dropzone,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 520 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    color: { control: 'select', options: COLORS },
    variant: { control: 'select', options: VARIANTS },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    padding: { control: 'text' },
    gap: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    accept: { control: 'text' },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onFiles: { table: { disable: true } },
    onReject: { table: { disable: true } },
    onRemove: { table: { disable: true } },
    renderPreview: { table: { disable: true } },
    files: { table: { disable: true } },
    defaultFiles: { table: { disable: true } },
    icon: { table: { disable: true } },
    inputProps: { table: { disable: true } },
  },
  args: {
    color: 'primary',
    variant: 'surface',
    size: 'md',
    title: 'Upload files',
    description: 'Drag and drop files here, or click to browse.',
    multiple: true,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof Dropzone>;

export const Playground: Story = {
  tags: ['!dev'],
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {COLORS.map((color) => (
        <Dropzone key={color} color={color} title={color} />
      ))}
    </Flex>
  ),
};

export const Variants: Story = {
  render: () => (
    <Flex direction="column" gap="lg">
      {VARIANTS.map((variant) => (
        <Flex key={variant} direction="column" gap="xs">
          <Text size="sm">{variant}</Text>
          <Dropzone variant={variant} title={variant} />
        </Flex>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Dropzone key={size} size={size} title={`size="${size}"`} />
      ))}
    </Flex>
  ),
};

export const CustomSpacing: Story = {
  args: {
    padding: 'md',
    gap: 'xs',
    title: 'Compact dropzone',
    description: 'padding="md", gap="xs"',
  },
};

export const ImagePreview: Story = {
  render: function ImagePreviewStory() {
    const [rejected, setRejected] = useState<string[]>([]);

    return (
      <Flex direction="column" gap="md">
        <Dropzone
          title="Upload a cover image"
          description="PNG, JPG or WEBP. Hover the preview to reupload or remove, or drop another image on it."
          accept={['image/png', 'image/jpeg', '.webp']}
          multiple={false}
          onReject={(files) => setRejected(files.map((file) => file.name))}
          onFiles={() => setRejected([])}
          renderPreview={({ files, urls }) => (
            <img
              src={urls[0]}
              alt={files[0].name}
              style={{ width: '100%', maxHeight: 320, objectFit: 'cover' }}
            />
          )}
        />
        {rejected.length > 0 ? (
          <Text size="sm">Not an accepted format: {rejected.join(', ')}</Text>
        ) : null}
      </Flex>
    );
  },
};

export const ImagesOnly: Story = {
  args: {
    title: 'Upload images',
    description: 'PNG, JPG, or WEBP. Drop files here or click to select.',
    accept: 'image/png,image/jpeg,image/webp',
    multiple: true,
  },
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [names, setNames] = useState<string[]>([]);

    return (
      <Flex direction="column" gap="md">
        <Dropzone
          title="Drop documents"
          description="Drag files onto this area, or click to choose from your device."
          onFiles={(files) => setNames(files.map((file) => file.name))}
        />
        <Text size="sm">
          {names.length > 0 ? names.join(', ') : 'No files selected yet.'}
        </Text>
      </Flex>
    );
  },
};

export const Disabled: Story = {
  args: {
    title: 'Uploads paused',
    description: 'File uploads are currently disabled.',
    disabled: true,
  },
};
