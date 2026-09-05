import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Flex } from '../../../index';
import { CheckIcon, CloseIcon, EyeIcon } from '../../../icons';
import { Button, ButtonGroup, IconButton } from '../../index';

const meta: Meta<typeof ButtonGroup> = {
  title: 'V2/Buttons/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
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
    variant: {
      control: 'select',
      options: [
        'solid',
        'subtle',
        'surface',
        'outline',
        'ghost',
        'plain',
      ],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  args: {
    orientation: 'horizontal',
    color: 'default',
    variant: 'outline',
    size: 'md',
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button>Left</Button>
      <Button>Center</Button>
      <Button>Right</Button>
    </ButtonGroup>
  ),
};

export const Orientations: Story = {
  render: () => (
    <Flex gap="lg" align="flex-start">
      <ButtonGroup orientation="horizontal" variant="outline" color="default">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical" variant="outline" color="secondary">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </Flex>
  ),
};

export const WithIconButtons: Story = {
  render: () => (
    <ButtonGroup variant="outline" color="default">
      <IconButton aria-label="Check">
        <CheckIcon />
      </IconButton>
      <IconButton aria-label="Preview">
        <EyeIcon />
      </IconButton>
      <IconButton aria-label="Close">
        <CloseIcon />
      </IconButton>
    </ButtonGroup>
  ),
};

export const Mixed: Story = {
  render: () => (
    <ButtonGroup variant="surface" color="info">
      <Button>Edit</Button>
      <IconButton aria-label="Preview">
        <EyeIcon />
      </IconButton>
      <IconButton aria-label="Close">
        <CloseIcon />
      </IconButton>
    </ButtonGroup>
  ),
};

export const OverrideChild: Story = {
  render: () => (
    <ButtonGroup variant="outline" color="default">
      <Button>Default</Button>
      <Button color="error" variant="solid">
        Override
      </Button>
      <Button>Default</Button>
    </ButtonGroup>
  ),
};
