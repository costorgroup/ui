import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Backdrop, Button, Text } from '../../index';
import { DrawerBase } from './drawer-base';
import { DrawerHead } from './drawer-head';
import { DrawerBody } from './drawer-body';
import { DrawerActions } from './drawer-actions';

const meta: Meta<typeof DrawerBase> = {
  title: 'Components/Drawer/Parts',
  component: DrawerBase,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DrawerBase>;

export const Default: Story = {
  render: function DefaultStory() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open composed drawer</Button>
        {open ? (
          <Backdrop
            scrollable
            align="stretch"
            justify="start"
            layer="drawer"
            lockScroll
            onClose={() => setOpen(false)}
          >
            <DrawerBase size="md" anchor="left" scrollable>
              <DrawerHead>Custom drawer</DrawerHead>
              <DrawerBody>
                <Text>Built from Backdrop + DrawerBase parts.</Text>
              </DrawerBody>
              <DrawerActions>
                <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={() => setOpen(false)}>
                  Confirm
                </Button>
              </DrawerActions>
            </DrawerBase>
          </Backdrop>
        ) : null}
      </>
    );
  },
};
