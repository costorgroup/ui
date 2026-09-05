import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import {
  BlockquoteBase,
  BlockquoteContent,
  BlockquoteCaption
} from '../../index';

const quote =
  'If you don’t like the hand that fate’s dealt you with, fight for a new one.';

const meta: Meta<typeof BlockquoteBase> = {
  title: 'V2/Typography/Blockquote/Parts',
  component: BlockquoteBase,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof BlockquoteBase>;

export const Default: Story = {
  render: (args) => (
    <BlockquoteBase {...args}>
      <BlockquoteContent size="md">{quote}</BlockquoteContent>
      <BlockquoteCaption size="sm">Uzumaki Naruto</BlockquoteCaption>
    </BlockquoteBase>
  ),
  args: {
    color: 'primary',
  },
};
