import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card, Heading, Text } from '../../index';
const meta: Meta<typeof Card> = {
  title: 'Data Display/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    radius: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large', 'pill', 'circle'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    radius: 'large',
  },
  render: (args) => (
    <Card {...args} style={{ width: 320 }}>
      <Heading as="h4">Card title</Heading>
      <Text>Card content uses spacing and colors from the theme.</Text>
    </Card>
  ),
};
