import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { CheckIcon, Tab, Tabs } from '../../index';

const meta: Meta<typeof Tab> = {
  title: 'Data Display/Tab',
  component: Tab,
  tags: ['autodocs'],
  argTypes: {
    active: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Tab>;

export const Default: Story = {
  render: (args) => {
    const [active, setActive] = useState('one');

    return (
      <Tabs color="primary" variant="line" size="md">
        <Tab
          {...args}
          icon={<CheckIcon />}
          active={active === 'one'}
          onClick={() => setActive('one')}
        >
          {args.children ?? 'Overview'}
        </Tab>
        <Tab active={active === 'two'} onClick={() => setActive('two')}>
          Details
        </Tab>
        <Tab active={active === 'three'} onClick={() => setActive('three')}>
          Settings
        </Tab>
      </Tabs>
    );
  },
  args: {
    children: 'Overview',
    active: true,
  },
};

export const WithIcon: Story = {
  render: () => (
    <Tabs color="primary" variant="subtle" size="md">
      <Tab icon={<CheckIcon />} active>
        Overview
      </Tab>
      <Tab>Details</Tab>
    </Tabs>
  ),
};

export const LabelOnly: Story = {
  render: () => (
    <Tabs color="secondary" variant="outline" size="md">
      <Tab active>Overview</Tab>
      <Tab>Details</Tab>
      <Tab>Settings</Tab>
    </Tabs>
  ),
};
