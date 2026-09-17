import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Card, QrCode, Flex } from '../..';

const meta: Meta<typeof QrCode> = {
  title: 'Data Display/QrCode',
  component: QrCode,
  tags: ['autodocs'],
  argTypes: {
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
  },
  render: (args) => (
    <div style={{ width: 160, height: 160 }}>
      <QrCode {...args} />
    </div>
  ),
};

export const InheritsColor: Story = {
  render: () => (
    <Flex gap="lg" wrap="wrap">
      {['inherit', 'tomato', 'dodgerblue', '#22c55e'].map((color) => (
        <div
          key={color}
          style={{ width: 120, height: 120, color }}
        >
          <QrCode value="https://costor.app" />
        </div>
      ))}
    </Flex>
  ),
};

export const OnCardSurface: Story = {
  render: () => (
    <Card variant="surface" style={{ width: 200, padding: 24 }}>
      <QrCode value="https://costor.app" />
    </Card>
  ),
};
