import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button, Chip, Flex, Tooltip } from '../../index';
import type { TTooltipPlacement } from './types';

const PLACEMENTS: TTooltipPlacement[] = [
  'top-start',
  'top',
  'top-end',
  'bottom-start',
  'bottom',
  'bottom-end',
  'left-start',
  'left',
  'left-end',
  'right-start',
  'right',
  'right-end',
];

const chipRender = (label: string) => () => (
  <Chip color="primary" size="sm">
    {label}
  </Chip>
);

const meta: Meta<typeof Tooltip> = {
  title: 'Overlays/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: PLACEMENTS,
    },
    offset: {
      control: 'number',
    },
    render: {
      table: { disable: true },
    },
    children: {
      table: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => (
    <Flex justify="center" align="center" style={{ minHeight: 240 }}>
      <Tooltip {...args} render={chipRender('Tooltip')}>
        <Button>Hover me</Button>
      </Tooltip>
    </Flex>
  ),
  args: {
    placement: 'top',
    offset: 8,
  },
};

export const Placements: Story = {
  render: () => (
    <Flex direction="column" gap="xl" align="center" style={{ padding: 48 }}>
      <Flex gap="sm" wrap="wrap" justify="center">
        {(['top-start', 'top', 'top-end'] as const).map((placement) => (
          <Tooltip
            key={placement}
            placement={placement}
            render={chipRender(placement)}
          >
            <Button variant="outline">{placement}</Button>
          </Tooltip>
        ))}
      </Flex>
      <Flex gap="xl" align="center">
        <Flex direction="column" gap="sm">
          {(['left-start', 'left', 'left-end'] as const).map((placement) => (
            <Tooltip
              key={placement}
              placement={placement}
              render={chipRender(placement)}
            >
              <Button variant="outline">{placement}</Button>
            </Tooltip>
          ))}
        </Flex>
        <Flex direction="column" gap="sm">
          {(['right-start', 'right', 'right-end'] as const).map((placement) => (
            <Tooltip
              key={placement}
              placement={placement}
              render={chipRender(placement)}
            >
              <Button variant="outline">{placement}</Button>
            </Tooltip>
          ))}
        </Flex>
      </Flex>
      <Flex gap="sm" wrap="wrap" justify="center">
        {(['bottom-start', 'bottom', 'bottom-end'] as const).map((placement) => (
          <Tooltip
            key={placement}
            placement={placement}
            render={chipRender(placement)}
          >
            <Button variant="outline">{placement}</Button>
          </Tooltip>
        ))}
      </Flex>
    </Flex>
  ),
};

export const Offset: Story = {
  render: () => (
    <Flex gap="lg" justify="center" align="center" style={{ minHeight: 200 }}>
      <Tooltip placement="top" offset={4} render={chipRender('offset={4}')}>
        <Button variant="outline">4px</Button>
      </Tooltip>
      <Tooltip placement="top" offset={16} render={chipRender('offset={16}')}>
        <Button variant="outline">16px</Button>
      </Tooltip>
      <Tooltip placement="top" offset={32} render={chipRender('offset={32}')}>
        <Button variant="outline">32px</Button>
      </Tooltip>
    </Flex>
  ),
};
