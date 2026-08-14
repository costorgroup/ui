import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Dropzone, Flex, Text } from '../../index';

const meta: Meta<typeof Dropzone> = {
  title: 'Forms & Inputs/Dropzone',
  component: Dropzone,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 520 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      include: [
        'title',
        'description',
        'color',
        'accept',
        'multiple',
        'disabled',
      ],
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'success',
        'error',
        'warning',
        'info',
        'dark',
        'light',
      ],
    },
    title: { control: 'text' },
    description: { control: 'text' },
    accept: { control: 'text' },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onFiles: { table: { disable: true } },
    icon: { table: { disable: true } },
    inputProps: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof Dropzone>;

export const Default: Story = {
  args: {
    color: 'primary',
    title: 'Upload files',
    description: 'Drag and drop files here, or click to browse.',
    multiple: true,
  },
};

export const ImagesOnly: Story = {
  args: {
    color: 'primary',
    title: 'Upload images',
    description: 'PNG, JPG, or WEBP up to 10MB. Drop files here or click to select.',
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
