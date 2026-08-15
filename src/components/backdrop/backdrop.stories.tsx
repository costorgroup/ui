import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Backdrop, Button, Card, CardContent, Portal, Text } from '../../index';

const meta: Meta<typeof Backdrop> = {
  title: 'Overlays/Backdrop',
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
              align="start"
              justify="center"
            >
              <Card style={{ maxWidth: 360, margin: 'auto' }}>
                <CardContent>
                  <Text>
                    Shared overlay used by Modal and Drawer. Click outside or press
                    Escape to close.
                  </Text>
                  <Button
                    size="sm"
                    style={{ marginTop: 16 }}
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </Button>
                </CardContent>
              </Card>
            </Backdrop>
          </Portal>
        ) : null}
      </>
    );
  },
};
