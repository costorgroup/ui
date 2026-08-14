import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Button, Heading, Modal, Text } from '../../index';

const meta: Meta<typeof Modal> = {
  title: 'Overlays/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    scrollable: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

const ModalDemo = ({
  size = 'md',
  scrollable = true,
}: {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  scrollable?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      {open ? (
        <Modal
          size={size}
          scrollable={scrollable}
          onClose={() => setOpen(false)}
          title={<Heading as="h4">Modal title</Heading>}
          actions={
            <>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </>
          }
        >
          <Text>
            Modal body content stays scrollable when needed, while head and actions remain
            visible.
          </Text>
          {Array.from({ length: 12 }).map((_, index) => (
            <Text key={index} style={{ marginTop: 12 }}>
              Extra content line {index + 1} to demonstrate scrolling behavior.
            </Text>
          ))}
        </Modal>
      ) : null}
    </>
  );
};

export const Default: Story = {
  render: (args) => <ModalDemo size={args.size} scrollable={args.scrollable} />,
  args: {
    size: 'md',
    scrollable: true,
  },
};

export const BackdropScroll: Story = {
  render: () => <ModalDemo scrollable={false} />,
};
