import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Button, Portal, Text } from '../..';
import { useTheme } from '../../hooks/use-theme';

const meta: Meta<typeof Portal> = {
  title: 'Utilities/Portal',
  component: Portal,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Portal>;

export const Default: Story = {
  render: function DefaultStory() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen((value) => !value)}>
          {open ? 'Hide portal content' : 'Show portal content'}
        </Button>
        {open ? (
          <Portal>
            <Text
              style={{
                position: 'fixed',
                right: 16,
                bottom: 16,
                zIndex: 9999,
                padding: 12,
                borderRadius: 8,
                border: `1px solid ${theme.surfaces.border}`,
                background: theme.surfaces.background,
                color: theme.surfaces.ink,
                boxShadow: theme.shadows[4],
              }}
            >
              Rendered into document.body
            </Text>
          </Portal>
        ) : null}
      </>
    );
  },
};
