import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useRef } from 'react';
import type { TMenuPlacement } from './context';
import {
  Button,
  Flex,
  Menu,
  MenuItem,
  MenuGroup,
  Text,
} from '../../index';
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
  title: 'Overlays/Menu',
  component: Menu,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: PLACEMENTS,
    },
    offset: {
      control: 'number',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  render: function DefaultStory(args) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const handleClose = () => setAnchorEl(null);

    return (
      <Flex justify="center" align="center" style={{ minHeight: 280 }}>
        <Button
          onClick={(event) =>
            setAnchorEl((current) => (current ? null : event.currentTarget))
          }
        >
          Open menu
        </Button>
        <Menu
          {...args}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuGroup>
            <MenuItem onClick={handleClose}>Edit</MenuItem>
            <MenuItem onClick={handleClose}>Duplicate</MenuItem>
            <MenuItem>
              Share
              <Menu>
                <MenuItem onClick={handleClose}>Copy link</MenuItem>
                <MenuItem onClick={handleClose}>Email</MenuItem>
                <MenuItem>
                  Social
                  <Menu>
                    <MenuItem onClick={handleClose}>Twitter</MenuItem>
                    <MenuItem onClick={handleClose}>LinkedIn</MenuItem>
                  </Menu>
                </MenuItem>
              </Menu>
            </MenuItem>
          </MenuGroup>
          <MenuGroup>
            <MenuItem color="error" onClick={handleClose}>
              Delete
            </MenuItem>
          </MenuGroup>
        </Menu>
      </Flex>
    );
  },
  args: {
    placement: 'bottom-start',
    offset: 4,
  },
};

export const Hover: Story = {
  render: function HoverStory() {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const open = Boolean(anchorEl);
    const handleClose = () => setAnchorEl(null);

    const clearCloseTimer = () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };

    const scheduleClose = () => {
      clearCloseTimer();
      closeTimerRef.current = setTimeout(handleClose, 200);
    };

    return (
      <Flex justify="center" align="center" style={{ minHeight: 200 }}>
        <Button
          variant="outline"
          onMouseEnter={(event) => {
            clearCloseTimer();
            setAnchorEl(event.currentTarget);
          }}
          onMouseLeave={scheduleClose}
        >
          Hover me
        </Button>
        <Menu
          placement="bottom"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onMouseEnter={clearCloseTimer}
          onMouseLeave={scheduleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Settings</MenuItem>
          <MenuItem color="error" onClick={handleClose}>
            Log out
          </MenuItem>
        </Menu>
      </Flex>
    );
  },
};

export const Placements: Story = {
  render: function PlacementsStory() {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [placement, setPlacement] = useState<TMenuPlacement>('bottom-start');
    const open = Boolean(anchorEl);
    const handleClose = () => setAnchorEl(null);

    return (
      <Flex gap="md" wrap="wrap" justify="center" style={{ padding: 48 }}>
        {PLACEMENTS.map((value) => (
          <Button
            key={value}
            variant="outline"
            size="sm"
            onClick={(event) => {
              if (open && placement === value) {
                setAnchorEl(null);
                return;
              }

              setPlacement(value);
              setAnchorEl(event.currentTarget);
            }}
          >
            {value}
          </Button>
        ))}
        <Menu
          placement={placement}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Action one</MenuItem>
          <MenuItem onClick={handleClose}>Action two</MenuItem>
        </Menu>
      </Flex>
    );
  },
};

export const NestedFlip: Story = {
  render: function NestedFlipStory() {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const handleClose = () => setAnchorEl(null);

    return (
      <Flex justify="flex-end" align="center" style={{ minHeight: 240, paddingRight: 16 }}>
        <Flex direction="column" gap="sm">
          <Text size="sm">Open near the right edge — submenu flips left when needed.</Text>
          <Button
            onClick={(event) =>
              setAnchorEl((current) => (current ? null : event.currentTarget))
            }
          >
            Near edge
          </Button>
          <Menu
            placement="bottom-end"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem>
              Nested
              <Menu>
                <MenuItem onClick={handleClose}>Child A</MenuItem>
                <MenuItem onClick={handleClose}>Child B</MenuItem>
                <MenuItem color="error" onClick={handleClose}>
                  Child delete
                </MenuItem>
              </Menu>
            </MenuItem>
            <MenuItem onClick={handleClose}>Plain</MenuItem>
          </Menu>
        </Flex>
      </Flex>
    );
  },
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const handleClose = () => setAnchorEl(null);

    return (
      <Flex justify="center" align="center" style={{ minHeight: 240 }} gap="md">
        <Button
          onClick={(event) =>
            setAnchorEl((current) => (current ? null : event.currentTarget))
          }
        >
          Dashboard
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          placement="bottom-start"
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem color="error" onClick={handleClose}>
            Logout
          </MenuItem>
        </Menu>
      </Flex>
    );
  },
};
