import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Alert, Button, CheckIcon } from '../../index';

const meta: Meta<typeof Alert> = {
  title: 'Feedbacks/Alert',
  component: Alert,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    color: 'primary',
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
