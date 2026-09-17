import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Flex, Heading, Text, TextField } from '../..';
import { Editable } from './';

const meta: Meta<typeof Editable> = {
  title: 'Utilities/Editable',
  component: Editable,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['click', 'double-click'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Editable>;

export const Click: Story = {
  args: {
    mode: 'click',
  },
  render: function ClickStory(args) {
    const [value, setValue] = useState('Product name');

    return (
      <Flex direction="column" gap="sm" style={{ maxWidth: 360 }}>
        <Text size="sm">Click the heading to edit</Text>
        <Editable
          {...args}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          render={({ editable, handlers, value, onChange }) =>
            editable ? (
              <TextField value={value} onChange={onChange} autoFocus aria-label="Product name" />
            ) : (
              <Heading as="h3" {...handlers}>
                {value}
              </Heading>
            )
          }
        />
      </Flex>
    );
  },
};

export const DoubleClick: Story = {
  args: {
    mode: 'double-click',
  },
  render: function DoubleClickStory(args) {
    return (
      <Flex direction="column" gap="sm" style={{ maxWidth: 360 }}>
        <Text size="sm">Double-click the heading to edit</Text>
        <Editable
          {...args}
          defaultValue="Double-click to rename"
          render={({ editable, handlers, value, onChange }) =>
            editable ? (
              <TextField value={value} onChange={onChange} aria-label="Title" />
            ) : (
              <Heading as="h3" {...handlers}>
                {value}
              </Heading>
            )
          }
        />
      </Flex>
    );
  },
};

export const UncontrolledValue: Story = {
  render: () => (
    <Flex direction="column" gap="sm" style={{ maxWidth: 360 }}>
      <Text size="sm">Editable manages its own value when uncontrolled</Text>
      <Editable
        defaultValue="Click to rename"
        render={({ editable, handlers, value, onChange }) =>
          editable ? (
            <TextField value={value} onChange={onChange} aria-label="Name" />
          ) : (
            <div {...handlers}>{value}</div>
          )
        }
      />
    </Flex>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Editable
      {...args}
      defaultValue="Not editable"
      render={({ editable, handlers, value, onChange }) =>
        editable ? (
          <TextField value={value} onChange={onChange} aria-label="Name" />
        ) : (
          <Heading as="h3" {...handlers}>
            {value}
          </Heading>
        )
      }
    />
  ),
};
