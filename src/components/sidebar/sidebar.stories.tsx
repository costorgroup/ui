import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import type { TPaletteColor } from '../../theme/types';
import { Badge, Button, Chip, IconButton, Panel, Text, Flex } from '../..';
import {
  ChatDotsIcon,
  FolderIcon,
  MoreHorizontalIcon,
  SettingsIcon,
  StarIcon,
  UserAddIcon,
  UsersIcon,
} from '../../icons';
import {
  Sidebar,
  SidebarItem,
  SidebarItemDescription,
  SidebarItemIcon,
  SidebarItemTitle,
  SidebarItemTrailing,
  SidebarSeparator,
  type TSidebarVariant,
} from './';

const COLORS: TPaletteColor[] = [
  'base',
  'primary',
  'secondary',
  'success',
  'error',
  'warning',
  'info',
  'dark',
  'light',
  'default',
  'inverted',
];

const meta: Meta<typeof Sidebar> = {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  args: {
    size: 'md',
    showTrailing: 'always',
  },
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    color: { control: 'select', options: COLORS },
    variant: {
      control: 'inline-radio',
      options: ['subtle', 'solid', 'surface', 'outline', 'plain'],
    },
    radius: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'pill'],
    },
    showTrailing: {
      control: 'select',
      options: ['always', 'hover', 'active'],
    },
    gap: { control: 'text' },
    padding: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

// Stand-in for next/link or react-router's Link: intercepts the click and
// pushes a route, exactly like the real ones do. Sidebar knows nothing about it.
const RouterContext = React.createContext<(href: string) => void>(() => {});

const MockRouterLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
>(function MockRouterLink({ href, onClick, ...props }, ref) {
  const navigate = React.useContext(RouterContext);

  return (
    <a
      ref={ref}
      href={href}
      {...props}
      onClick={(event) => {
        onClick?.(event);

        if (
          event.defaultPrevented ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }

        event.preventDefault();
        navigate(href);
      }}
    />
  );
});

const ROUTES = [
  {
    href: '/inbox',
    icon: <ChatDotsIcon />,
    title: 'Inbox',
    description: 'Messages and mentions',
    count: 12,
  },
  {
    href: '/projects',
    icon: <FolderIcon />,
    title: 'Projects',
    description: 'Everything your team is building',
    count: 4,
  },
  {
    href: '/starred',
    icon: <StarIcon />,
    title: 'Starred',
    description: 'Pinned for quick access',
  },
  {
    href: '/team',
    icon: <UsersIcon />,
    title: 'Team',
    description: 'Members and roles',
  },
  {
    href: '/settings',
    icon: <SettingsIcon />,
    title: 'Settings',
    description: 'Workspace preferences',
    disabled: true,
  },
];

/**
 * Items rendered `as` a router Link and driven by the current pathname.
 * Counts are always visible; the "more" action shows on hover / when active.
 *
 * ```tsx
 * // Next.js (App Router), in a 'use client' component
 * const pathname = usePathname();
 * <SidebarItem as={Link} href="/inbox" active={pathname === '/inbox'}>…</SidebarItem>
 *
 * // React Router
 * const { pathname } = useLocation();
 * <SidebarItem as={Link} to="/inbox" active={pathname === '/inbox'}>…</SidebarItem>
 * ```
 */
export const Navigation: Story = {
  args: {
    gap: 'xs',
    padding: 'sm',
    showTrailing: ['hover', 'active'],
  },
  render: function NavigationStory(args) {
    const [pathname, setPathname] = useState('/inbox');
    const [log, setLog] = useState('');

    return (
      <RouterContext.Provider value={setPathname}>
        <Flex direction="column" gap="md">
          <Panel variant="surface" style={{ width: 300 }}>
            <Sidebar {...args}>
              {ROUTES.map((route) => (
                <SidebarItem
                  key={route.href}
                  as={MockRouterLink}
                  href={route.href}
                  active={pathname === route.href}
                  disabled={route.disabled}
                >
                  <SidebarItemIcon>{route.icon}</SidebarItemIcon>
                  <SidebarItemTitle>{route.title}</SidebarItemTitle>
                  <SidebarItemDescription>
                    {route.description}
                  </SidebarItemDescription>
                  {route.count != null && (
                    <SidebarItemTrailing show="always">
                      <Chip size="xs">{route.count}</Chip>
                    </SidebarItemTrailing>
                  )}
                  <SidebarItemTrailing>
                    <IconButton
                      size="xs"
                      variant="ghost"
                      aria-label={`${route.title} options`}
                      onClick={() => setLog(`Options: ${route.title}`)}
                    >
                      <MoreHorizontalIcon />
                    </IconButton>
                  </SidebarItemTrailing>
                </SidebarItem>
              ))}
            </Sidebar>
          </Panel>
          <Text size="sm">Route: {pathname}</Text>
          <Text size="sm">{log || ' '}</Text>
        </Flex>
      </RouterContext.Provider>
    );
  },
};

