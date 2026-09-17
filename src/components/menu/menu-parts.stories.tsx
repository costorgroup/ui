import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useRef, useState } from 'react';
import { Button, Menu, MenuGroup, MenuItem } from '../..';
import { MenuBase } from './menu-base';

const meta: Meta<typeof MenuBase> = {
  title: 'Overlays/Menu/Parts',
  component: MenuBase,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MenuBase>;

export const WithRecipe: Story = {
  render: function WithRecipeStory() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    return (
      <>
        <Button ref={anchorRef} onClick={() => setOpen((value) => !value)}>
          Open menu
        </Button>
        <Menu
          open={open}
          anchorEl={anchorRef.current}
          onClose={() => setOpen(false)}
        >
          <MenuGroup>
            <MenuItem onClick={() => setOpen(false)}>Profile</MenuItem>
            <MenuItem onClick={() => setOpen(false)}>Settings</MenuItem>
          </MenuGroup>
          <MenuGroup>
            <MenuItem color="error" onClick={() => setOpen(false)}>
              Log out
            </MenuItem>
          </MenuGroup>
        </Menu>
      </>
    );
  },
};
