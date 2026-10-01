import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { CheckIcon } from '../../icons';
import { Button } from '../..';
import { AlertBase, AlertBody } from './alert-base';
import { AlertIcon } from './alert-icon';
import { AlertTitle } from './alert-title';
import { AlertContent } from './alert-content';
import { AlertActions } from './alert-actions';
import { AlertMessage } from './alert-message';

const meta: Meta<typeof AlertBase> = {
  title: 'Feedback/Alert/Parts',
  component: AlertBase,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AlertBase>;

export const Default: Story = {
  args: {
    color: 'primary',
    variant: 'subtle',
    size: 'md',
    radius: 'md',
  },
  render: (args) => (
    <AlertBase {...args}>
      <AlertIcon align="center">
        <CheckIcon />
      </AlertIcon>
      <AlertBody actionsPlacement="end">
        <AlertMessage>
          <AlertTitle>Heads up</AlertTitle>
          <AlertContent>Compose your own alert without the recipe.</AlertContent>
        </AlertMessage>
        <AlertActions align="end">
          <Button size="sm" variant="ghost">
            Dismiss
          </Button>
          <Button size="sm">Review</Button>
        </AlertActions>
      </AlertBody>
    </AlertBase>
  ),
};

export const Solid: Story = {
  args: {
    color: 'success',
    variant: 'solid',
    size: 'md',
  },
  render: (args) => (
    <AlertBase {...args}>
      <AlertIcon>
        <CheckIcon />
      </AlertIcon>
      <AlertBody>
        <AlertMessage>
          <AlertTitle>Saved</AlertTitle>
          <AlertContent>Content inherits text color from the alert.</AlertContent>
        </AlertMessage>
      </AlertBody>
    </AlertBase>
  ),
};
