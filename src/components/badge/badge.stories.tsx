import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Flex,
  IconButton,
  Text,
} from '../../index';
import { CheckIcon } from '../../icons';
import type { TPaletteColor } from '../../theme/types';
import type { TBadgeVariant } from './types';

const COLORS: TPaletteColor[] = [
  'default',
  'primary',
  'secondary',
  'success',
  'error',
  'warning',
  'info',
  'dark',
  'light',
];

const VARIANTS: TBadgeVariant[] = [
  'solid',
  'subtle',
  'surface',
  'outline',
  'ghost',
  'plain',
];

const meta: Meta<typeof Badge> = {
  title: 'Data Display/Badge',
  component: Badge,
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
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    overlap: {
      control: 'inline-radio',
      options: ['rectangular', 'circular'],
    },
    invisible: {
      control: 'boolean',
    },
    showZero: {
      control: 'boolean',
    },
    max: {
      control: 'number',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    badgeContent: 4,
    color: 'primary',
    variant: 'solid',
    size: 'md',
  },
  render: (args) => (
    <Badge {...args}>
      <IconButton aria-label="Notifications" variant="outline">
        <CheckIcon />
      </IconButton>
    </Badge>
  ),
};

export const Dot: Story = {
  args: {
    color: 'error',
    variant: 'solid',
  },
  render: (args) => (
    <Badge {...args}>
      <IconButton aria-label="Unread" variant="outline">
        <CheckIcon />
      </IconButton>
    </Badge>
  ),
};

export const Variants: Story = {
  render: () => (
    <Flex gap="md" wrap="wrap" align="center">
      {VARIANTS.map((variant) => (
        <Badge key={variant} badgeContent={3} variant={variant} color="primary">
          <Button size="sm" variant="outline">
            {variant}
          </Button>
        </Badge>
      ))}
    </Flex>
  ),
};

export const Colors: Story = {
  render: () => (
    <Flex gap="md" wrap="wrap" align="center">
      {COLORS.map((color) => (
        <Badge key={color} badgeContent={2} color={color}>
          <Button size="sm" variant="outline" color={color}>
            {color}
          </Button>
        </Badge>
      ))}
    </Flex>
  ),
};

export const Max: Story = {
  render: () => (
    <Flex gap="lg" align="center">
      <Badge badgeContent={99} color="secondary">
        <IconButton aria-label="99" variant="outline">
          <CheckIcon />
        </IconButton>
      </Badge>
      <Badge badgeContent={100} color="secondary">
        <IconButton aria-label="100" variant="outline">
          <CheckIcon />
        </IconButton>
      </Badge>
      <Badge badgeContent={1000} max={999} color="secondary">
        <IconButton aria-label="1000" variant="outline">
          <CheckIcon />
        </IconButton>
      </Badge>
    </Flex>
  ),
};

export const ShowZero: Story = {
  render: () => (
    <Flex gap="lg" align="center">
      <Badge badgeContent={0} color="secondary">
        <IconButton aria-label="Hidden zero" variant="outline">
          <CheckIcon />
        </IconButton>
      </Badge>
      <Badge badgeContent={0} showZero color="secondary">
        <IconButton aria-label="Visible zero" variant="outline">
          <CheckIcon />
        </IconButton>
      </Badge>
    </Flex>
  ),
};

export const Overlap: Story = {
  render: () => (
    <Flex gap="lg" align="center">
      <Badge badgeContent={1} color="error" overlap="rectangular">
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 6,
            background: 'currentColor',
            opacity: 0.15,
          }}
        />
      </Badge>
      <Badge badgeContent={1} color="error" overlap="circular">
        <Avatar name="Ada Lovelace" size="md" />
      </Badge>
      <Badge color="success" overlap="circular">
        <Avatar name="Grace Hopper" size="md" />
      </Badge>
    </Flex>
  ),
};

export const AnchorOrigin: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      <Text size="sm">Corners</Text>
      <Flex gap="lg" wrap="wrap" align="center">
        {(
          [
            { vertical: 'top', horizontal: 'right' },
            { vertical: 'top', horizontal: 'left' },
            { vertical: 'bottom', horizontal: 'right' },
            { vertical: 'bottom', horizontal: 'left' },
          ] as const
        ).map((origin) => (
          <Badge
            key={`${origin.vertical}-${origin.horizontal}`}
            badgeContent={4}
            color="secondary"
            anchorOrigin={origin}
          >
            <IconButton aria-label={origin.vertical} variant="outline">
              <CheckIcon />
            </IconButton>
          </Badge>
        ))}
      </Flex>
    </Flex>
  ),
};

export const InvisibleToggle: Story = {
  render: function InvisibleToggleStory() {
    const [invisible, setInvisible] = useState(false);

    return (
      <Flex gap="md" align="center">
        <Badge badgeContent={4} color="secondary" invisible={invisible}>
          <IconButton aria-label="Toggle badge" variant="outline">
            <CheckIcon />
          </IconButton>
        </Badge>
        <Button size="sm" variant="outline" onClick={() => setInvisible((v) => !v)}>
          {invisible ? 'Show' : 'Hide'}
        </Button>
      </Flex>
    );
  },
};
