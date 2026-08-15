import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Button, ClickAwayListener, Flex, Text } from '../../index';

const meta: Meta<typeof ClickAwayListener> = {
  title: 'Utilities/ClickAwayListener',
  component: ClickAwayListener,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ClickAwayListener>;

export const Default: Story = {
  render: function DefaultStory() {
    const [inside, setInside] = useState(true);

    return (
      <Flex direction="column" gap="md">
        <ClickAwayListener onClickAway={() => setInside(false)}>
          <div
            style={{
              display: 'inline-flex',
              padding: 16,
              borderRadius: 8,
              background: inside ? '#e8f4ff' : '#f3f3f3',
            }}
          >
            <Button onClick={() => setInside(true)}>Inside</Button>
          </div>
        </ClickAwayListener>
        <Text size="sm">
          {inside ? 'Last click was inside' : 'Clicked away'}
        </Text>
      </Flex>
    );
  },
};
