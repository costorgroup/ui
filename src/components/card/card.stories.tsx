import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { ArrowRightIcon } from '../../icons';
import { Button, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardImage, CardTitle, Chip, Link, List, ListItem, Text, TextField, Flex } from '../..';
import type { TCardSize } from './types';
import type { TPanelVariant } from '../panel/types';

const SIZES: TCardSize[] = ['sm', 'md', 'lg'];
const VARIANTS: TPanelVariant[] = ['subtle', 'surface', 'outline'];
const RADIUS = ['none', 'sm', 'md', 'lg', 'xl', 'pill'] as const;

const meta: Meta<typeof Card> = {
  title: 'Surfaces/Card',
  component: Card,
  tags: ['autodocs'],
  args: {
    elevation: 1,
    variant: 'surface',
    radius: 'xl',
    size: 'md',
  },
  argTypes: {
    elevation: {
      control: { type: 'range', min: 0, max: 24, step: 1 },
    },
    variant: {
      control: 'select',
      options: VARIANTS,
    },
    radius: {
      control: 'select',
      options: RADIUS,
    },
    size: {
      control: 'select',
      options: SIZES,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Playground: Story = {
  tags: ['!dev'],
  render: (args) => (
    <Card {...args} style={{ maxWidth: 380 }}>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Link size="sm" href="#signup">
            Sign Up
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Flex direction="column" gap="md">
          <TextField
            label="Email"
            placeholder="m@example.com"
            variant="subtle"
            autoComplete="email"
          />
          <TextField
            label="Password"
            type="password"
            placeholder="••••••••"
            variant="subtle"
            autoComplete="current-password"
            helperText={
              <Link size="sm" href="#forgot">
                Forgot your password?
              </Link>
            }
          />
        </Flex>
      </CardContent>
      <CardFooter>
        <Flex direction="column" gap="sm" style={{ width: '100%' }}>
          <Button style={{ width: '100%' }}>Login</Button>
          <Button variant="outline" style={{ width: '100%' }}>
            Login with Google
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  ),
};

export const Login: Story = {
  render: (args) => (
    <Card {...args} style={{ maxWidth: 380 }}>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Link size="sm" href="#signup">
            Sign Up
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Flex direction="column" gap="md">
          <TextField
            label="Email"
            placeholder="m@example.com"
            variant="subtle"
            autoComplete="email"
          />
          <TextField
            label="Password"
            type="password"
            placeholder="••••••••"
            variant="subtle"
            autoComplete="current-password"
            helperText={
              <Link size="sm" href="#forgot">
                Forgot your password?
              </Link>
            }
          />
        </Flex>
      </CardContent>
      <CardFooter>
        <Flex direction="column" gap="sm" style={{ width: '100%' }}>
          <Button style={{ width: '100%' }}>Login</Button>
          <Button variant="outline" style={{ width: '100%' }}>
            Login with Google
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  ),
};

export const Size: Story = {
  args: {
    size: 'sm',
  },
  render: (args) => (
    <Card {...args} style={{ maxWidth: 380 }}>
      <CardHeader>
        <CardTitle>Scheduled reports</CardTitle>
        <CardDescription>
          Weekly snapshots. No more manual exports.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <List variant="plain" size="sm">
          <ListItem>Choose a schedule (daily, or weekly).</ListItem>
          <ListItem>Send to channels or specific teammates.</ListItem>
          <ListItem>Include charts, tables, and key metrics.</ListItem>
        </List>
      </CardContent>
      <CardFooter>
        <Button size="sm">Set up scheduled reports</Button>
        <Button size="sm" variant="ghost">
          See what&apos;s new
          <ArrowRightIcon />
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Image: Story = {
  render: (args) => (
    <Card {...args} style={{ maxWidth: 380 }}>
      <CardImage>
        <img
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&h=420&fit=crop"
          alt="Event cover"
        />
        <Chip
          size="sm"
          color="inverted"
          style={{ position: 'absolute', top: 12, left: 12 }}
        >
          Featured
        </Chip>
      </CardImage>
      <CardHeader>
        <CardTitle>Design systems meetup</CardTitle>
        <CardDescription>
          A practical talk on component APIs, accessibility, and shipping
          faster.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button size="sm" style={{ width: '100%' }}>
          View Event
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const MutedFooter: Story = {
  render: (args) => (
    <Card {...args} style={{ maxWidth: 420 }}>
      <CardHeader>
        <CardTitle>Terms of Service</CardTitle>
        <CardDescription>
          Review the terms before accepting the agreement.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Text size="sm">
          These terms govern your use of the workspace, including access to
          shared documents, project files, and collaboration tools.
        </Text>
      </CardContent>
      <CardFooter variant="muted" justify="flex-end">
        <Button size="sm" variant="outline">
          Decline
        </Button>
        <Button size="sm">Accept</Button>
      </CardFooter>
    </Card>
  ),
};

export const BorderedSections: Story = {
  render: (args) => (
    <Flex gap="md" wrap="wrap" align="start">
      {(['border', 'muted'] as const).map((variant) => (
        <Card key={variant} {...args} style={{ width: 340 }}>
          <CardHeader variant={variant}>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Header and footer use variant=&quot;{variant}&quot;.</CardDescription>
          </CardHeader>
          <CardContent>
            <Text size="sm">
              Choose how you want to be notified about activity in your workspace.
            </Text>
          </CardContent>
          <CardFooter variant={variant} justify="flex-end">
            <Button size="sm">Save</Button>
          </CardFooter>
        </Card>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex gap="md" wrap="wrap" align="start">
      {SIZES.map((size) => (
        <Card key={size} size={size} style={{ width: 280 }}>
          <CardHeader>
            <CardTitle>{size}</CardTitle>
            <CardDescription>
              Spacing scales with size via --card-spacing.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button size={size === 'lg' ? 'md' : 'sm'}>Continue</Button>
          </CardFooter>
        </Card>
      ))}
    </Flex>
  ),
};
