import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from '../../index';
const meta: Meta<typeof Heading> = {
  title: 'Typography/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    color: {
      control: 'select',
      options: [
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
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const H1: Story = {
  args: {
    children: 'Heading 1',
    as: 'h1',
  },
};

export const H2: Story = {
  args: {
    children: 'Heading 2',
    as: 'h2',
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary heading',
    as: 'h3',
    color: 'primary',
  },
};
