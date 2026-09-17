import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import {
  BlockquoteBase,
  BlockquoteCaption,
  BlockquoteContent,
  BlockquoteIcon,
  BlockquoteRail,
} from '../..';
import { QuoteIcon } from '../../icons';

const quote =
  "If you don't like the hand that fate's dealt you with, fight for a new one.";

const meta: Meta<typeof BlockquoteBase> = {
  title: 'Typography/Blockquote/Parts',
  component: BlockquoteBase,
  tags: ['autodocs'],
  args: {
    color: 'default',
    variant: 'solid',
  },
};

export default meta;

type Story = StoryObj<typeof BlockquoteBase>;

export const AllParts: Story = {
  render: (args) => (
    <BlockquoteBase {...args}>
      <BlockquoteRail />
      <BlockquoteIcon>
        <QuoteIcon />
      </BlockquoteIcon>
      <BlockquoteContent>{quote}</BlockquoteContent>
      <BlockquoteCaption>Uzumaki Naruto</BlockquoteCaption>
    </BlockquoteBase>
  ),
};

export const Content: Story = {
  render: (args) => (
    <BlockquoteBase {...args}>
      <BlockquoteContent>{quote}</BlockquoteContent>
    </BlockquoteBase>
  ),
};

export const WithCaption: Story = {
  render: (args) => (
    <BlockquoteBase {...args}>
      <BlockquoteContent>{quote}</BlockquoteContent>
      <BlockquoteCaption>Uzumaki Naruto</BlockquoteCaption>
    </BlockquoteBase>
  ),
};

export const WithRail: Story = {
  render: (args) => (
    <BlockquoteBase {...args} color="primary">
      <BlockquoteRail />
      <BlockquoteContent>{quote}</BlockquoteContent>
    </BlockquoteBase>
  ),
};

export const WithIcon: Story = {
  render: (args) => (
    <BlockquoteBase {...args} color="primary">
      <BlockquoteIcon>
        <QuoteIcon />
      </BlockquoteIcon>
      <BlockquoteContent>{quote}</BlockquoteContent>
    </BlockquoteBase>
  ),
};
