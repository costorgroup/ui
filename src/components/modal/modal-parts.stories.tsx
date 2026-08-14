import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Backdrop, Button, Text } from '../../index';
import { ModalBase } from './modal-base';
import { ModalHead } from './modal-head';
import { ModalBody } from './modal-body';
import { ModalActions } from './modal-actions';

const meta: Meta<typeof ModalBase> = {
  title: 'Components/Modal/Parts',
  component: ModalBase,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ModalBase>;

export const Default: Story = {
  render: function DefaultStory() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open composed modal</Button>
        {open ? (
          <Backdrop
            scrollable
            align="start"
            justify="center"
            padding
            layer="modal"
            lockScroll
            onClose={() => setOpen(false)}
          >
            <ModalBase size="md" scrollable>
              <ModalHead>Custom modal</ModalHead>
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
        ) : null}
      </>
    );
  },
};
