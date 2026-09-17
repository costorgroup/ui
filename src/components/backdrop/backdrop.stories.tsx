import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Portal } from '../portal';
import { Backdrop, Button, Text, Window } from '../..';
import type { TBackdropAlign, TBackdropJustify, TBackdropLayer } from './types';

const ALIGNS: TBackdropAlign[] = ['start', 'center', 'end', 'stretch'];
const JUSTIFIES: TBackdropJustify[] = ['start', 'center', 'end', 'stretch'];
const LAYERS: TBackdropLayer[] = ['modal', 'drawer'];

const meta: Meta<typeof Backdrop> = {
  title: 'Overlays/Backdrop',
  component: Backdrop,
  tags: ['autodocs'],
  argTypes: {
    align: { control: 'select', options: ALIGNS },
    justify: { control: 'select', options: JUSTIFIES },
    layer: { control: 'select', options: LAYERS },
    padding: { control: 'boolean' },
    scrollable: { control: 'boolean' },
    lockScroll: { control: 'boolean' },
    open: { control: 'boolean' },
  },
  args: {
    padding: true,
    align: 'center',
    justify: 'center',
    layer: 'modal',
    scrollable: true,
    lockScroll: true,
  },
};

export default meta;

type Story = StoryObj<typeof Backdrop>;

const BackdropDemo = (
  args: React.ComponentProps<typeof Backdrop>,
) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open backdrop</Button>
      <Portal>
        <Backdrop {...args} open={open} onClose={() => setOpen(false)}>
          <Window style={{ maxWidth: 360 }}>
            <Text>
              Overlay fill from surfaces.backdrop. Click outside or press
              Escape to close.
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
    </>
  );
};

export const Playground: Story = {
  tags: ['!dev'],
  render: (args) => <BackdropDemo {...args} />,
};

export const Default: Story = {
  render: (args) => <BackdropDemo {...args} />,
};
