import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { DownloadIcon, FilterIcon } from '../../icons';
import {
  Badge,
  Button,
  CheckBox,
  DataTable,
  Flex,
  IconButton,
  Modal,
} from '../..';
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
  'base',
  'inverted',
];

const VARIANTS: TDataTableVariant[] = ['subtle', 'surface', 'outline'];

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
    variant: 'surface',
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
        variant="surface"
        pageSize={5}
      />
    );
  },
};

type TDessertFilters = {
  lowCalorie: boolean;
  lowFat: boolean;
};

const NO_FILTERS: TDessertFilters = { lowCalorie: false, lowFat: false };

export const WithFilters: Story = {
  render: function WithFiltersStory() {
    const [filters, setFilters] = useState(NO_FILTERS);
    const [draft, setDraft] = useState(NO_FILTERS);
    const [open, setOpen] = useState(false);

    const activeCount = Object.values(filters).filter(Boolean).length;
    const rows = INITIAL_ROWS.filter(
      (row) =>
        (!filters.lowCalorie || row.calories < 300) &&
        (!filters.lowFat || row.fat < 5),
    );

    const openFilters = () => {
      setDraft(filters);
      setOpen(true);
    };

    const applyFilters = () => {
      setFilters(draft);
      setOpen(false);
    };

    return (
      <>
        <DataTable
          title="Nutrition"
          description="Filter rows from the header actions."
          columns={BASE_COLUMNS}
          data={rows}
          color="primary"
          variant="surface"
          pageSize={5}
          actions={
            <>
              <Badge
                badgeContent={activeCount}
                color="primary"
                size="sm"
                invisible={activeCount === 0}
              >
                <IconButton
                  aria-label="Filters"
                  size="sm"
                  variant="outline"
                  onClick={openFilters}
                >
                  <FilterIcon />
                </IconButton>
              </Badge>
              <IconButton aria-label="Export" size="sm" variant="outline">
                <DownloadIcon />
              </IconButton>
            </>
          }
        />
        <Modal
          open={open}
          size="sm"
          onClose={() => setOpen(false)}
          title="Filters"
          description="Narrow down the desserts shown in the table."
          actions={
            <>
              <Button variant="outline" onClick={() => setDraft(NO_FILTERS)}>
                Clear
              </Button>
              <Button onClick={applyFilters}>Apply</Button>
            </>
          }
        >
          <Flex direction="column" gap="sm">
            <CheckBox
              label="Low calorie"
              description="Under 300 kcal"
              checked={draft.lowCalorie}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  lowCalorie: event.target.checked,
                }))
              }
            />
            <CheckBox
              label="Low fat"
              description="Under 5 g of fat"
              checked={draft.lowFat}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  lowFat: event.target.checked,
                }))
              }
            />
          </Flex>
        </Modal>
      </>
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
