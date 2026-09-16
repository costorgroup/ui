import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Flex } from '../../../index';
import type { TPaletteColor } from '../../../theme/types';
import {
  Tabs,
  Tab,
  Text,
} from '../../index';

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

const meta: Meta<typeof Tabs> = {
  title: 'V3/Data Display/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: {
    appearance: 'opaque',
    orientation: 'horizontal',
    variant: 'subtle',
    fullWidth: true,
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    appearance: {
      control: 'select',
      options: ['opaque', 'transparent'],
    },
    variant: {
      control: 'select',
      options: ['subtle', 'surface', 'plain'],
    },
    fullWidth: { control: 'boolean' },
    color: { control: 'select', options: COLORS },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Horizontal: Story = {
  render: function HorizontalStory(args) {
    const [value, setValue] = useState('overview');

    return (
      <Flex direction="column" gap="md" style={{ width: 360 }}>
        <Tabs {...args} value={value} onChange={setValue}>
          <Tab value="overview">Overview</Tab>
          <Tab value="details">Details</Tab>
          <Tab value="billing">Billing</Tab>
          <Tab value="members">Members</Tab>
          <Tab value="integrations">Integrations</Tab>
          <Tab value="notifications">Notifications</Tab>
          <Tab value="security">Security</Tab>
          <Tab value="audit">Audit log</Tab>
        </Tabs>
        <Text size="sm">Selected: {value}</Text>
      </Flex>
    );
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: function VerticalStory(args) {
    const [value, setValue] = useState('overview');

    return (
      <Flex gap="lg" align="flex-start">
        <Tabs
          {...args}
          value={value}
          onChange={setValue}
          style={{ width: 160 }}
        >
          <Tab value="overview">Overview</Tab>
          <Tab value="details">Details</Tab>
          <Tab value="settings">Settings</Tab>
        </Tabs>
        <Text size="sm">Panel: {value}</Text>
      </Flex>
    );
  },
};

export const Compact: Story = {
  args: {
    fullWidth: false,
  },
  render: function CompactStory(args) {
    const [value, setValue] = useState('a');

    return (
      <Tabs {...args} value={value} onChange={setValue}>
        <Tab value="a">Day</Tab>
        <Tab value="b">Week</Tab>
        <Tab value="c">Month</Tab>
      </Tabs>
    );
  },
};

export const Transparent: Story = {
  args: {
    appearance: 'transparent',
  },
  render: function TransparentStory(args) {
    const [value, setValue] = useState('general');

    return (
      <Tabs {...args} value={value} onChange={setValue}>
        <Tab value="general">General</Tab>
        <Tab value="privacy">Privacy</Tab>
        <Tab value="advanced">Advanced</Tab>
      </Tabs>
    );
  },
};

export const Colored: Story = {
  args: {
    color: 'info',
  },
  render: function ColoredStory(args) {
    const [value, setValue] = useState('one');

    return (
      <Tabs {...args} value={value} onChange={setValue} style={{ width: 360 }}>
        <Tab value="one">Overview</Tab>
        <Tab value="two">Details</Tab>
        <Tab value="three">Billing</Tab>
      </Tabs>
    );
  },
};

export const Surface: Story = {
  args: {
    variant: 'surface',
  },
  render: function SurfaceStory(args) {
    const [value, setValue] = useState('overview');

    return (
      <Tabs {...args} value={value} onChange={setValue} style={{ width: 360 }}>
        <Tab value="overview">Overview</Tab>
        <Tab value="details">Details</Tab>
        <Tab value="billing">Billing</Tab>
      </Tabs>
    );
  },
};

export const Plain: Story = {
  args: {
    variant: 'plain',
    fullWidth: false,
    draggable: false,
  },
  render: function PlainStory(args) {
    const [value, setValue] = useState('smileys');

    return (
      <div style={{ width: 220 }}>
        <Tabs {...args} value={value} onChange={setValue}>
          <Tab value="smileys">😀</Tab>
          <Tab value="people">👋</Tab>
          <Tab value="animals">🐻</Tab>
          <Tab value="food">🍔</Tab>
          <Tab value="travel">✈️</Tab>
          <Tab value="activities">⚽</Tab>
          <Tab value="objects">💡</Tab>
          <Tab value="symbols">💜</Tab>
          <Tab value="flags">🏳️</Tab>
        </Tabs>
      </div>
    );
  },
};

export const Uncontrolled: Story = {
  render: (args) => (
    <Tabs {...args} defaultValue="first" style={{ width: 320 }}>
      <Tab value="first">First</Tab>
      <Tab value="second">Second</Tab>
      <Tab value="third">Third</Tab>
    </Tabs>
  ),
};
