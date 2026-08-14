import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Flex, Text } from '../../index';
import {
  TableBase,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '.';
import type { TPaletteColor } from '../../theme/types';
import type { TTableSize } from './table-base/context';

const COLORS: TPaletteColor[] = [
  'default',
  'primary',
  'secondary',
  'success',
  'error',
  'warning',
  'info',
  'dark',
  'light',
];

const meta: Meta<typeof TableBase> = {
  title: 'Components/Table/Parts',
  component: TableBase,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '100%', minWidth: 960, maxWidth: 1200 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: COLORS,
    },
  },
};

export default meta;

type Story = StoryObj<typeof TableBase>;

const rows = [
  { name: 'Frozen yoghurt', calories: 159, fat: 6.0 },
  { name: 'Ice cream sandwich', calories: 237, fat: 9.0 },
  { name: 'Eclair', calories: 262, fat: 16.0 },
];

export const Default: Story = {
  args: {
    size: 'md',
    color: 'default',
  },
  render: (args) => (
    <TableBase {...args}>
      <TableHead>
        <TableRow>
          <TableCell>Dessert</TableCell>
          <TableCell align="right">Calories</TableCell>
          <TableCell align="right">Fat (g)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.name}>
            <TableCell>{row.name}</TableCell>
            <TableCell align="right">{row.calories}</TableCell>
            <TableCell align="right">{row.fat}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableBase>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex direction="column" gap="lg">
      {(['sm', 'md', 'lg'] as TTableSize[]).map((size) => (
        <div key={size}>
          <Text size="sm">size={size}</Text>
          <TableBase size={size} color="primary">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Ada Lovelace</TableCell>
                <TableCell>Mathematician</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Grace Hopper</TableCell>
                <TableCell>Computer scientist</TableCell>
              </TableRow>
            </TableBody>
          </TableBase>
        </div>
      ))}
    </Flex>
  ),
};
