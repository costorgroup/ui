import type { Meta, StoryObj } from '@storybook/react';
import React, { CSSProperties } from 'react';
import { useFloatingActions } from '../../hooks/use-floating-actions';
import {
  CheckIcon,
  CloseIcon,
  ImageIcon,
  MoreHorizontalIcon,
  UploadIcon,
} from '../../icons';
import FloatingActionsProvider from '../../providers/floating-actions';
import type {
  TFloatingActionsItemsDirection,
  TFloatingActionsPosition,
} from '../../providers/floating-actions/types';
import { Button } from '../button';
import { Flex } from '../flex';
import { IconButton } from '../icon-button';
import { SpeedDial } from '../speed-dial';
import { Text } from '../text';
import FloatingAction from './index';

const screen: CSSProperties = {
  position: 'relative',
  width: 600,
  height: 400,
  overflow: 'hidden',
  transform: 'translateZ(0)',
  border: '1px solid #e5e7eb',
  background: '#f8fafc',
};

const POSITIONS: TFloatingActionsPosition[] = [
  'top-left',
  'top',
  'top-right',
  'left',
  'right',
  'bottom-left',
  'bottom',
  'bottom-right',
];

const STACK_DIRECTIONS: TFloatingActionsItemsDirection[] = [
  'vertical',
  'horizontal',
];

const Actions = () => (
  <>
    <IconButton aria-label="Upload" rounded color="primary" variant="subtle">
      <UploadIcon />
    </IconButton>
    <IconButton aria-label="Image" rounded color="primary" variant="subtle">
      <ImageIcon />
    </IconButton>
    <IconButton aria-label="Done" rounded color="primary" variant="subtle">
      <CheckIcon />
    </IconButton>
  </>
);

const Demo = () => {
  const {
    position,
    itemsDirection,
    naturalItemsDirection,
    changePosition,
    changeItemsDirection,
  } = useFloatingActions();

  return (
    <>
      <Flex direction="column" gap="sm" style={{ padding: 16, maxWidth: 320 }}>
        <Text size="sm">
          slot {position} · {itemsDirection} · dial {naturalItemsDirection}
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
      <FloatingAction>
        <SpeedDial
          itemsDirection={naturalItemsDirection}
          aria-label="Create"
          icon={<MoreHorizontalIcon />}
          closeIcon={<CloseIcon />}
        >
          <Actions />
        </SpeedDial>
      </FloatingAction>
    </>
  );
};

const meta: Meta<typeof FloatingAction> = {
  title: 'Buttons/FloatingAction',
  component: FloatingAction,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={screen}>
        <FloatingActionsProvider position="bottom-right" itemsDirection="vertical">
          <Story />
        </FloatingActionsProvider>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof FloatingAction>;

export const Default: Story = {
  render: () => <Demo />,
};
