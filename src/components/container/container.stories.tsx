import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Container, Flex, Text } from '../../index';

const Box = ({ label }: { label: string }) => (
  <div
    style={{
      padding: 24,
      borderRadius: 8,
      background: 'color-mix(in srgb, currentColor 8%, transparent)',
      textAlign: 'center',
    }}
  >
    <Text size="sm">{label}</Text>
  </div>
);

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', false],
    },
    fixed: {
      control: 'boolean',
    },
    disableGutters: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Container>;

export const Fluid: Story = {
  args: {
    maxWidth: 'sm',
    fixed: false,
    disableGutters: false,
  },
  render: (args) => (
    <Container {...args}>
      <Box label={`Fluid container · maxWidth=${String(args.maxWidth)}`} />
    </Container>
  ),
};

export const Fixed: Story = {
  args: {
    fixed: true,
  },
  render: (args) => (
    <Container {...args}>
      <Box label="Fixed container · max-width tracks current breakpoint" />
    </Container>
  ),
};

export const MaxWidths: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((maxWidth) => (
        <Container key={maxWidth} maxWidth={maxWidth}>
          <Box label={`maxWidth="${maxWidth}"`} />
        </Container>
      ))}
      <Container maxWidth={false}>
        <Box label="maxWidth={false}" />
      </Container>
    </Flex>
  ),
};
