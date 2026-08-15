import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { CheckIcon, Flex, Rating, Text } from '../../index';

const COLORS = [
  'default',
  'primary',
  'secondary',
  'success',
  'error',
  'warning',
  'info',
  'dark',
  'light',
] as const;

const VARIANTS = [
  'solid',
  'subtle',
  'surface',
  'outline',
  'ghost',
  'plain',
] as const;

const labels: Record<number, string> = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const meta: Meta<typeof Rating> = {
  title: 'Forms & Inputs/Rating',
  component: Rating,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: [...COLORS],
    },
    variant: {
      control: 'select',
      options: [...VARIANTS],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    precision: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    readOnly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    highlightSelectedOnly: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  args: {
    defaultValue: 3,
    color: 'warning',
    variant: 'solid',
    size: 'md',
  },
};

export const Precision: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      <Rating defaultValue={2.5} precision={0.5} />
      <Rating defaultValue={2.5} precision={0.5} readOnly />
    </Flex>
  ),
};

export const HoverFeedback: Story = {
  render: function HoverFeedbackStory() {
    const [value, setValue] = useState<number | null>(2);
    const [hover, setHover] = useState(-1);

    return (
      <Flex align="center" gap="sm">
        <Rating
          value={value}
          precision={0.5}
          onChange={(_, next) => setValue(next)}
          onChangeActive={(_, next) => setHover(next)}
        />
        <Text size="sm">
          {labels[hover !== -1 ? hover : (value ?? 0)] ?? 'Empty'}
        </Text>
      </Flex>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      <Rating defaultValue={2} size="sm" />
      <Rating defaultValue={2} size="md" />
      <Rating defaultValue={2} size="lg" />
    </Flex>
  ),
};

export const ReadOnly: Story = {
  args: {
    value: 4,
    readOnly: true,
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: 3,
    disabled: true,
  },
};

export const CustomIcon: Story = {
  render: () => (
    <Rating
      defaultValue={2}
      precision={0.5}
      color="error"
      icon={<CheckIcon />}
      emptyIcon={<CheckIcon />}
      getLabelText={(value) => `${value} Check${value !== 1 ? 's' : ''}`}
    />
  ),
};

export const TenStars: Story = {
  args: {
    defaultValue: 2,
    max: 10,
  },
};

export const HighlightSelectedOnly: Story = {
  args: {
    defaultValue: 2,
    highlightSelectedOnly: true,
  },
};
