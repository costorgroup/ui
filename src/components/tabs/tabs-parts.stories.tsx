import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { CheckIcon, Tab } from '../../index';
import { TabsBase } from './tabs-base';

const meta: Meta<typeof TabsBase> = {
  title: 'Components/Tabs/Parts',
  component: TabsBase,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TabsBase>;

export const Default: Story = {
  args: {
    color: 'primary',
    variant: 'line',
    size: 'md',
  },
  render: function DefaultStory(args) {
    const [active, setActive] = useState('one');

    return (
      <TabsBase {...args} style={{ width: 420 }}>
        <Tab active={active === 'one'} icon={<CheckIcon />} onClick={() => setActive('one')}>
          One
        </Tab>
        <Tab active={active === 'two'} onClick={() => setActive('two')}>
          Two
        </Tab>
        <Tab active={active === 'three'} onClick={() => setActive('three')}>
          Three
        </Tab>
      </TabsBase>
    );
  },
};
