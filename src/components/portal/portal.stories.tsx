import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Button, Portal, Text } from '../../index';

const meta: Meta<typeof Portal> = {
  title: 'Utilities/Portal',
  component: Portal,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Portal>;

export const Default: Story = {
  render: function DefaultStory() {
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
                background: 'white',
                boxShadow: '0 4px 16px rgba(0,0,0,0.16)',
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
