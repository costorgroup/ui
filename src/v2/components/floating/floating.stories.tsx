import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { CSSProperties } from 'react';
import { Flex } from '../../../index';
import {
  FolderIcon,
  MoreHorizontalIcon,
  PlayIcon,
  SearchIcon,
  StarIcon,
} from '../../../icons';
import { useTheme } from '../../../theme';
import { useFloating } from '../../hooks/use-floating';
import { FloatingProvider } from '../../providers/floating';
import type {
  TFloatingItemsDirection,
  TFloatingPosition,
} from '../../providers/floating/types';
import {
  Button,
  Dock,
  DockItem,
  DockSeparator,
  IconButton,
  Text,
} from '../../index';
import Floating from './index';

const POSITIONS: TFloatingPosition[] = [
  'top-left',
  'top',
  'top-right',
  'left',
  'right',
  'bottom-left',
  'bottom',
  'bottom-right',
];

const STACK_DIRECTIONS: TFloatingItemsDirection[] = [
  'vertical',
  'horizontal',
];

const dockOrientation = (position: TFloatingPosition) =>
  position === 'left' || position === 'right' ? 'vertical' : 'horizontal';

const ExampleDock = ({
  orientation,
}: {
  orientation: 'horizontal' | 'vertical';
}) => (
  <Dock orientation={orientation}>
    <DockItem aria-label="Search" color="default" variant='surface' radius="circle">
      <SearchIcon />
    </DockItem>
    <DockItem aria-label="Star" color="default" variant='surface'>
      <StarIcon />
    </DockItem>
    <DockItem aria-label="Folder" color="default" variant='surface'>
      <FolderIcon />
    </DockItem>
    <DockItem aria-label="Play" color="default" variant='surface'>
      <PlayIcon />
    </DockItem>
    <DockSeparator />
    <DockItem aria-label="More" color="default" variant='surface'>
      <MoreHorizontalIcon />
    </DockItem>
  </Dock>
);

const Demo = () => {
  const { position, itemsDirection, changePosition, changeItemsDirection } =
    useFloating();
  const orientation = dockOrientation(position);

  return (
    <>
      <Flex direction="column" gap="sm" style={{ padding: 16, maxWidth: 320 }}>
        <Text size="sm">
          slot {position} · {itemsDirection}
        </Text>
        <Flex gap="xs" wrap="wrap">
          {POSITIONS.map((value) => (
            <Button
              key={value}
              size="sm"
              variant={position === value ? 'solid' : 'outline'}
              onClick={() => changePosition(value)}
            >
              {value}
            </Button>
          ))}
        </Flex>
        <Flex gap="xs">
          {STACK_DIRECTIONS.map((value) => (
            <Button
              key={value}
              size="sm"
              variant={itemsDirection === value ? 'solid' : 'outline'}
              onClick={() => changeItemsDirection(value)}
            >
              {value}
            </Button>
          ))}
        </Flex>
      </Flex>
      <Floating>
        <ExampleDock orientation={orientation} />
      </Floating>
    </>
  );
};

const Screen = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const style: CSSProperties = {
    position: 'relative',
    boxSizing: 'border-box',
    width: '100%',
    maxHeight: '100%',
    aspectRatio: '16 / 9',
    overflow: 'hidden',
    transform: 'translateZ(0)',
    border: `1px solid ${theme.surfaces.border}`,
    background: theme.surfaces.background,
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <div style={style}>{children}</div>
    </div>
  );
};

const meta: Meta<typeof Floating> = {
  title: 'V3/Layout/Floating',
  component: Floating,
  tags: ['autodocs'],
  parameters: {
    fill: true,
    floating: {
      position: 'bottom' as TFloatingPosition,
      itemsDirection: 'horizontal' as TFloatingItemsDirection,
    },
  },
  decorators: [
    (Story, { parameters }) => (
      <Screen>
        <FloatingProvider
          position={parameters.floating.position}
          itemsDirection={parameters.floating.itemsDirection}
        >
          <Story />
        </FloatingProvider>
      </Screen>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Floating>;

export const Playground: Story = {
  tags: ['!dev'],
  render: () => <Demo />,
};

export const Default: Story = {
  render: () => (
    <Floating>
      <ExampleDock orientation="horizontal" />
    </Floating>
  ),
};

export const Buttons: Story = {
  parameters: {
    floating: {
      position: 'bottom-right',
      itemsDirection: 'vertical',
    },
  },
  render: () => (
    <Floating>
      <IconButton aria-label="Search" color="primary">
        <SearchIcon />
      </IconButton>
      <Button color="primary">Compose</Button>
    </Floating>
  ),
};
