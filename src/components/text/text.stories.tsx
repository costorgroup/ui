import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '../../index';
const meta: Meta<typeof Text> = {
  title: 'Typography/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
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
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: 'Readable body text using the default gray color.',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    children: 'Small text at 14px.',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Large text at 18px.',
    size: 'lg',
  },
};

export const Primary: Story = {
  args: {
    children: 'Text with primary color.',
    color: 'primary',
  },
};
