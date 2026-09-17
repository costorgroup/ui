import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { CloseIcon } from '../../icons';
import { Button, CheckBox, Drawer, DrawerTitle, IconButton, TextArea, TextField, Flex } from '../..';
import type { TDrawerAnchor, TDrawerSize, TDrawerVariant } from './types';

const SIZES: TDrawerSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const ANCHORS: TDrawerAnchor[] = ['left', 'right', 'top', 'bottom'];
const VARIANTS: TDrawerVariant[] = ['subtle', 'surface'];

const meta: Meta<typeof Drawer> = {
  title: 'Overlays/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: SIZES },
    anchor: { control: 'select', options: ANCHORS },
    variant: { control: 'select', options: VARIANTS },
    scrollable: { control: 'boolean' },
    open: { control: 'boolean' },
  },
  args: {
    size: 'md',
    anchor: 'left',
    variant: 'surface',
    scrollable: true,
  },
};

export default meta;

type Story = StoryObj<typeof Drawer>;

const DrawerDemo = ({
  size = 'md',
  anchor = 'left',
  variant = 'surface',
  scrollable = true,
  title = 'Drawer title',
}: {
  size?: TDrawerSize;
  anchor?: TDrawerAnchor;
  variant?: TDrawerVariant;
  scrollable?: boolean;
  title?: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        {`Open ${typeof title === 'string' ? title : 'drawer'}`}
      </Button>
      <Drawer
        open={open}
        size={size}
        anchor={anchor}
        variant={variant}
        scrollable={scrollable}
        onClose={() => setOpen(false)}
        title={title}
        description="A few details to get started."
        headerActions={
          <IconButton
            variant="ghost"
            color="default"
            radius="pill"
            aria-label="Close"
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        }
        actions={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </>
        }
      >
        <Flex direction="column" gap="md">
          <TextField
            label="Name"
            placeholder="Acme Inc."
            variant="subtle"
          />
          <TextField
            label="Email"
            placeholder="you@example.com"
            variant="subtle"
          />
          <TextArea
            label="Notes"
            placeholder="Anything we should know?"
            rows={3}
            variant="subtle"
          />
          <CheckBox
            label="Subscribe"
            description="Product emails and occasional updates."
            variant="subtle"
            defaultChecked
          />
        </Flex>
      </Drawer>
    </>
  );
};

export const Playground: Story = {
  tags: ['!dev'],
  render: (args) => (
    <DrawerDemo
      size={args.size}
      anchor={args.anchor}
      variant={args.variant}
      scrollable={args.scrollable}
    />
  ),
};

export const Default: Story = {
  render: (args) => (
    <DrawerDemo
      size={args.size}
      anchor={args.anchor}
      variant={args.variant}
      scrollable={args.scrollable}
    />
  ),
};

export const Variants: Story = {
  render: () => (
    <Flex gap="sm">
      {VARIANTS.map((variant) => (
        <DrawerDemo key={variant} variant={variant} title={variant} />
      ))}
    </Flex>
  ),
};

export const Anchors: Story = {
  render: () => (
    <Flex gap="sm" wrap="wrap">
      {ANCHORS.map((anchor) => (
        <DrawerDemo key={anchor} anchor={anchor} title={anchor} />
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex gap="sm" wrap="wrap">
      {SIZES.map((size) => (
        <DrawerDemo key={size} size={size} title={size} />
      ))}
    </Flex>
  ),
};

export const TitleAs: Story = {
  render: () => (
    <DrawerDemo title={<DrawerTitle as="h1">Page-level title</DrawerTitle>} />
  ),
};

export const BackdropScroll: Story = {
  render: () => <DrawerDemo scrollable={false} />,
};
