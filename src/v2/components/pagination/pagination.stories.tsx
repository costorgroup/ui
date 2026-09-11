import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Flex, Text } from '../../../index';
import type { TPaletteColor } from '../../../theme/types';
import { Pagination, PAGINATION_DEFAULT_VARIANTS } from '../../index';

const COLORS: TPaletteColor[] = [
  'base',
  'primary',
  'secondary',
  'success',
  'error',
  'warning',
  'info',
  'dark',
  'light',
  'default',
  'inverted',
];

const meta: Meta<typeof Pagination> = {
  title: 'V2/Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'solid',
        'subtle',
        'surface',
        'outline',
        'ghost',
        'plain',
      ],
    },
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

type Story = StoryObj<typeof Pagination>;

export const Basic: Story = {
  args: {
    count: 10,
    color: 'primary',
    size: 'md',
  },
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="md" align="center">
      <Pagination count={10} color="default" defaultPage={3} />
      <Pagination count={10} color="primary" defaultPage={3} />
      <Pagination count={10} color="secondary" defaultPage={3} />
      <Pagination count={10} color="success" defaultPage={3} />
      <Pagination count={10} disabled defaultPage={3} />
    </Flex>
  ),
};

export const Variants: Story = {
  render: () => (
    <Flex direction="column" gap="md" align="center">
      <Pagination count={10} defaultPage={3} />
      <Pagination count={10} variant="outline" defaultPage={3} />
      <Pagination count={10} variant={['solid', 'plain']} defaultPage={3} />
      <Pagination
        count={10}
        variant={PAGINATION_DEFAULT_VARIANTS}
        defaultPage={3}
      />
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex direction="column" gap="md" align="center">
      <Pagination count={10} size="sm" defaultPage={3} />
      <Pagination count={10} size="md" defaultPage={3} />
      <Pagination count={10} size="lg" defaultPage={3} />
    </Flex>
  ),
};

export const Buttons: Story = {
  render: () => (
    <Flex direction="column" gap="md" align="center">
      <Pagination count={10} showFirstButton showLastButton defaultPage={5} />
      <Pagination count={10} hidePrevButton hideNextButton defaultPage={5} />
    </Flex>
  ),
};

export const Ranges: Story = {
  render: () => (
    <Flex direction="column" gap="md" align="center">
      <Pagination count={11} defaultPage={6} siblingCount={0} />
      <Pagination count={11} defaultPage={6} />
      <Pagination count={11} defaultPage={6} siblingCount={0} boundaryCount={2} />
      <Pagination count={11} defaultPage={6} boundaryCount={2} />
    </Flex>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [page, setPage] = useState(1);

    return (
      <Flex direction="column" gap="md" align="center">
        <Text size="sm">Page: {page}</Text>
        <Pagination
          count={10}
          page={page}
          onChange={(_event, next) => setPage(next)}
        />
      </Flex>
    );
  },
};

export const OnDarkSurface: Story = {
  render: () => (
    <div
      style={{
        padding: 32,
        borderRadius: 12,
        background:
          'linear-gradient(135deg, rgba(0, 18, 61, 0.72) 0%, rgba(0, 14, 46, 0.85) 100%)',
      }}
    >
      <Pagination count={20} defaultPage={8} color="default" variant="solid" />
    </div>
  ),
};
