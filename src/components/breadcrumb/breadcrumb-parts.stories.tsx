import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CheckIcon } from '../../index';
import { BreadcrumbBase, BreadcrumbList } from './breadcrumb-base';
import { BreadcrumbItem } from './breadcrumb-item';
import { BreadcrumbSeparator } from './breadcrumb-separator';
import { BreadcrumbLink } from './breadcrumb-link';
import { BreadcrumbIcon } from './breadcrumb-icon';

const meta: Meta<typeof BreadcrumbBase> = {
  title: 'Components/Breadcrumb/Parts',
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
          <BreadcrumbLink href="#" aria-current="page">
            Data
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </BreadcrumbBase>
  ),
};
