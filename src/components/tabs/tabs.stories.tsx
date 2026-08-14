import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { CheckIcon, Tab, Tabs } from '../../index';

const meta: Meta<typeof Tabs> = {
  title: 'Data Display/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['line', 'subtle', 'enclosed', 'outline', 'plain'],
    },
    anchor: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
    },
    textAlign: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'success',
        'error',
        'warning',
        'info',
        'dark',
        'light',
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

const TabsDemo = ({
  variant = 'line',
  anchor = 'bottom',
  justify = 'stretch',
  textAlign = 'center',
  color = 'primary',
  size = 'md',
}: {
  variant?: 'line' | 'subtle' | 'enclosed' | 'outline' | 'plain';
  anchor?: 'top' | 'bottom' | 'left' | 'right';
  justify?: 'start' | 'center' | 'end' | 'stretch';
  textAlign?: 'start' | 'center' | 'end';
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
    | 'default'
    | 'dark'
    | 'light';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}) => {
  const [active, setActive] = useState('one');

  return (
    <div style={{ width: anchor === 'left' || anchor === 'right' ? 200 : 420 }}>
      <Tabs
        variant={variant}
        anchor={anchor}
        justify={justify}
        textAlign={textAlign}
        color={color}
        size={size}
      >
        <Tab
          icon={<CheckIcon />}
          active={active === 'one'}
          onClick={() => setActive('one')}
        >
          Overview
        </Tab>
        <Tab active={active === 'two'} onClick={() => setActive('two')}>
          Details
        </Tab>
        <Tab active={active === 'three'} onClick={() => setActive('three')}>
          Settings
        </Tab>
      </Tabs>
    </div>
  );
};

export const Line: Story = {
  render: (args) => (
    <TabsDemo
      variant={args.variant}
      anchor={args.anchor}
      justify={args.justify}
      textAlign={args.textAlign}
      color={args.color}
      size={args.size}
    />
  ),
  args: {
    variant: 'line',
    anchor: 'bottom',
    justify: 'stretch',
    textAlign: 'center',
    color: 'primary',
    size: 'md',
  },
};

export const Subtle: Story = {
  render: () => <TabsDemo variant="subtle" />,
};

export const Enclosed: Story = {
  render: () => <TabsDemo variant="enclosed" />,
};

export const Outline: Story = {
  render: () => <TabsDemo variant="outline" />,
};

export const Plain: Story = {
  render: () => <TabsDemo variant="plain" />,
};

export const Vertical: Story = {
  render: () => <TabsDemo variant="line" anchor="left" />,
};

export const Stretch: Story = {
  render: () => <TabsDemo variant="line" justify="stretch" />,
};
