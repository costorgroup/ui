import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Flex } from '../../../index';
import { Button, Menu, MenuGroup, MenuItem, Text, useMenu } from '../../index';
import type { TMenuPlacement } from './context';

const PLACEMENTS: TMenuPlacement[] = [
  'top-start',
  'top',
  'top-end',
  'bottom-start',
  'bottom',
  'bottom-end',
  'left-start',
  'left',
  'left-end',
  'right-start',
  'right',
  'right-end',
];

const meta: Meta<typeof Menu> = {
  title: 'V3/Overlays/Menu',
  component: Menu,
  tags: ['autodocs'],
  argTypes: {
    placement: { control: 'select', options: PLACEMENTS },
    offset: { control: 'number' },
    open: { control: 'boolean' },
  },
  args: {
    placement: 'bottom-start',
    offset: 4,
  },
};

export default meta;

type Story = StoryObj<typeof Menu>;

const MenuDemo = ({
  placement = 'bottom-start',
  offset = 4,
}: {
  placement?: TMenuPlacement;
  offset?: number;
}) => {
  const menu = useMenu({ placement, offset });

  return (
    <>
      <Button {...menu.triggerProps}>Open menu</Button>
      <Menu {...menu.menuProps}>
        <MenuGroup>
          <MenuItem onClick={menu.close}>Edit</MenuItem>
          <MenuItem onClick={menu.close}>Duplicate</MenuItem>
          <MenuItem>
            Share
            <Menu>
              <MenuItem onClick={menu.close}>Copy link</MenuItem>
              <MenuItem onClick={menu.close}>Email</MenuItem>
              <MenuItem>
                Social
                <Menu>
                  <MenuItem onClick={menu.close}>Twitter</MenuItem>
                  <MenuItem onClick={menu.close}>LinkedIn</MenuItem>
                </Menu>
              </MenuItem>
            </Menu>
          </MenuItem>
        </MenuGroup>
        <MenuGroup>
          <MenuItem color="error" onClick={menu.close}>
            Delete
          </MenuItem>
        </MenuGroup>
      </Menu>
    </>
  );
};

export const Playground: Story = {
  tags: ['!dev'],
  render: (args) => (
    <MenuDemo placement={args.placement} offset={args.offset} />
  ),
};

export const Default: Story = {
  render: (args) => (
    <MenuDemo placement={args.placement} offset={args.offset} />
  ),
};

export const Context: Story = {
  render: function ContextStory() {
    const menu = useMenu({ trigger: 'context' });

    return (
      <Flex
        align="center"
        justify="center"
        style={{
          width: 320,
          height: 160,
          borderRadius: 12,
          border: '1px dashed currentColor',
        }}
        {...menu.triggerProps}
      >
        <Text size="sm">Right-click here</Text>
        <Menu {...menu.menuProps}>
          <MenuGroup>
            <MenuItem onClick={menu.close}>Cut</MenuItem>
            <MenuItem onClick={menu.close}>Copy</MenuItem>
            <MenuItem onClick={menu.close}>Paste</MenuItem>
          </MenuGroup>
          <MenuGroup>
            <MenuItem>
              Share
              <Menu>
                <MenuItem onClick={menu.close}>Copy link</MenuItem>
                <MenuItem onClick={menu.close}>Email</MenuItem>
              </Menu>
            </MenuItem>
            <MenuItem color="error" onClick={menu.close}>
              Delete
            </MenuItem>
          </MenuGroup>
        </Menu>
      </Flex>
    );
  },
};

export const Hover: Story = {
  render: function HoverStory() {
    const menu = useMenu({ trigger: 'hover', placement: 'bottom' });

    return (
      <>
        <Button variant="outline" {...menu.triggerProps}>
          Hover me
        </Button>
        <Menu {...menu.menuProps}>
          <MenuItem onClick={menu.close}>Profile</MenuItem>
          <MenuItem onClick={menu.close}>Settings</MenuItem>
          <MenuItem color="error" onClick={menu.close}>
            Log out
          </MenuItem>
        </Menu>
      </>
    );
  },
};

export const Placements: Story = {
  render: function PlacementsStory() {
    const [placement, setPlacement] = useState<TMenuPlacement>('bottom-start');
    const menu = useMenu({ placement });

    return (
      <Flex gap="md" wrap="wrap" justify="center" style={{ padding: 48 }}>
        {PLACEMENTS.map((value) => (
          <Button
            key={value}
            variant="outline"
            size="sm"
            {...menu.triggerProps}
            onClick={(event) => {
              setPlacement(value);
              menu.triggerProps.onClick?.(event);
            }}
          >
            {value}
          </Button>
        ))}
        <Menu {...menu.menuProps}>
          <MenuItem onClick={menu.close}>Action one</MenuItem>
          <MenuItem onClick={menu.close}>Action two</MenuItem>
        </Menu>
      </Flex>
    );
  },
};

export const NestedFlip: Story = {
  render: function NestedFlipStory() {
    const menu = useMenu({ placement: 'bottom-end' });

    return (
      <Flex
        justify="flex-end"
        align="center"
        style={{ minHeight: 240, paddingRight: 16 }}
      >
        <Flex direction="column" gap="sm">
          <Text size="sm">
            Open near the right edge — submenu flips left when needed.
          </Text>
          <Button {...menu.triggerProps}>Near edge</Button>
          <Menu {...menu.menuProps}>
            <MenuItem>
              Nested
              <Menu>
                <MenuItem onClick={menu.close}>Child A</MenuItem>
                <MenuItem onClick={menu.close}>Child B</MenuItem>
                <MenuItem color="error" onClick={menu.close}>
                  Child delete
                </MenuItem>
              </Menu>
            </MenuItem>
            <MenuItem onClick={menu.close}>Plain</MenuItem>
          </Menu>
        </Flex>
      </Flex>
    );
  },
};
