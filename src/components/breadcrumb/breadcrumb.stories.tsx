import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbLink,
  BreadcrumbIcon,
  BreadcrumbEllipsis,
  CheckIcon,
} from '../../index';
const meta: Meta<typeof Breadcrumb> = {
  title: 'Data Display/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
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

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <BreadcrumbItem>
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
    </Breadcrumb>
  ),
  args: {
    size: 'md',
    color: 'primary',
  },
};

export const WithIcon: Story = {
  render: () => (
    <Breadcrumb color="primary">
      <BreadcrumbItem>
        <BreadcrumbIcon>
          <CheckIcon />
        </BreadcrumbIcon>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Settings</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="#" aria-current="page">
          Profile
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const WithEllipsis: Story = {
  render: () => (
    <Breadcrumb color="primary">
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbEllipsis />
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Documents</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="#" aria-current="page">
          Report
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
};
