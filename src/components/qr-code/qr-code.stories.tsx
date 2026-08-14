import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { GradientCard } from '../../index';
import { QrCode } from './index';

const meta: Meta<typeof QrCode> = {
  title: 'Data Display/QrCode',
  component: QrCode,
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
    value: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof QrCode>;

export const Default: Story = {
  args: {
    value: 'https://costor.app',
    color: 'primary',
  },
  render: (args) => (
    <div style={{ width: 180, height: 180 }}>
      <GradientCard color={args.color} padding="xl">
        <QrCode {...args} />
      </GradientCard>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {(['primary', 'secondary', 'success', 'error'] as const).map((color) => (
        <div key={color} style={{ width: 140, height: 140 }}>
          <GradientCard color={color} padding="lg">
            <QrCode value="https://costor.app" color={color} />
          </GradientCard>
        </div>
      ))}
    </div>
  ),
};
