import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { CloseIcon, FolderIcon } from '../../icons';
import { Button, Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle, IconButton, Link, Modal, ModalTitle, Flex } from '../..';
import type { TModalSize, TModalVariant } from './types';

const SIZES: TModalSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const VARIANTS: TModalVariant[] = ['subtle', 'surface'];

const meta: Meta<typeof Modal> = {
  title: 'Overlays/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: SIZES },
    variant: { control: 'select', options: VARIANTS },
    scrollable: { control: 'boolean' },
    open: { control: 'boolean' },
  },
  args: {
    size: 'md',
    variant: 'surface',
    scrollable: true,
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

const ModalDemo = ({
  size = 'md',
  variant = 'surface',
  scrollable = true,
  title = 'Modal title',
}: {
  size?: TModalSize;
  variant?: TModalVariant;
  scrollable?: boolean;
  title?: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        {`Open ${typeof title === 'string' ? title : 'modal'}`}
      </Button>
      <Modal
        open={open}
        size={size}
        variant={variant}
        scrollable={scrollable}
        onClose={() => setOpen(false)}
        title={title}
        description="Optional supporting copy under the title."
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
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderIcon />
            </EmptyMedia>
            <EmptyTitle>No projects yet</EmptyTitle>
            <EmptyDescription>
              You haven&apos;t created any projects yet. Get started by
              creating your first project.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Link size="sm" href="#learn">
              Learn more
            </Link>
          </EmptyContent>
        </Empty>
      </Modal>
    </>
  );
};

export const Playground: Story = {
  tags: ['!dev'],
  render: (args) => (
    <ModalDemo
      size={args.size}
      variant={args.variant}
      scrollable={args.scrollable}
    />
  ),
};

export const Default: Story = {
  render: (args) => (
    <ModalDemo
      size={args.size}
      variant={args.variant}
      scrollable={args.scrollable}
    />
  ),
};

export const Variants: Story = {
  render: () => (
    <Flex gap="sm">
      {VARIANTS.map((variant) => (
        <ModalDemo key={variant} variant={variant} title={variant} />
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex gap="sm" wrap="wrap">
      {SIZES.map((size) => (
        <ModalDemo key={size} size={size} title={size} />
      ))}
    </Flex>
  ),
};

export const TitleAs: Story = {
  render: () => (
    <ModalDemo title={<ModalTitle as="h1">Page-level title</ModalTitle>} />
  ),
};

export const BackdropScroll: Story = {
  render: () => <ModalDemo scrollable={false} />,
};