/** Plain buttons — `onClick` only, no routing. Selection is local state. */
export const Actions: Story = {
  render: function ActionsStory(args) {
    const [selected, setSelected] = useState('all');
    const [log, setLog] = useState('');

    return (
      <Flex direction="column" gap="md">
        <Panel variant="surface" style={{ width: 260 }}>
          <Sidebar {...args} padding="xs">
            <SidebarItem
              active={selected === 'all'}
              onClick={() => setSelected('all')}
            >
              <SidebarItemIcon>
                <FolderIcon />
              </SidebarItemIcon>
              <SidebarItemTitle>All files</SidebarItemTitle>
              <SidebarItemTrailing>
                <Chip size="xs">128</Chip>
              </SidebarItemTrailing>
            </SidebarItem>
            <SidebarItem
              active={selected === 'starred'}
              onClick={() => setSelected('starred')}
            >
              <SidebarItemIcon>
                <StarIcon />
              </SidebarItemIcon>
              <SidebarItemTitle>Starred</SidebarItemTitle>
              <SidebarItemTrailing>
                <Chip size="xs">7</Chip>
              </SidebarItemTrailing>
            </SidebarItem>
            <SidebarItem onClick={() => setLog('Invite clicked')}>
              <SidebarItemIcon>
                <UserAddIcon />
              </SidebarItemIcon>
              <SidebarItemTitle>Invite people</SidebarItemTitle>
            </SidebarItem>
          </Sidebar>
        </Panel>
        <Text size="sm">Selected: {selected}</Text>
        <Text size="sm">{log || ' '}</Text>
      </Flex>
    );
  },
};

/** Default: no padding, no gap, no surface — Sidebar is just the list. */
export const Bare: Story = {
  render: (args) => (
    <div style={{ width: 240 }}>
      <Sidebar {...args}>
        <SidebarItem active>
          <SidebarItemIcon>
            <ChatDotsIcon />
          </SidebarItemIcon>
          <SidebarItemTitle>Inbox</SidebarItemTitle>
        </SidebarItem>
        <SidebarItem>
          <SidebarItemIcon>
            <FolderIcon />
          </SidebarItemIcon>
          <SidebarItemTitle>Projects</SidebarItemTitle>
        </SidebarItem>
        <SidebarItem>
          <SidebarItemIcon>
            <UsersIcon />
          </SidebarItemIcon>
          <SidebarItemTitle>Team</SidebarItemTitle>
        </SidebarItem>
      </Sidebar>
    </div>
  ),
};

/**
 * `collapsed` turns every item into an identical square icon cell; titles
 * stay as the accessible name. Badges go inside `SidebarItemIcon` (on the
 * glyph) or around a whole `SidebarItem`.
 */
export const Collapsed: Story = {
  args: {
    gap: 'xs',
    padding: 'xs',
  },
  render: function CollapsedStory(args) {
    const [collapsed, setCollapsed] = useState(true);
    const [selected, setSelected] = useState('inbox');

    return (
      <Flex direction="column" gap="md" align="flex-start">
        <Button size="sm" variant="outline" onClick={() => setCollapsed((v) => !v)}>
          {collapsed ? 'Expand' : 'Collapse'}
        </Button>
        <Panel variant="surface" style={{ width: collapsed ? 'auto' : 260 }}>
          <Sidebar {...args} collapsed={collapsed}>
            <SidebarItem
              active={selected === 'inbox'}
              onClick={() => setSelected('inbox')}
            >
              <SidebarItemIcon>
                <Badge badgeContent={12} size="xs" color="error">
                  <ChatDotsIcon />
                </Badge>
              </SidebarItemIcon>
              <SidebarItemTitle>Inbox</SidebarItemTitle>
              <SidebarItemTrailing>
                <Chip size="xs">12</Chip>
              </SidebarItemTrailing>
            </SidebarItem>
            <SidebarItem
              active={selected === 'projects'}
              onClick={() => setSelected('projects')}
            >
              <SidebarItemIcon>
                <Badge size="xs" color="primary">
                  <FolderIcon />
                </Badge>
              </SidebarItemIcon>
              <SidebarItemTitle>Projects</SidebarItemTitle>
            </SidebarItem>
            <Badge badgeContent={3} size="xs" color="info">
              <SidebarItem
                active={selected === 'team'}
                onClick={() => setSelected('team')}
              >
                <SidebarItemIcon>
                  <UsersIcon />
                </SidebarItemIcon>
                <SidebarItemTitle>Team</SidebarItemTitle>
              </SidebarItem>
            </Badge>
            <SidebarItem
              active={selected === 'settings'}
              onClick={() => setSelected('settings')}
            >
              <SidebarItemIcon>
                <SettingsIcon />
              </SidebarItemIcon>
              <SidebarItemTitle>Settings</SidebarItemTitle>
            </SidebarItem>
          </Sidebar>
        </Panel>
      </Flex>
    );
  },
};

