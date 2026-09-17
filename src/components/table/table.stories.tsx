import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Text, Flex } from '../..';
import type { TPaletteColor } from '../../theme/types';
import type { TTableSize } from './table-root/context';

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
  'base',
  'inverted',
];

const meta: Meta<typeof Table> = {
  title: 'Data Display/Table',
  component: Table,
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

type Story = StoryObj<typeof Table>;

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
    <Table {...args}>
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
    </Table>
  ),
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="lg">
      {(['default', 'primary', 'success', 'error'] as TPaletteColor[]).map(
        (color) => (
          <div key={color}>
            <Text size="sm">color={color}</Text>
            <Table size="md" color={color}>
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
            </Table>
          </div>
        ),
      )}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex direction="column" gap="lg">
      {(['sm', 'md', 'lg'] as TTableSize[]).map((size) => (
        <div key={size}>
          <Text size="sm">size={size}</Text>
          <Table size={size} color="primary">
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
          </Table>
        </div>
      ))}
    </Flex>
  ),
};
