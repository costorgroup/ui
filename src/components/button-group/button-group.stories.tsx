import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button, ButtonGroup, Flex, IconButton } from '../../index';
import { CheckIcon, CloseIcon, EyeIcon } from '../../icons';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Buttons/ButtonGroup',
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
    variant: {
      control: 'select',
      options: ['solid', 'subtle', 'surface', 'outline', 'ghost', 'plain'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  args: {
    orientation: 'horizontal',
    color: 'primary',
    variant: 'outline',
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
      <ButtonGroup orientation="horizontal" variant="outline" color="primary">
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
    <ButtonGroup variant="outline" color="primary">
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

export const OverrideChild: Story = {
  render: () => (
    <ButtonGroup variant="outline" color="primary">
      <Button>Default</Button>
      <Button color="error" variant="solid">
        Override
      </Button>
      <Button>Default</Button>
    </ButtonGroup>
  ),
};