/** Items with only an icon are square cells even without `collapsed`. */
export const IconsOnly: Story = {
  render: (args) => (
    <Panel variant="surface" style={{ display: 'inline-block' }}>
      <Sidebar {...args} padding="xs" gap="xs">
        <SidebarItem active aria-label="Inbox">
          <SidebarItemIcon>
            <Badge size="xs" color="error">
              <ChatDotsIcon />
            </Badge>
          </SidebarItemIcon>
        </SidebarItem>
        <SidebarItem aria-label="Projects">
          <SidebarItemIcon>
            <FolderIcon />
          </SidebarItemIcon>
        </SidebarItem>
        <SidebarItem aria-label="Starred">
          <SidebarItemIcon>
            <StarIcon />
          </SidebarItemIcon>
        </SidebarItem>
      </Sidebar>
    </Panel>
  ),
};

/** `radius` on Sidebar sets every item; an item's own `radius` overrides it.
 * Pill on an icon-only cell gives a circle. */
export const Pill: Story = {
  args: {
    radius: 'pill',
    gap: 'xs',
    padding: 'xs',
  },
  render: function PillStory(args) {
    const [selected, setSelected] = useState('inbox');
    const items = [
      { id: 'inbox', icon: <ChatDotsIcon />, title: 'Inbox', count: 12 },
      { id: 'projects', icon: <FolderIcon />, title: 'Projects' },
      { id: 'team', icon: <UsersIcon />, title: 'Team' },
    ];

    return (
      <Flex gap="lg" align="flex-start">
        {[false, true].map((collapsed) => (
          <Panel
            key={String(collapsed)}
            variant="surface"
            style={{ width: collapsed ? 'auto' : 240 }}
          >
            <Sidebar {...args} collapsed={collapsed}>
              {items.map((item) => (
                <SidebarItem
                  key={item.id}
                  active={selected === item.id}
                  onClick={() => setSelected(item.id)}
                >
                  <SidebarItemIcon>{item.icon}</SidebarItemIcon>
                  <SidebarItemTitle>{item.title}</SidebarItemTitle>
                  {item.count != null && (
                    <SidebarItemTrailing>
                      <Chip size="xs" radius="pill">
                        {item.count}
                      </Chip>
                    </SidebarItemTrailing>
                  )}
                </SidebarItem>
              ))}
              <SidebarItem
                radius="sm"
                active={selected === 'settings'}
                onClick={() => setSelected('settings')}
              >
                <SidebarItemIcon>
                  <SettingsIcon />
                </SidebarItemIcon>
                <SidebarItemTitle>Settings (radius="sm")</SidebarItemTitle>
              </SidebarItem>
            </Sidebar>
          </Panel>
        ))}
      </Flex>
    );
  },
};

/** `SidebarSeparator` spaces itself, so it works with the default zero gap.
 * Pass children for a label; collapsed keeps only the line. */
export const Separators: Story = {
  args: {
    padding: 'xs',
  },
  render: function SeparatorsStory(args) {
    const [collapsed, setCollapsed] = useState(false);
    const [selected, setSelected] = useState('inbox');
    const item = (id: string, icon: React.ReactNode, title: string) => (
      <SidebarItem active={selected === id} onClick={() => setSelected(id)}>
        <SidebarItemIcon>{icon}</SidebarItemIcon>
        <SidebarItemTitle>{title}</SidebarItemTitle>
      </SidebarItem>
    );

    return (
      <Flex direction="column" gap="md" align="flex-start">
        <Button size="sm" variant="outline" onClick={() => setCollapsed((v) => !v)}>
          {collapsed ? 'Expand' : 'Collapse'}
        </Button>
        <Panel variant="surface" style={{ width: collapsed ? 'auto' : 240 }}>
          <Sidebar {...args} collapsed={collapsed}>
            {item('inbox', <ChatDotsIcon />, 'Inbox')}
            {item('starred', <StarIcon />, 'Starred')}
            <SidebarSeparator />
            {item('projects', <FolderIcon />, 'Projects')}
            {item('team', <UsersIcon />, 'Team')}
            <SidebarSeparator>Workspace</SidebarSeparator>
            {item('settings', <SettingsIcon />, 'Settings')}
          </Sidebar>
        </Panel>
      </Flex>
    );
  },
};

