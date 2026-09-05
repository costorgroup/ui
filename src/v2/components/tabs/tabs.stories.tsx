import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { ReactNode, useState } from 'react';
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
];

const TabsBackdrop = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      padding: 32,
      borderRadius: 12,
      background:
        'linear-gradient(135deg, rgba(0, 18, 61, 0.72) 0%, rgba(0, 14, 46, 0.85) 100%)',
    }}
  >
    {children}
  </div>
);

const meta: Meta<typeof Tabs> = {
  title: 'V2/Data Display/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: {
    appearance: 'solid',
    orientation: 'horizontal',
    fullWidth: true,
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    appearance: {
      control: 'select',
      options: ['solid', 'transparent'],
    },
    fullWidth: { control: 'boolean' },
    color: { control: 'select', options: COLORS },
  },
  decorators: [
    (Story) => (
      <TabsBackdrop>
        <Story />
      </TabsBackdrop>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Horizontal: Story = {
  render: function HorizontalStory(args) {
    const [value, setValue] = useState('one');

    return (
      <Flex direction="column" gap="md" style={{ width: 360 }}>
        <Tabs {...args} value={value} onChange={setValue}>
          <Tab value="one">Tab</Tab>
          <Tab value="two">Tab</Tab>
          <Tab value="three">Tab</Tab>
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

export const Uncontrolled: Story = {
  render: (args) => (
    <Tabs {...args} defaultValue="first" style={{ width: 320 }}>
      <Tab value="first">First</Tab>
      <Tab value="second">Second</Tab>
      <Tab value="third">Third</Tab>
    </Tabs>
  ),
};
