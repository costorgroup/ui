import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Layer, Layers, Flex, Text } from '../..';
import type { TLayersRadius, TLayersSpread } from './types';

const RADIUS: TLayersRadius[] = ['none', 'sm', 'md', 'lg', 'xl'];
const SPREADS: TLayersSpread[] = ['top', 'right', 'bottom', 'left'];

const PHOTOS = [
  {
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
    alt: 'Mountain lake',
  },
  {
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
    alt: 'Sunlit valley',
  },
  {
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    alt: 'Tropical beach',
  },
  {
    src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    alt: 'Foggy hills',
  },
  {
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
    alt: 'Forest path',
  },
  {
    src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80',
    alt: 'Green hills',
  },
] as const;

const PhotoStack = ({
  count = 4,
  ...props
}: React.ComponentProps<typeof Layers> & {
  count?: number;
}) => (
  <Layers {...props}>
    {PHOTOS.slice(0, count).map((photo) => (
      <Layer key={photo.src}>
        <img src={photo.src} alt={photo.alt} />
      </Layer>
    ))}
  </Layers>
);

const meta: Meta<typeof Layers> = {
  title: 'Experimental/Layers',
  component: Layers,
  subcomponents: { Layer },
  tags: ['autodocs'],
  args: {
    radius: 'lg',
    aspectRatio: '16 / 9',
    spread: 'bottom',
  },
  argTypes: {
    radius: {
      control: 'select',
      options: RADIUS,
    },
    aspectRatio: {
      control: 'text',
    },
    spread: {
      control: 'select',
      options: SPREADS,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Layers>;

export const Playground: Story = {
  tags: ['!dev'],
  render: (args) => <PhotoStack {...args} count={4} />,
};

export const Photos: Story = {
  render: (args) => <PhotoStack {...args} count={4} />,
};

export const Count: Story = {
  render: (args) => (
    <Flex gap="xl" align="flex-end" wrap="wrap">
      {[2, 3, 5, 6].map((count) => (
        <Flex key={count} direction="column" gap="sm" align="center">
          <PhotoStack {...args} count={count} />
          <Text size="sm">{count} layers</Text>
        </Flex>
      ))}
    </Flex>
  ),
};

export const Spread: Story = {
  render: (args) => (
    <Flex gap="xl" wrap="wrap" align="center">
      {SPREADS.map((spread) => (
        <Flex key={spread} direction="column" gap="sm" align="center">
          <PhotoStack {...args} spread={spread} count={4} />
          <Text size="sm">{spread}</Text>
        </Flex>
      ))}
    </Flex>
  ),
};

export const Radius: Story = {
  render: (args) => (
    <Flex gap="xl" wrap="wrap" align="flex-end">
      {(['sm', 'lg', 'xl'] as const).map((radius) => (
        <Flex key={radius} direction="column" gap="sm" align="center">
          <PhotoStack {...args} radius={radius} count={3} />
          <Text size="sm">{radius}</Text>
        </Flex>
      ))}
    </Flex>
  ),
};
