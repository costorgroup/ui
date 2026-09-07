import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Flex } from '../../../index';
import { useMediaViewer } from '../../hooks/use-media-viewer';
import { Button, MediaViewer, MediaViewerProvider, Text } from '../../index';
import { TMediaViewerItem } from './types';

const ITEMS: TMediaViewerItem[] = [
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80',
    thumbnail:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=480&q=60',
    alt: 'Mountain lake',
    caption: 'Lake in the mountains',
    location: 'Banff',
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80',
    thumbnail:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=480&q=60',
    alt: 'Sunlit valley',
    caption: 'Sun through the trees',
    location: 'Yosemite',
  },
  {
    type: 'video',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    alt: 'Flower video',
    caption: 'Sample video',
    location: 'Studio',
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    thumbnail:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=480&q=60',
    alt: 'Tropical beach',
    caption: 'Clear water and sand',
    location: 'Maldives',
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80',
    thumbnail:
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=480&q=60',
    alt: 'Foggy hills',
    caption: 'Morning fog',
    location: 'Scotland',
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80',
    thumbnail:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=480&q=60',
    alt: 'Forest path',
    caption: 'Sun on the trail',
    location: 'Olympic',
  },
];

const meta: Meta<typeof MediaViewer> = {
  title: 'V2/Overlays/MediaViewer',
  component: MediaViewer,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MediaViewer>;

export const Default: Story = {
  render: function DefaultStory() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open viewer</Button>
        <MediaViewer
          items={ITEMS}
          defaultIndex={1}
          open={open}
          onOpenChange={setOpen}
        />
      </>
    );
  },
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(2);

    return (
      <Flex direction="column" gap="sm" align="flex-start">
        <Flex gap="sm">
          <Button
            onClick={() => {
              setIndex(2);
              setOpen(true);
            }}
          >
            Open video
          </Button>
          <Button
            onClick={() => {
              setIndex(0);
              setOpen(true);
            }}
          >
            Open first
          </Button>
        </Flex>
        <MediaViewer
          items={ITEMS}
          index={index}
          open={open}
          onIndexChange={setIndex}
          onOpenChange={setOpen}
        />
        <Text size="sm">
          open: {String(open)} · index: {index}
        </Text>
      </Flex>
    );
  },
};

const HookDemo = () => {
  const { open, isOpen, index, active } = useMediaViewer();

  return (
    <Flex direction="column" gap="sm" align="flex-start">
      <Flex gap="sm" wrap="wrap">
        {ITEMS.map((item, itemIndex) => (
          <Button
            key={item.src}
            size="sm"
            onClick={() => open(ITEMS, itemIndex)}
          >
            {String(item.location)} ({item.type})
          </Button>
        ))}
      </Flex>
      <Text size="sm">
        open: {String(isOpen)}
        {active != null ? ` · ${active.alt} (${index})` : ''}
      </Text>
    </Flex>
  );
};

export const WithHook: Story = {
  render: function WithHookStory() {
    return (
      <MediaViewerProvider>
        <HookDemo />
      </MediaViewerProvider>
    );
  },
};
