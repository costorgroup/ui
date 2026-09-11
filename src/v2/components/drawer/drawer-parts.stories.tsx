import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Portal } from '../../../components/portal';
import { CloseIcon } from '../../../icons';
import { Backdrop, Button, IconButton, Text } from '../../index';
import { DrawerActions } from './drawer-actions';
import { DrawerBase } from './drawer-base';
import { DrawerBody } from './drawer-body';
import { DrawerHead } from './drawer-head';
import { DrawerHeadActions } from './drawer-head-actions';
import { DrawerDescription } from './drawer-description';
import { DrawerTitle } from './drawer-title';

const meta: Meta<typeof DrawerBase> = {
  title: 'V3/Overlays/Drawer/Parts',
  component: DrawerBase,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DrawerBase>;

export const AllParts: Story = {
  render: function AllPartsStory() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open composed drawer</Button>
        <Portal>
          <Backdrop
            open={open}
            scrollable
            align="stretch"
            justify="start"
            layer="drawer"
            lockScroll
            onClose={() => setOpen(false)}
          >
              <DrawerBase size="md" anchor="left" scrollable>
                <DrawerHead>
                  <DrawerTitle>Custom drawer</DrawerTitle>
                  <DrawerDescription>
                    Built from Backdrop + DrawerBase parts.
                  </DrawerDescription>
                  <DrawerHeadActions>
                    <IconButton
                      variant="ghost"
                      color="default"
                      radius="pill"
                      aria-label="Close"
                      onClick={() => setOpen(false)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </DrawerHeadActions>
                </DrawerHead>
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
        </Portal>
      </>
    );
  },
};
