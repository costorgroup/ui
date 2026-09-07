import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Portal } from '../../../components/portal';
import { Backdrop, Button, Text, Window } from '../../index';

const meta: Meta<typeof Backdrop> = {
  title: 'V2/Overlays/Backdrop',
  component: Backdrop,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Backdrop>;

export const Default: Story = {
  render: function DefaultStory() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open backdrop</Button>
        {open ? (
          <Portal>
            <Backdrop
              padding
              lockScroll
              onClose={() => setOpen(false)}
            >
              <Window style={{ maxWidth: 360 }}>
                <Text>
                  Theme-aware overlay. Click outside or press Escape to close.
                </Text>
                <Button
                  size="sm"
                  style={{ marginTop: 16 }}
                  onClick={() => setOpen(false)}
                >
                  Close
                </Button>
              </Window>
            </Backdrop>
          </Portal>
        ) : null}
      </>
    );
  },
};
