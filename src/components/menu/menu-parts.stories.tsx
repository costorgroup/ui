import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef, useState } from 'react';
import { Button, Menu } from '../../index';
import { MenuBase } from './menu-base';
import { MenuItem } from './menu-item';
import { MenuGroup } from './menu-group';

const meta: Meta<typeof MenuBase> = {
  title: 'Components/Menu/Parts',
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
        <Button ref={anchorRef} onClick={() => setOpen((v) => !v)}>
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
