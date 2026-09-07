import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Flex } from '../../../index';
import {
  ArrowTopIcon,
  FolderIcon,
  MoreHorizontalIcon,
} from '../../../icons';
import {
  ActionField,
  IconButton,
  Select,
  SelectOption,
} from '../../index';

const meta: Meta<typeof ActionField> = {
  title: 'V2/Forms/ActionField',
  component: ActionField,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
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
      ],
    },
    fullWidth: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    helperText: { control: 'text' },
    placeholder: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof ActionField>;

const ComposerActions = (
  <Flex align="center" justify="space-between" gap="xs">
    <Select size="xs" fullWidth={false} defaultValue="agent" variant="subtle">
      <SelectOption value="agent">Agent</SelectOption>
      <SelectOption value="ask">Ask</SelectOption>
      <SelectOption value="plan">Plan</SelectOption>
    </Select>
    <Flex align="center" gap="xs">
      <IconButton size="sm" variant="plain" aria-label="More">
        <MoreHorizontalIcon />
      </IconButton>
      <IconButton size="sm" variant="plain" aria-label="Folder">
        <FolderIcon />
      </IconButton>
      <IconButton size="sm" variant="solid" rounded aria-label="Send">
        <ArrowTopIcon />
      </IconButton>
    </Flex>
  </Flex>
);

export const Default: Story = {
  args: {
    placeholder: 'Plan, search, build anything',
    size: 'md',
    variant: 'subtle',
    color: 'default',
    fullWidth: true,
    children: ComposerActions,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Prompt',
    helperText: 'Enter to send, Shift+Enter for a new line.',
    placeholder: 'Ask anything',
    size: 'md',
    variant: 'subtle',
    color: 'default',
    fullWidth: true,
    children: ComposerActions,
  },
};

export const Error: Story = {
  args: {
    label: 'Prompt',
    helperText: 'Message is required.',
    placeholder: 'Ask anything',
    required: true,
    error: true,
    size: 'md',
    variant: 'subtle',
    color: 'default',
    fullWidth: true,
    children: ComposerActions,
  },
};
