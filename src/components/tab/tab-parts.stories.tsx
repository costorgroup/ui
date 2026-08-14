import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { CheckIcon, Tabs } from '../../index';
import { TabBase } from './tab-base';
import { TabIcon } from './tab-icon';
import { TabLabel } from './tab-label';

const meta: Meta<typeof TabBase> = {
  title: 'Components/Tab/Parts',
  component: TabBase,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TabBase>;

export const Default: Story = {
  render: function DefaultStory() {
    const [active, setActive] = useState('one');

    return (
      <Tabs color="primary" variant="line" size="md" style={{ width: 420 }}>
        <TabBase active={active === 'one'} onClick={() => setActive('one')}>
          <TabIcon>
            <CheckIcon />
          </TabIcon>
          <TabLabel>One</TabLabel>
        </TabBase>
        <TabBase active={active === 'two'} onClick={() => setActive('two')}>
          <TabLabel>Two</TabLabel>
        </TabBase>
        <TabBase active={active === 'three'} onClick={() => setActive('three')}>
          <TabLabel>Three</TabLabel>
        </TabBase>
      </Tabs>
    );
  },
};
