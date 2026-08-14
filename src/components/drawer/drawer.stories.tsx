import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Button, Drawer, Heading, Text } from '../../index';

const meta: Meta<typeof Drawer> = {
  title: 'Overlays/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    anchor: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
    },
    scrollable: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Drawer>;

const DrawerDemo = ({
  size = 'md',
  anchor = 'left',
  scrollable = true,
}: {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  anchor?: 'left' | 'right' | 'top' | 'bottom';
  scrollable?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      {open ? (
        <Drawer
          size={size}
          anchor={anchor}
          scrollable={scrollable}
          onClose={() => setOpen(false)}
          title={<Heading as="h4">Drawer title</Heading>}
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
            Drawer body content stays scrollable when needed, while head and actions remain
            visible.
          </Text>
          {Array.from({ length: 12 }).map((_, index) => (
            <Text key={index} style={{ marginTop: 12 }}>
              Extra content line {index + 1} to demonstrate scrolling behavior.
            </Text>
          ))}
        </Drawer>
      ) : null}
    </>
  );
};

export const Default: Story = {
  render: (args) => (
    <DrawerDemo size={args.size} anchor={args.anchor} scrollable={args.scrollable} />
  ),
  args: {
    size: 'md',
    anchor: 'left',
    scrollable: true,
  },
};

export const Right: Story = {
  render: () => <DrawerDemo anchor="right" />,
};

export const Top: Story = {
  render: () => <DrawerDemo anchor="top" />,
};

export const Bottom: Story = {
  render: () => <DrawerDemo anchor="bottom" />,
};

export const BackdropScroll: Story = {
  render: () => <DrawerDemo scrollable={false} />,
};
