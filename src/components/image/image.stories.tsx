import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Button, Image, Text, Flex } from '../..';

const RADIUS = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'pill', 'full'] as const;

const meta: Meta<typeof Image> = {
  title: 'Data Display/Image',
  component: Image,
  tags: ['autodocs'],
  args: {
    src: 'https://picsum.photos/seed/costor/320/240',
    width: 320,
    height: 240,
    alt: 'Sample',
    radius: 'md',
  },
  argTypes: {
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
    radius: {
      control: 'select',
      options: RADIUS,
    },
    animation: {
      control: 'select',
      options: [undefined, 'fade', 'zoom'],
    },
    src: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Image>;

export const Playground: Story = {
  tags: ['!dev'],
};

export const Fallback: Story = {
  render: () => (
    <Flex gap="md" wrap="wrap" align="center">
      <Flex direction="column" gap="xs" align="center">
        <Image width={120} height={120} animation="fade" alt="Empty source" />
        <Text size="sm">empty src</Text>
      </Flex>
      <Flex direction="column" gap="xs" align="center">
        <Image
          src="https://broken.invalid/image.png"
          width={120}
          height={120}
          animation="zoom"
          alt="Broken"
        />
        <Text size="sm">onError</Text>
      </Flex>
    </Flex>
  ),
};

export const Animations: Story = {
  render: function AnimationsStory() {
    const [resetKey, setResetKey] = useState(0);

    return (
      <Flex direction="column" gap="md" align="center">
        <Flex gap="md" wrap="wrap" align="center" justify="center">
          <Flex direction="column" gap="xs" align="center">
            <Image
              key={`fade-${resetKey}`}
              src="https://picsum.photos/seed/anim-fade/240/180"
              width={240}
              height={180}
              animation="fade"
              alt="Fade in"
            />
            <Text size="sm">fade</Text>
          </Flex>
          <Flex direction="column" gap="xs" align="center">
            <Image
              key={`zoom-${resetKey}`}
              src="https://picsum.photos/seed/anim-zoom/240/180"
              width={240}
              height={180}
              animation="zoom"
              alt="Zoom in"
            />
            <Text size="sm">zoom</Text>
          </Flex>
        </Flex>
        <Button variant="outline" onClick={() => setResetKey((key) => key + 1)}>
          Reset animations
        </Button>
      </Flex>
    );
  },
};

export const Radius: Story = {
  render: () => (
    <Flex gap="md" wrap="wrap" align="center">
      {RADIUS.filter((radius) => radius !== 'none').map((radius) => (
        <Image
          key={radius}
          src={`https://picsum.photos/seed/radius-${radius}/120/120`}
          width={radius === 'pill' ? 200 : 120}
          height={120}
          radius={radius}
          alt={radius}
        />
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex gap="md" direction="column" style={{ width: 320 }}>
      <Image
        src="https://picsum.photos/seed/size-num/200/120"
        width={200}
        height={120}
        alt="Number size"
      />
      <Image
        src="https://picsum.photos/seed/size-pct/640/200"
        width="100%"
        height={120}
        alt="Percent width"
      />
    </Flex>
  ),
};
