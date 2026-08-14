import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Flex, Pagination, Text } from '../../index';
const meta: Meta<typeof Pagination> = {
  title: 'Data Display/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'subtle', 'surface', 'outline', 'ghost', 'plain'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'success',
        'error',
        'warning',
        'info',
        'dark',
        'light',
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Basic: Story = {
  args: {
    count: 10,
    color: 'primary',
    variant: 'solid',
    size: 'md',
  },
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="md" align="center">
      <Pagination count={10} color="primary" />
      <Pagination count={10} color="secondary" />
      <Pagination count={10} color="success" />
      <Pagination count={10} disabled />
    </Flex>
  ),
};

export const Variants: Story = {
  render: () => (
    <Flex direction="column" gap="md" align="center">
      <Pagination count={10} variant="solid" />
      <Pagination count={10} variant="subtle" />
      <Pagination count={10} variant="surface" />
      <Pagination count={10} variant="outline" />
      <Pagination count={10} variant="ghost" />
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex direction="column" gap="md" align="center">
      <Pagination count={10} size="sm" />
      <Pagination count={10} size="md" />
      <Pagination count={10} size="lg" />
    </Flex>
  ),
};

export const Buttons: Story = {
  render: () => (
    <Flex direction="column" gap="md" align="center">
      <Pagination count={10} showFirstButton showLastButton />
      <Pagination count={10} hidePrevButton hideNextButton />
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
