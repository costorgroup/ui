import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Editable, Flex, Heading, Text, TextField } from '../../index';

const meta: Meta<typeof Editable> = {
  title: 'Utilities/Editable',
  component: Editable,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['click', 'doubleclick'],
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
          render={(editable) =>
            editable ? (
              <TextField
                value={value}
                onChange={(event) => setValue(event.target.value)}
                aria-label="Product name"
              />
            ) : (
              <Heading as="h3">{value}</Heading>
            )
          }
        />
      </Flex>
    );
  },
};

export const DoubleClick: Story = {
  args: {
    mode: 'doubleclick',
  },
  render: function DoubleClickStory(args) {
    const [value, setValue] = useState('Double-click to rename');

    return (
      <Flex direction="column" gap="sm" style={{ maxWidth: 360 }}>
        <Text size="sm">Double-click the heading to edit</Text>
        <Editable
          {...args}
          render={(editable) =>
            editable ? (
              <TextField
                value={value}
                onChange={(event) => setValue(event.target.value)}
                aria-label="Title"
              />
            ) : (
              <Heading as="h3">{value}</Heading>
            )
          }
        />
      </Flex>
    );
  },
};
