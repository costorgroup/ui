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
  InputActions,
  InputButton,
  Select,
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
        'inverted',
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
    <Select
      size="xs"
      fullWidth={false}
      options={['agent', 'ask', 'plan']}
      defaultValue="agent"
      variant="subtle"
    />
    <InputActions>
      <InputButton aria-label="More">
        <MoreHorizontalIcon />
      </InputButton>
      <InputButton aria-label="Folder">
        <FolderIcon />
      </InputButton>
      <InputButton
        variant="solid"
        radius="pill"
        aria-label="Send"
      >
        <ArrowTopIcon />
      </InputButton>
    </InputActions>
  </Flex>
);

export const Default: Story = {
  args: {
    placeholder: 'Plan, search, build anything',
    size: 'md',
    variant: 'surface',
    color: 'primary',
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
    variant: 'surface',
    color: 'primary',
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
    variant: 'surface',
    color: 'primary',
    fullWidth: true,
    children: ComposerActions,
  },
};
