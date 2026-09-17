import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Portal } from '../portal';
import { CloseIcon } from '../../icons';
import { Backdrop, Button, IconButton, Text } from '../..';
import { ModalActions } from './modal-actions';
import { ModalBase } from './modal-base';
import { ModalBody } from './modal-body';
import { ModalDescription } from './modal-description';
import { ModalHeader } from './modal-header';
import { ModalHeaderActions } from './modal-header-actions';
import { ModalTitle } from './modal-title';

const meta: Meta<typeof ModalBase> = {
  title: 'Overlays/Modal/Parts',
  component: ModalBase,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ModalBase>;

export const AllParts: Story = {
  render: function AllPartsStory() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open composed modal</Button>
        <Portal>
          <Backdrop
            open={open}
            scrollable
            align="center"
            justify="center"
            layer="modal"
            lockScroll
            onClose={() => setOpen(false)}
          >
            <ModalBase size="md" scrollable>
              <ModalHeader>
                <ModalTitle>Custom modal</ModalTitle>
                <ModalDescription>
                  Built from Backdrop + ModalBase parts.
                </ModalDescription>
                <ModalHeaderActions>
                  <IconButton
                    variant="ghost"
                    color="default"
                    radius="pill"
                    aria-label="Close"
                    onClick={() => setOpen(false)}
                  >
                    <CloseIcon />
                  </IconButton>
                </ModalHeaderActions>
              </ModalHeader>
              <ModalBody>
                <Text>Built from Backdrop + ModalBase parts.</Text>
              </ModalBody>
              <ModalActions>
                <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={() => setOpen(false)}>
                  Confirm
                </Button>
              </ModalActions>
            </ModalBase>
          </Backdrop>
        </Portal>
      </>
    );
  },
};
