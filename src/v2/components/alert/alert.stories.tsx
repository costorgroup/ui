import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { CheckIcon } from '../../../icons';
import { Button } from '../../index';
import type { TAlertVariant } from './types';
import { Alert } from './index';

const VARIANTS: TAlertVariant[] = [
  'solid',
  'subtle',
  'surface',
];

const meta: Meta<typeof Alert> = {
  title: 'V2/Feedbacks/Alert',
  component: Alert,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    color: 'default',
    variant: 'subtle',
    title: 'Heads up',
    icon: <CheckIcon />,
    children: 'Something needs your attention.',
    actions: (
      <>
        <Button size="sm" variant="ghost">
          Dismiss
        </Button>
        <Button size="sm">Review</Button>
      </>
    ),
  },
};

export const Closable: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    if (!open) {
      return <Button onClick={() => setOpen(true)}>Show alert</Button>;
    }

    return (
      <Alert
        color="error"
        title="Could not save"
        icon={<CheckIcon />}
        onClose={() => setOpen(false)}
      >
        Check your connection and try again.
      </Alert>
    );
  },
};

export const Solid: Story = {
  args: {
    color: 'success',
    variant: 'solid',
    title: 'Saved',
    icon: <CheckIcon />,
    children: 'Your changes are live.',
  },
};

export const Variants: Story = {
  render: () => (
    <>
      {VARIANTS.map((variant) => (
        <Alert
          key={variant}
          variant={variant}
          color="default"
          title={variant}
          icon={<CheckIcon />}
          style={{ marginBottom: 12 }}
        >
          Description inherits the alert text color.
        </Alert>
      ))}
    </>
  ),
};
