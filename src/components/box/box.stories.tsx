import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Box, Flex, Text } from '../..';

const meta: Meta<typeof Box> = {
  title: 'Layout/Box',
  component: Box,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Box>;

export const Default: Story = {
  render: () => (
    <Box
      cStyle={(theme) => ({
        padding: theme.spacing(theme.gap.md),
        borderRadius: theme.radius.md,
        backgroundColor: theme.surfaces.background,
        color: theme.surfaces.ink,
      })}
    >
      <Text>Box</Text>
    </Box>
  ),
};

export const Hover: Story = {
  render: () => (
    <Box
      cStyle={(theme) => ({
        padding: theme.spacing(theme.gap.md),
        borderRadius: theme.radius.md,
        backgroundColor: theme.surfaces.background,
        color: theme.surfaces.ink,
        border: `1px solid ${theme.surfaces.border}`,
        '&:hover': {
          borderColor: theme.palette.primary.main,
        },
      })}
    >
      <Text size="sm">Hover for primary border</Text>
    </Box>
  ),
};

export const Override: Story = {
  render: () => (
    <Flex gap="md" wrap="wrap">
      <Box
        cStyle={(theme) => ({
          padding: theme.spacing(theme.gap.md),
          backgroundColor: theme.surfaces.background,
          color: theme.surfaces.ink,
        })}
      >
        <Text size="sm">block (default)</Text>
      </Box>
      <Box
        cStyle={(theme) => ({
          display: 'inline-block',
          padding: theme.spacing(theme.gap.md),
          backgroundColor: theme.surfaces.background,
          color: theme.surfaces.ink,
        })}
      >
        <Text size="sm">display wins</Text>
      </Box>
    </Flex>
  ),
};

export const As: Story = {
  render: () => (
    <Box
      as="section"
      cStyle={(theme) => ({
        padding: theme.spacing(theme.gap.lg),
        borderRadius: theme.radius.lg,
        backgroundColor: theme.surfaces.background,
        color: theme.surfaces.ink,
      })}
    >
      <Text>Rendered as section</Text>
    </Box>
  ),
};
