import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Portal } from '../../../components/portal';
import { CloseIcon } from '../../../icons';
import { Backdrop, Button, IconButton, Text } from '../../index';
import { ModalActions } from './modal-actions';
import { ModalBase } from './modal-base';
import { ModalBody } from './modal-body';
import { ModalDescription } from './modal-description';
import { ModalHead } from './modal-head';
import { ModalHeadActions } from './modal-head-actions';
import { ModalTitle } from './modal-title';

const meta: Meta<typeof ModalBase> = {
  title: 'V3/Overlays/Modal/Parts',
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
              <ModalHead>
                <ModalTitle>Custom modal</ModalTitle>
                <ModalDescription>
                  Built from Backdrop + ModalBase parts.
                </ModalDescription>
                <ModalHeadActions>
                  <IconButton
                    variant="ghost"
                    color="default"
                    radius="pill"
                    aria-label="Close"
                    onClick={() => setOpen(false)}
                  >
                    <CloseIcon />
                  </IconButton>
                </ModalHeadActions>
              </ModalHead>
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
