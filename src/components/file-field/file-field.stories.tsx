import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { FileField, Flex, Text } from '../../index';

const meta: Meta<typeof FileField> = {
  title: 'Forms & Inputs/FileField',
  component: FileField,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      include: [
        'label',
        'description',
        'helperText',
        'accept',
        'multiple',
        'placeholder',
        'size',
        'variant',
        'color',
        'fullWidth',
        'required',
        'error',
        'disabled',
      ],
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['subtle', 'surface', 'outline'],
    },
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
};

export default meta;

type Story = StoryObj<typeof FileField>;

export const Default: Story = {
  args: {
    label: 'Attachment',
    helperText: 'Select a single file from your device.',
    placeholder: 'Choose file…',
    accept: undefined,
    multiple: false,
    size: 'md',
    variant: 'subtle',
    color: 'primary',
    fullWidth: true,
  },
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
