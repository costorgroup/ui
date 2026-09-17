import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Button, ClickAwayListener, Text, Flex } from '../..';
import { useTheme } from '../../hooks/use-theme';

const meta: Meta<typeof ClickAwayListener> = {
  title: 'Utilities/ClickAwayListener',
  component: ClickAwayListener,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ClickAwayListener>;

export const Default: Story = {
  render: function DefaultStory() {
    const theme = useTheme();
    const [inside, setInside] = useState(true);

    return (
      <Flex direction="column" gap="md">
        <ClickAwayListener onClickAway={() => setInside(false)}>
          <div
            style={{
              display: 'inline-flex',
              padding: 16,
              borderRadius: 8,
              background: inside
                ? theme.palette.primary.light
                : theme.surfaces.background,
              border: `1px solid ${theme.surfaces.border}`,
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
