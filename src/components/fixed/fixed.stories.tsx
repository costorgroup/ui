import type { Meta, StoryObj } from '@storybook/react';
import React, { CSSProperties } from 'react';
import { Button, Fixed, Text } from '../../index';

const screen: CSSProperties = {
  position: 'relative',
  width: 600,
  height: 400,
  overflow: 'hidden',
  transform: 'translateZ(0)',
  border: '1px solid #e5e7eb',
  background: '#f8fafc',
};

const meta: Meta<typeof Fixed> = {
  title: 'Layout/Fixed',
  component: Fixed,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={screen}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    top: { control: 'text' },
    right: { control: 'text' },
    bottom: { control: 'text' },
    left: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Fixed>;

export const Default: Story = {
  render: (args) => (
    <>
      <Text>Pinned inside this 600×400 frame.</Text>
      <Fixed {...args}>
        <Button>Fixed</Button>
      </Fixed>
    </>
  ),
  args: {
    top: 'sm',
    right: 'sm',
  },
};

export const GapKey: Story = {
  render: () => (
    <Fixed bottom="md" left="md">
      <Button>bottom/left md</Button>
    </Fixed>
  ),
};

export const SpacingNumber: Story = {
  render: () => (
    <Fixed top={4} right={4}>
      <Button variant="outline">top/right 4</Button>
    </Fixed>
  ),
};

export const CssString: Story = {
  render: () => (
    <Fixed top="12px" left="2rem">
      <Button variant="ghost">12px / 2rem</Button>
    </Fixed>
  ),
};
