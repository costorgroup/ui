import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import type { TPaletteColor } from '../../theme/types';
import { FileField, Text, Flex } from '../..';
import type { TInputSize, TInputVariant } from '../input/input-wrapper/types';

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
const SIZES: TInputSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta: Meta<typeof FileField> = {
  title: 'Forms/FileField',
  component: FileField,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: { control: 'select', options: SIZES },
    variant: { control: 'select', options: VARIANTS },
    color: { control: 'select', options: COLORS },
    accept: { control: 'text' },
    multiple: { control: 'boolean' },
    placeholder: { control: 'text' },
    fullWidth: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    helperText: { control: 'text' },
    onChange: { table: { disable: true } },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
  },
  args: {
    label: 'Attachment',
    helperText: 'Select a single file from your device.',
    placeholder: 'Choose file…',
    multiple: false,
    size: 'md',
    variant: 'surface',
    color: 'primary',
    fullWidth: true,
    error: false,
  },
};

export default meta;

type Story = StoryObj<typeof FileField>;

export const Playground: Story = {
  tags: ['!dev'],
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {COLORS.map((color) => (
        <FileField key={color} color={color} label={color} />
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
          <FileField variant={variant} label={variant} />
        </Flex>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {SIZES.map((size) => (
        <FileField key={size} size={size} label={size} />
      ))}
    </Flex>
  ),
};

export const Images: Story = {
  args: {
    label: 'Cover image',
    description: 'PNG or JPEG only.',
    accept: 'image/png,image/jpeg',
    placeholder: 'Choose an image…',
    helperText: 'Click the field to browse, then clear with the X button.',
  },
};

export const Multiple: Story = {
  render: function MultipleStory() {
    const [files, setFiles] = useState<File[]>([]);

    return (
      <Flex direction="column" gap="sm">
        <FileField
          label="Documents"
          description="Click the field to manage files in a modal."
          helperText="File count is shown in the field. Open the modal to add or remove files."
          multiple
          accept=".pdf,.doc,.docx,.txt"
          value={files}
          onChange={setFiles}
          placeholder="Choose files…"
        />
        <Text size="sm">
          {files.length > 0
            ? files.map((file) => file.name).join(', ')
            : 'No files selected.'}
        </Text>
      </Flex>
    );
  },
};

export const Error: Story = {
  args: {
    label: 'Contract',
    helperText: 'A signed PDF is required.',
    error: true,
    placeholder: 'Choose file…',
  },
};
