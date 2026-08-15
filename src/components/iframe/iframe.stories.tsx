import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  Center,
  Flex,
  FloatingAction,
  FloatingActionsProvider,
  Heading,
  Iframe,
  IconButton,
  SpeedDial,
  Text,
  ThemeProvider,
  useFloatingActions,
} from '../../index';
import {
  CheckIcon,
  CloseIcon,
  ImageIcon,
  MoreHorizontalIcon,
  UploadIcon,
} from '../../icons';

const meta: Meta<typeof Iframe> = {
  title: 'Utilities/Iframe',
  component: Iframe,
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
    },
    title: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Iframe>;

export const Default: Story = {
  args: {
    title: 'srcDoc example',
    srcDoc: '<p style="font-family: sans-serif; padding: 16px;">Loaded via srcDoc</p>',
    style: { height: 160, border: '1px solid #ddd' },
  },
};

const ScreenActions = () => {
  const { naturalItemsDirection } = useFloatingActions();

  return (
    <>
      <FloatingAction>
        <SpeedDial
          itemsDirection={naturalItemsDirection}
          aria-label="Create"
          icon={<MoreHorizontalIcon />}
          closeIcon={<CloseIcon />}
        >
          <IconButton aria-label="Upload" rounded color="primary" variant="subtle">
            <UploadIcon />
          </IconButton>
          <IconButton aria-label="Image" rounded color="primary" variant="subtle">
            <ImageIcon />
          </IconButton>
          <IconButton aria-label="Done" rounded color="primary" variant="subtle">
            <CheckIcon />
          </IconButton>
        </SpeedDial>
      </FloatingAction>
      <FloatingAction>
        <IconButton aria-label="Upload file" rounded color="primary" variant="solid">
          <UploadIcon />
        </IconButton>
      </FloatingAction>
      <FloatingAction>
        <IconButton aria-label="Add image" rounded color="secondary" variant="solid">
          <ImageIcon />
        </IconButton>
      </FloatingAction>
    </>
  );
};

export const WithChildren: Story = {
  render: () => (
    <Iframe
      title="600x400 screen"
      style={{
        width: 600,
        height: 400,
        border: '1px solid #e5e7eb',
        background: '#f8fafc',
      }}
    >
      <ThemeProvider>
        <FloatingActionsProvider position="bottom-right" itemsDirection="vertical">
          <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            <Center absolute>
              <Flex direction="column" align="center" gap="sm" style={{ textAlign: 'center' }}>
                <Heading as="h2" style={{ margin: 0 }}>
                  Preview
                </Heading>
                <Text>Rendered inside the iframe document.</Text>
              </Flex>
            </Center>
            <ScreenActions />
          </div>
        </FloatingActionsProvider>
      </ThemeProvider>
    </Iframe>
  ),
};
