import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { CheckIcon } from '../../../icons';
import { BreadcrumbBase, BreadcrumbList } from './breadcrumb-base';
import { BreadcrumbEllipsis } from './breadcrumb-ellipsis';
import { BreadcrumbIcon } from './breadcrumb-icon';
import { BreadcrumbItem } from './breadcrumb-item';
import { BreadcrumbLink } from './breadcrumb-link';
import { BreadcrumbSeparator } from './breadcrumb-separator';

const meta: Meta<typeof BreadcrumbBase> = {
  title: 'V2/Data Display/Breadcrumb/Parts',
  component: BreadcrumbBase,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof BreadcrumbBase>;

export const Default: Story = {
  args: {
    size: 'md',
    color: 'primary',
  },
  render: (args) => (
    <BreadcrumbBase {...args}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbIcon>
            <CheckIcon />
          </BreadcrumbIcon>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Library</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#" aria-current="page">
            Data
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </BreadcrumbBase>
  ),
};
