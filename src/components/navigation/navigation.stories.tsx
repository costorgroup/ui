import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Button, Text } from '../..';
import { CheckIcon, FileIcon, FolderIcon } from '../../icons';
import { Navigation } from './';
import { NavigationItem } from './navigation-item';
import { NavigationItems } from './navigation-items';
import { NavigationLogo } from './navigation-logo';

const meta: Meta<typeof Navigation> = {
  title: 'Navigation/Navigation',
  component: Navigation,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    position: {
      control: 'select',
      options: ['static', 'sticky', 'fixed'],
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Navigation>;

const ScrollBehind = () => (
  <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
    {Array.from({ length: 20 }).map((_, index) => (
      <Text key={index}>
        Scrollable content row {index + 1} — the nav bar above stays
        translucent and blurred as this scrolls underneath it.
      </Text>
    ))}
  </div>
);

export const Default: Story = {
  render: (args) => (
    <div>
      <Navigation {...args}>
        <NavigationLogo>
          <Text style={{ fontWeight: 700 }}>Costor</Text>
        </NavigationLogo>
        <NavigationItems>
          <NavigationItem href="#" active>
            Home
          </NavigationItem>
          <NavigationItem href="#">Docs</NavigationItem>
          <NavigationItem href="#">Pricing</NavigationItem>
          <NavigationItem href="#">About</NavigationItem>
          <Button size="sm" style={{ marginLeft: 8 }}>
            Sign in
          </Button>
        </NavigationItems>
      </Navigation>
      <ScrollBehind />
    </div>
  ),
  args: {
    size: 'md',
    position: 'sticky',
  },
};

export const ActiveItem: Story = {
  render: function ActiveItemStory() {
    const [active, setActive] = useState('home');
    const items = [
      { id: 'home', label: 'Home' },
      { id: 'docs', label: 'Docs' },
      { id: 'pricing', label: 'Pricing' },
    ];

    return (
      <Navigation>
        <NavigationLogo>
          <Text style={{ fontWeight: 700 }}>Costor</Text>
        </NavigationLogo>
        <NavigationItems>
          {items.map((item) => (
            <NavigationItem
              key={item.id}
              as="button"
              type="button"
              active={active === item.id}
              onClick={() => setActive(item.id)}
            >
              {item.label}
            </NavigationItem>
          ))}
        </NavigationItems>
      </Navigation>
    );
  },
};

const ListLink = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <a
    href="#"
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      padding: '0.5rem 0.6rem',
      borderRadius: 8,
      textDecoration: 'none',
      color: 'inherit',
    }}
    onMouseEnter={(event) => {
      event.currentTarget.style.backgroundColor = 'color-mix(in oklab, currentColor 8%, transparent)';
    }}
    onMouseLeave={(event) => {
      event.currentTarget.style.backgroundColor = 'transparent';
    }}
  >
    <Text style={{ fontWeight: 600 }}>{title}</Text>
    <Text size="sm" style={{ opacity: 0.7 }}>
      {description}
    </Text>
  </a>
);

export const Expandable: Story = {
  render: () => (
    <Navigation>
      <NavigationLogo>
        <Text style={{ fontWeight: 700 }}>Costor</Text>
      </NavigationLogo>
      <NavigationItems>
        <NavigationItem
          content={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 280 }}>
              <ListLink
                title="Introduction"
                description="Re-usable components built with our design system."
              />
              <ListLink
                title="Installation"
                description="How to install dependencies and structure your app."
              />
              <ListLink
                title="Typography"
                description="Styles for headings, paragraphs, lists…etc."
              />
            </div>
          }
        >
          Getting started
        </NavigationItem>
        <NavigationItem
          content={
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: 4,
                width: 420,
              }}
            >
              <ListLink title="Alert Dialog" description="Interrupts the user with important content." />
              <ListLink title="Hover Card" description="Preview content behind a link." />
              <ListLink title="Progress" description="Shows completion progress of a task." />
              <ListLink title="Scroll Area" description="Visually separates content." />
              <ListLink title="Tabs" description="Layered sections shown one at a time." />
              <ListLink title="Tooltip" description="A popup on hover or focus." />
            </div>
          }
        >
          Components
        </NavigationItem>
        <NavigationItem href="#">Docs</NavigationItem>
      </NavigationItems>
    </Navigation>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Navigation>
      <NavigationLogo>
        <Text style={{ fontWeight: 700 }}>Costor</Text>
      </NavigationLogo>
      <NavigationItems>
        <NavigationItem
          content={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, width: 160 }}>
              {[
                { label: 'Backlog', icon: <FolderIcon /> },
                { label: 'To Do', icon: <FileIcon /> },
                { label: 'Done', icon: <CheckIcon /> },
              ].map((item) => (
                <a
                  key={item.label}
                  href="#"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '0.5rem 0.6rem',
                    borderRadius: 8,
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  {item.icon}
                  <Text size="sm">{item.label}</Text>
                </a>
              ))}
            </div>
          }
        >
          Status
        </NavigationItem>
        <NavigationItem href="#">Docs</NavigationItem>
      </NavigationItems>
    </Navigation>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Navigation key={size} size={size}>
          <NavigationLogo>
            <Text style={{ fontWeight: 700 }}>size={size}</Text>
          </NavigationLogo>
          <NavigationItems>
            <NavigationItem href="#" active>
              Home
            </NavigationItem>
            <NavigationItem href="#">Docs</NavigationItem>
          </NavigationItems>
        </Navigation>
      ))}
    </div>
  ),
};
