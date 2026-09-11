import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import type { TPaletteColor } from '../../../theme/types';
import { Flex } from '../../../index';
import { Dropzone, Text } from '../../index';
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
  title: 'V3/Forms/Dropzone',
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
    title: { control: 'text' },
    description: { control: 'text' },
    accept: { control: 'text' },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onFiles: { table: { disable: true } },
    icon: { table: { disable: true } },
    inputProps: { table: { disable: true } },
  },
  args: {
    color: 'primary',
    variant: 'surface',
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
