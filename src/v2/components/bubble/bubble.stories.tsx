import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Flex } from '../../../index';
import { EmojiAddIcon } from '../../../icons';
import type { TPaletteColor } from '../../../theme/types';
import { IconButton, InputEmojiField, Text } from '../../index';
import {
  Bubble,
  BubbleAction,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from './index';
import type { TBubbleVariant } from './types';

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

const VARIANTS: TBubbleVariant[] = [
  'solid',
  'subtle',
  'surface',
  'outline',
  'ghost',
  'plain',
];

const meta: Meta<typeof Bubble> = {
  title: 'V3/Data Display/Bubble',
  component: Bubble,
  tags: ['autodocs'],
  args: {
    color: 'primary',
    variant: 'solid',
    align: 'start',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: 480 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    color: { control: 'select', options: COLORS },
    variant: { control: 'select', options: VARIANTS },
    align: { control: 'select', options: ['start', 'end'] },
  },
};

export default meta;

type Story = StoryObj<typeof Bubble>;

export const Default: Story = {
  args: {
    color: 'primary',
    variant: 'solid',
    align: 'start',
  },
  render: (args) => (
    <Bubble {...args}>
      <BubbleContent>Hey there! What&apos;s up?</BubbleContent>
    </Bubble>
  ),
};

export const Variants: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {VARIANTS.map((variant) => (
        <Flex key={variant} direction="column" gap="xs">
          <Text size="sm">{variant}</Text>
          <Bubble color="primary" variant={variant}>
            <BubbleContent>This is the {variant} bubble.</BubbleContent>
          </Bubble>
        </Flex>
      ))}
    </Flex>
  ),
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="sm">
      {COLORS.map((color) => (
        <Bubble key={color} color={color} variant="solid">
          <BubbleContent>{color}</BubbleContent>
        </Bubble>
      ))}
    </Flex>
  ),
};

export const Ghost: Story = {
  render: () => (
    <Flex direction="column" gap="sm">
      {COLORS.map((color) => (
        <Bubble key={color} color={color} variant="ghost">
          <BubbleContent as="button" type="button">
            {color} ghost — hover / focus
          </BubbleContent>
        </Bubble>
      ))}
    </Flex>
  ),
};

export const Alignment: Story = {
  render: () => (
    <Flex direction="column" gap="sm" style={{ width: '100%' }}>
      <Bubble align="start" color="default" variant="subtle">
        <BubbleContent>Start — assistant / incoming.</BubbleContent>
      </Bubble>
      <Bubble align="end" color="primary" variant="solid">
        <BubbleContent>End — you / outgoing.</BubbleContent>
      </Bubble>
    </Flex>
  ),
};

export const Grouped: Story = {
  render: () => (
    <Flex direction="column" gap="lg" style={{ width: '100%' }}>
      <BubbleGroup>
        <Bubble align="start" color="default" variant="subtle">
          <BubbleContent>Can you tell me what&apos;s the issue?</BubbleContent>
        </Bubble>
        <Bubble align="start" color="default" variant="subtle">
          <BubbleContent>It worked yesterday.</BubbleContent>
        </Bubble>
        <Bubble align="start" color="default" variant="subtle">
          <BubbleContent>Find the bug and fix it.</BubbleContent>
        </Bubble>
      </BubbleGroup>
      <BubbleGroup>
        <Bubble align="end" color="primary" variant="solid">
          <BubbleContent>You tell me!</BubbleContent>
        </Bubble>
        <Bubble align="end" color="primary" variant="solid">
          <BubbleContent>Want me to diff yesterday against today?</BubbleContent>
        </Bubble>
      </BubbleGroup>
    </Flex>
  ),
};

export const Reactions: Story = {
  render: function ReactionsStory() {
    const [incoming, setIncoming] = useState(['👍', '😮']);
    const [outgoing, setOutgoing] = useState(['🎉', '👏']);

    const add = (list: string[], emoji: string) =>
      list.includes(emoji) ? list : [...list, emoji];

    return (
      <Flex direction="column" gap="xl" style={{ width: '100%', paddingTop: 16 }}>
        <Bubble align="start" color="default" variant="subtle">
          <BubbleContent>I don&apos;t need tests, I know my code works.</BubbleContent>
          <BubbleAction>
            <InputEmojiField
              trigger={
                <IconButton
                  type="button"
                  variant="plain"
                  size="md"
                  aria-label="Add reaction"
                >
                  <EmojiAddIcon />
                </IconButton>
              }
              onChange={(emoji) => setIncoming((list) => add(list, emoji))}
            />
          </BubbleAction>
          <BubbleReactions role="img" aria-label="Reactions">
            {incoming.map((emoji) => (
              <span key={emoji}>{emoji}</span>
            ))}
          </BubbleReactions>
        </Bubble>
        <Bubble align="end" color="primary" variant="solid">
          <BubbleContent>Tests passed on the first try.</BubbleContent>
          <BubbleAction>
            <InputEmojiField
              trigger={
                <IconButton
                  type="button"
                  variant="plain"
                  size="md"
                  aria-label="Add reaction"
                >
                  <EmojiAddIcon />
                </IconButton>
              }
              onChange={(emoji) => setOutgoing((list) => add(list, emoji))}
            />
          </BubbleAction>
          <BubbleReactions role="img" aria-label="Reactions">
            {outgoing.map((emoji) => (
              <span key={emoji}>{emoji}</span>
            ))}
          </BubbleReactions>
        </Bubble>
      </Flex>
    );
  },
};

export const Conversation: Story = {
  render: () => (
    <Flex direction="column" gap="md" style={{ width: '100%', maxWidth: 480 }}>
      <Bubble align="start" color="default" variant="subtle">
        <BubbleContent>Hey! Want to see chat bubbles?</BubbleContent>
      </Bubble>
      <Bubble align="end" color="primary" variant="solid">
        <BubbleContent>Sure. Hit me with your best demo.</BubbleContent>
      </Bubble>
      <BubbleGroup>
        <Bubble align="start" color="default" variant="subtle">
          <BubbleContent>
            I can group messages, switch sides, and keep the thread easy to scan.
          </BubbleContent>
        </Bubble>
        <Bubble align="start" color="default" variant="subtle">
          <BubbleContent>Very meta. Very on-brand.</BubbleContent>
          <BubbleReactions role="img" aria-label="Reactions: thumbs up, fire">
            <span>👍</span>
            <span>🔥</span>
            <span>+2</span>
          </BubbleReactions>
        </Bubble>
      </BubbleGroup>
    </Flex>
  ),
};

export const AsButton: Story = {
  render: () => (
    <Flex direction="column" gap="sm" style={{ width: '100%', maxWidth: 360 }}>
      <Bubble align="start" color="default" variant="ghost">
        <BubbleContent>How can I help you today?</BubbleContent>
      </Bubble>
      {['I forgot my password', 'Help with my subscription', 'Talk to a human'].map(
        (label) => (
          <Bubble key={label} align="end" color="default" variant="subtle">
            <BubbleContent as="button" type="button">
              {label}
            </BubbleContent>
          </Bubble>
        ),
      )}
    </Flex>
  ),
};