const CHANNELS = [
  { id: 'general', title: 'General', description: 'Company-wide announcements', unread: 3 },
  { id: 'design', title: 'Design', description: 'Reviews, critiques and assets' },
  { id: 'engineering', title: 'Engineering', description: 'Deploys, incidents and RFCs', unread: 18 },
  { id: 'random', title: 'Random', description: 'Everything else' },
];

/** No icons — title, description and trailing only. Content pads itself
 * with the same inset trailing uses, so text and actions stay balanced.
 * Unread counts are always shown; the options action shows on hover and
 * on the active item. */
export const WithoutIcons: Story = {
  args: {
    gap: 'xs',
    padding: 'xs',
    showTrailing: ['hover', 'active'],
  },
  render: function WithoutIconsStory(args) {
    const [selected, setSelected] = useState('general');
    const [log, setLog] = useState('');

    return (
      <Flex direction="column" gap="md">
        <Panel variant="surface" style={{ width: 280 }}>
          <Sidebar {...args}>
            {CHANNELS.map((channel) => (
              <SidebarItem
                key={channel.id}
                active={selected === channel.id}
                onClick={() => setSelected(channel.id)}
              >
                <SidebarItemTitle>{channel.title}</SidebarItemTitle>
                <SidebarItemDescription>
                  {channel.description}
                </SidebarItemDescription>
                {channel.unread != null && (
                  <SidebarItemTrailing show="always">
                    <Chip size="xs" color="primary">
                      {channel.unread}
                    </Chip>
                  </SidebarItemTrailing>
                )}
                <SidebarItemTrailing>
                  <IconButton
                    size="xs"
                    variant="ghost"
                    aria-label={`${channel.title} options`}
                    onClick={() => setLog(`Options: ${channel.title}`)}
                  >
                    <MoreHorizontalIcon />
                  </IconButton>
                </SidebarItemTrailing>
              </SidebarItem>
            ))}
          </Sidebar>
        </Panel>
        <Text size="sm">Selected: {selected}</Text>
        <Text size="sm">{log || '\u00a0'}</Text>
      </Flex>
    );
  },
};

const VARIANTS: TSidebarVariant[] = ['subtle', 'solid', 'surface', 'outline', 'plain'];

/** Each variant, neutral (top) and with `color="primary"` (bottom).
 * Hover the rows to see the idle / hover / active states. */
export const Variants: Story = {
  args: {
    gap: 'xs',
    padding: 'xs',
  },
  render: function VariantsStory(args) {
    const [selected, setSelected] = useState('inbox');

    return (
      <Flex direction="column" gap="lg">
        {[undefined, 'primary' as const].map((color) => (
          <Flex key={color ?? 'neutral'} gap="md" wrap="wrap">
            {VARIANTS.map((variant) => (
              <Flex key={variant} direction="column" gap="xs">
                <Text size="sm">
                  {variant}
                  {color ? ` · ${color}` : ''}
                </Text>
                <Panel variant="surface" style={{ width: 200 }}>
                  <Sidebar {...args} variant={variant} color={color}>
                    {[
                      { id: 'inbox', icon: <ChatDotsIcon />, title: 'Inbox' },
                      { id: 'projects', icon: <FolderIcon />, title: 'Projects' },
                      { id: 'team', icon: <UsersIcon />, title: 'Team' },
                    ].map((item) => (
                      <SidebarItem
                        key={item.id}
                        active={selected === item.id}
                        onClick={() => setSelected(item.id)}
                      >
                        <SidebarItemIcon>{item.icon}</SidebarItemIcon>
                        <SidebarItemTitle>{item.title}</SidebarItemTitle>
                        <SidebarItemDescription>Description</SidebarItemDescription>
                      </SidebarItem>
                    ))}
                  </Sidebar>
                </Panel>
              </Flex>
            ))}
          </Flex>
        ))}
      </Flex>
    );
  },
};
