import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card, Grid, GridCell, Text } from '../../index';
const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'number',
    },
    rows: {
      control: 'text',
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    alignItems: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
    },
    justifyItems: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
    },
    minChildWidth: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Grid>;

const Cell = ({ label }: { label: string }) => (
  <Card>
    <Text>{label}</Text>
  </Card>
);

export const Default: Story = {
  render: (args) => (
    <Grid {...args} style={{ width: 640 }}>
      <GridCell>
        <Cell label="1" />
      </GridCell>
      <GridCell>
        <Cell label="2" />
      </GridCell>
      <GridCell>
        <Cell label="3" />
      </GridCell>
      <GridCell>
        <Cell label="4" />
      </GridCell>
      <GridCell>
        <Cell label="5" />
      </GridCell>
      <GridCell>
        <Cell label="6" />
      </GridCell>
    </Grid>
  ),
  args: {
    columns: 3,
    rows: 'auto',
    gap: 'md',
    alignItems: 'stretch',
    justifyItems: 'stretch',
  },
};

export const Spans: Story = {
  render: () => (
    <Grid columns={3} gap="md" style={{ width: 640 }}>
      <GridCell colSpan={2}>
        <Cell label="colSpan 2" />
      </GridCell>
      <GridCell>
        <Cell label="1" />
      </GridCell>
      <GridCell rowSpan={2} alignSelf="stretch">
        <Cell label="rowSpan 2" />
      </GridCell>
      <GridCell>
        <Cell label="2" />
      </GridCell>
      <GridCell>
        <Cell label="3" />
      </GridCell>
    </Grid>
  ),
};

export const CustomTemplate: Story = {
  render: () => (
    <Grid
      templateColumns="2fr 1fr 1fr"
      templateRows="auto auto"
      gap="lg"
      style={{ width: 640 }}
    >
      <GridCell>
        <Cell label="2fr" />
      </GridCell>
      <GridCell>
        <Cell label="1fr" />
      </GridCell>
      <GridCell>
        <Cell label="1fr" />
      </GridCell>
    </Grid>
  ),
};

export const MinChildWidth: Story = {
  render: () => (
    <Grid columns={3} gap="md" minChildWidth="md">
      <GridCell colSpan={2}>
        <Cell label="colSpan 2 (stacks below md)" />
      </GridCell>
      <GridCell>
        <Cell label="1" />
      </GridCell>
      <GridCell>
        <Cell label="2" />
      </GridCell>
      <GridCell colSpan={3}>
        <Cell label="colSpan 3" />
      </GridCell>
    </Grid>
  ),
};
