import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Flex } from '../../../index';
import { QuoteIcon } from '../../../icons';
import type { TPaletteColor } from '../../../theme/types';
import {
  Blockquote,
  BlockquoteCaption,
  BlockquoteContent,
  BlockquoteIcon,
  BlockquoteRail,
} from '../../index';
import type { TTextSize } from '../text/types';
import type { TBlockquoteVariant } from './types';

const quote =
  "If you don't like the hand that fate's dealt you with, fight for a new one.";

const COLORS: TPaletteColor[] = [
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
];

const VARIANTS: TBlockquoteVariant[] = [
  'solid',
  'subtle',
  'surface',
  'outline',
  'plain',
];

const SIZES: TTextSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const THICKNESSES = [2, 4, 6, 8];

const meta: Meta<typeof Blockquote> = {
  title: 'V3/Typography/Blockquote',
  component: Blockquote,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: COLORS,
    },
    variant: {
      control: 'select',
      options: VARIANTS,
    },
  },
  args: {
    color: 'default',
    variant: 'solid',
  },
};

export default meta;

type Story = StoryObj<typeof Blockquote>;

export const Playground: Story = {
  tags: ['!dev'],
  render: (args) => (
    <Blockquote {...args}>
      <BlockquoteRail />
      <BlockquoteIcon>
        <QuoteIcon />
      </BlockquoteIcon>
      <BlockquoteContent>{quote}</BlockquoteContent>
      <BlockquoteCaption>Uzumaki Naruto</BlockquoteCaption>
    </Blockquote>
  ),
};

export const AllParts: Story = {
  render: (args) => (
    <Blockquote {...args}>
      <BlockquoteRail />
      <BlockquoteIcon>
        <QuoteIcon />
      </BlockquoteIcon>
      <BlockquoteContent>{quote}</BlockquoteContent>
      <BlockquoteCaption>Uzumaki Naruto</BlockquoteCaption>
    </Blockquote>
  ),
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {COLORS.map((color) => (
        <Blockquote key={color} color={color}>
          <BlockquoteRail />
          <BlockquoteContent>
            This quote will be in '{color}' color.
          </BlockquoteContent>
        </Blockquote>
      ))}
    </Flex>
  ),
};

export const Variants: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {VARIANTS.map((variant) => (
        <Blockquote key={variant} color="primary" variant={variant}>
          <BlockquoteRail />
          <BlockquoteContent>
            This quote will be in '{variant}' variant.
          </BlockquoteContent>
        </Blockquote>
      ))}
    </Flex>
  ),
};

export const Thicknesses: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {THICKNESSES.map((thickness) => (
        <Blockquote key={thickness} color="primary">
          <BlockquoteRail thickness={thickness} />
          <BlockquoteContent>
            This quote will be in '{thickness}' thickness.
          </BlockquoteContent>
        </Blockquote>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {SIZES.map((size) => (
        <Blockquote key={size}>
          <BlockquoteContent size={size}>
            This quote will be in '{size}' size.
          </BlockquoteContent>
        </Blockquote>
      ))}
    </Flex>
  ),
};

export const WithCaption: Story = {
  render: () => (
    <Blockquote>
      <BlockquoteContent>{quote}</BlockquoteContent>
      <BlockquoteCaption>Uzumaki Naruto</BlockquoteCaption>
    </Blockquote>
  ),
};

export const WithRail: Story = {
  render: () => (
    <Blockquote color="primary">
      <BlockquoteRail />
      <BlockquoteContent>{quote}</BlockquoteContent>
    </Blockquote>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Blockquote color="primary">
      <BlockquoteIcon>
        <QuoteIcon width="1.5em" height="1.5em" />
      </BlockquoteIcon>
      <BlockquoteContent>{quote}</BlockquoteContent>
    </Blockquote>
  ),
};
