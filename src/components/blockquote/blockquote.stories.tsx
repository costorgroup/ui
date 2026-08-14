import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Blockquote } from './index';

const quote =
  'If you don’t like the hand that fate’s dealt you with, fight for a new one.';

const meta: Meta<typeof Blockquote> = {
  title: 'Typography/Blockquote',
  component: Blockquote,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Blockquote>;

export const Default: Story = {
  render: (args) => (
    <Blockquote {...args} caption="Uzumaki Naruto">
      {quote}
    </Blockquote>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Blockquote color="error" caption="Uzumaki Naruto">
        {quote}
      </Blockquote>
      <Blockquote color="success" caption="Uzumaki Naruto">
        {quote}
      </Blockquote>
      <Blockquote color="info" caption="Uzumaki Naruto">
        {quote}
      </Blockquote>
      <Blockquote color="primary" caption="Uzumaki Naruto">
        {quote}
      </Blockquote>
    </div>
  ),
};
