import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import {
  ContextMenu,
  Flex,
  Menu,
  MenuGroup,
  MenuItem,
  Text,
} from '../../index';
import type { TMenuAnchorPosition } from './types';

const meta: Meta<typeof ContextMenu> = {
  title: 'Overlays/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {
  render: function DefaultStory() {
    const [anchorPosition, setAnchorPosition] =
      useState<TMenuAnchorPosition | null>(null);
    const open = anchorPosition != null;

    const handleClose = () => setAnchorPosition(null);

    return (
      <Flex justify="center" align="center" style={{ minHeight: 240 }}>
        <Flex
          align="center"
          justify="center"
          style={{
            width: 320,
            height: 160,
            borderRadius: 8,
            border: '1px dashed currentColor',
          }}
          onContextMenu={(event) => {
            event.preventDefault();
            setAnchorPosition({ top: event.clientY, left: event.clientX });
          }}
        >
          <Text size="sm">Right-click here</Text>
        </Flex>
        <ContextMenu
          open={open}
          anchorPosition={anchorPosition}
          onClose={handleClose}
        >
          <MenuGroup>
            <MenuItem onClick={handleClose}>Cut</MenuItem>
            <MenuItem onClick={handleClose}>Copy</MenuItem>
            <MenuItem onClick={handleClose}>Paste</MenuItem>
          </MenuGroup>
          <MenuGroup>
            <MenuItem>
              Share
              <Menu>
                <MenuItem onClick={handleClose}>Copy link</MenuItem>
                <MenuItem onClick={handleClose}>Email</MenuItem>
              </Menu>
            </MenuItem>
            <MenuItem color="error" onClick={handleClose}>
              Delete
            </MenuItem>
          </MenuGroup>
        </ContextMenu>
      </Flex>
    );
  },
};
