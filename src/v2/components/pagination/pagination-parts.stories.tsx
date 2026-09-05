import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { PaginationBase } from './pagination-base';
import { PaginationEllipsis } from './pagination-ellipsis';
import { PaginationItem } from './pagination-item';
import { PaginationList } from './pagination-list';

const meta: Meta<typeof PaginationBase> = {
  title: 'V2/Navigation/Pagination/Parts',
  component: PaginationBase,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof PaginationBase>;

export const Default: Story = {
  render: function DefaultStory() {
    const [page, setPage] = useState(3);

    return (
      <PaginationBase>
        <PaginationList>
          <li>
            <PaginationItem
              type="previous"
              page={page - 1}
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              ‹
            </PaginationItem>
          </li>
          <li>
            <PaginationItem
              type="page"
              page={1}
              selected={page === 1}
              onClick={() => setPage(1)}
            >
              1
            </PaginationItem>
          </li>
          <li>
            <PaginationEllipsis />
          </li>
          <li>
            <PaginationItem
              type="page"
              page={3}
              selected={page === 3}
              onClick={() => setPage(3)}
            >
              3
            </PaginationItem>
          </li>
          <li>
            <PaginationItem
              type="page"
              page={4}
              selected={page === 4}
              onClick={() => setPage(4)}
            >
              4
            </PaginationItem>
          </li>
          <li>
            <PaginationItem
              type="next"
              page={page + 1}
              onClick={() => setPage((p) => p + 1)}
            >
              ›
            </PaginationItem>
          </li>
        </PaginationList>
      </PaginationBase>
    );
  },
};
