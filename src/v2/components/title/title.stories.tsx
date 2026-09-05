import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Title
} from '../../index';

const meta: Meta<typeof Title> = {
  title: 'V2/Typography/Title',
  component: Title,
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
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Title>;

export const Default: Story = {
  args: {
    children: 'Surface contrast title',
    as: 'h3',
  },
};

export const H1: Story = {
  args: {
    children: 'Heading 1',
    as: 'h1',
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary title',
    as: 'h3',
    color: 'primary',
  },
};
