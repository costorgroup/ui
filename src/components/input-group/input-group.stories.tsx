import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  Button,
  Flex,
  IconButton,
  InputBase,
  InputWrapper,
  InputGroup,
  InputHelperText,
  InputLabel,
  InputTextField,
} from '../../index';
import { EyeIcon } from '../../icons';

const meta: Meta<typeof InputGroup> = {
  title: 'Forms & Inputs/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
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

type Story = StoryObj<typeof InputGroup>;

export const Default: Story = {
  args: {
    orientation: 'horizontal',
    color: 'primary',
    variant: 'subtle',
  },
  render: (args) => (
    <InputBase fullWidth>
      <InputLabel htmlFor="domain">Website</InputLabel>
      <InputGroup {...args}>
        <Button type="button">https://</Button>
        <InputWrapper>
          <InputTextField id="domain" placeholder="example" />
        </InputWrapper>
        <Button type="button">.com</Button>
      </InputGroup>
      <InputHelperText>Prefixed and suffixed with buttons.</InputHelperText>
    </InputBase>
  ),
};

export const Orientations: Story = {
  render: () => (
    <Flex direction="column" gap="lg" style={{ width: 480 }}>
      <InputGroup orientation="horizontal" variant="outline" color="primary">
        <Button type="button">https://</Button>
        <InputWrapper>
          <InputTextField placeholder="example" />
        </InputWrapper>
        <Button type="button">.com</Button>
      </InputGroup>
      <InputGroup orientation="vertical" variant="outline" color="secondary">
        <InputWrapper>
          <InputTextField placeholder="Email" />
        </InputWrapper>
        <InputWrapper>
          <InputTextField type="password" placeholder="Password" />
        </InputWrapper>
        <Button type="button" variant="solid">
          Continue
        </Button>
      </InputGroup>
    </Flex>
  ),
};

export const WithIconButton: Story = {
  render: () => (
    <InputGroup variant="outline" color="primary">
      <InputWrapper>
        <InputTextField type="password" placeholder="••••••••" />
      </InputWrapper>
      <IconButton type="button" variant="ghost" aria-label="Show password">
        <EyeIcon />
      </IconButton>
    </InputGroup>
  ),
};
