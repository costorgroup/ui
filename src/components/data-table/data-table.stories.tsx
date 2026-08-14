import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Button, DataTable, Flex } from '../../index';
import type { TPaletteColor } from '../../theme/types';
import type {
  TDataTableColumn,
  TDataTableRow,
  TDataTableVariant,
} from './types';

type TDessert = TDataTableRow & {
  id: number;
  name: string;
  calories: number;
  fat: number;
};

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

const VARIANTS: TDataTableVariant[] = [
  'solid',
  'subtle',
  'surface',
  'outline',
  'ghost',
  'plain',
];

const BASE_COLUMNS: TDataTableColumn<TDessert>[] = [
  { id: 'name', key: 'name', name: 'Dessert' },
  { id: 'calories', key: 'calories', name: 'Calories' },
  { id: 'fat', key: 'fat', name: 'Fat (g)' },
];

const INITIAL_ROWS: TDessert[] = [
  { id: 1, name: 'Frozen yoghurt', calories: 159, fat: 6 },
  { id: 2, name: 'Ice cream sandwich', calories: 237, fat: 9 },
  { id: 3, name: 'Eclair', calories: 262, fat: 16 },
  { id: 4, name: 'Cupcake', calories: 305, fat: 3.7 },
  { id: 5, name: 'Gingerbread', calories: 356, fat: 16 },
  { id: 6, name: 'Jelly bean', calories: 375, fat: 0 },
  { id: 7, name: 'Lollipop', calories: 392, fat: 0.2 },
  { id: 8, name: 'Honeycomb', calories: 408, fat: 3.2 },
  { id: 9, name: 'Donut', calories: 452, fat: 25 },
  { id: 10, name: 'KitKat', calories: 518, fat: 26 },
  { id: 11, name: 'Nougat', calories: 360, fat: 19 },
  { id: 12, name: 'Marshmallow', calories: 318, fat: 0 },
];

const meta: Meta<typeof DataTable<TDessert>> = {
  title: 'Data Display/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '100%', minWidth: 960, maxWidth: 1200 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    color: {
      control: 'select',
      options: COLORS,
    },
    variant: {
      control: 'select',
      options: VARIANTS,
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    pageSize: {
      control: 'number',
    },
  },
};

export default meta;

type Story = StoryObj<typeof DataTable<TDessert>>;

export const Default: Story = {
  args: {
    title: 'Nutrition',
    description: 'Browse dessert nutrition facts.',
    columns: BASE_COLUMNS,
    data: INITIAL_ROWS,
    color: 'primary',
    variant: 'subtle',
    size: 'md',
    pageSize: 5,
  },
};

export const WithActions: Story = {
  render: function WithActionsStory() {
    const [rows, setRows] = useState(INITIAL_ROWS);

    const columns: TDataTableColumn<TDessert>[] = [
      ...BASE_COLUMNS,
      {
        id: 'actions',
        key: 'actions',
        name: 'Actions',
        renderCell: ({ row }) => (
          <Button
            size="sm"
            variant="ghost"
            color="error"
            onClick={() =>
              setRows((current) =>
                current.filter((item) => item.id !== row.id),
              )
            }
          >
            Remove #{row.id}
          </Button>
        ),
      },
    ];

    return (
      <DataTable
        title="Nutrition"
        description="Remove rows with the actions column."
        columns={columns}
        data={rows}
        color="primary"
        variant="subtle"
        pageSize={5}
      />
    );
  },
};

export const Variants: Story = {
  render: () => (
    <Flex direction="column" gap="lg">
      {VARIANTS.map((variant) => (
        <DataTable
          key={variant}
          title={variant}
          description={`${variant} data table variant`}
          columns={BASE_COLUMNS}
          data={INITIAL_ROWS.slice(0, 3)}
          variant={variant}
          color="primary"
          pageSize={3}
        />
      ))}
    </Flex>
  ),
};
