import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { BlockquoteBase } from './blockquote-base';
import { BlockquoteContent } from './blockquote-content';
import { BlockquoteCaption } from './blockquote-caption';

const quote =
  'If you don’t like the hand that fate’s dealt you with, fight for a new one.';

const meta: Meta<typeof BlockquoteBase> = {
  title: 'Components/Blockquote/Parts',
  component: BlockquoteBase,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof BlockquoteBase>;

export const Default: Story = {
  render: (args) => (
    <BlockquoteBase {...args}>
      <BlockquoteContent color="base" size="md">
        {quote}
      </BlockquoteContent>
      <BlockquoteCaption color="base" size="sm">
        Uzumaki Naruto
      </BlockquoteCaption>
    </BlockquoteBase>
  ),
  args: {
    color: 'primary',
  },
};
