import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardImage,
  CardTitle,
  Chip,
  Flex,
  Text,
} from '../../index';

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
      <CardContent>
        <CardTitle>Card title</CardTitle>
        <Text>Card content uses spacing and colors from the theme.</Text>
      </CardContent>
    </Card>
  ),
};

export const ProductSale: Story = {
  render: () => (
    <Card style={{ width: 280 }}>
      <CardImage
        src="https://picsum.photos/seed/mug/640/400"
        alt="Stoneware mug"
        height={180}
      >
        <Chip size="sm" color="error">
          -20%
        </Chip>
      </CardImage>
      <CardContent>
        <CardTitle>Stoneware mug</CardTitle>
        <Text size="sm" color="dark">
          Matte glaze, 350 ml
        </Text>
        <Flex gap="sm" align="center">
          <Text>$24.00</Text>
          <Text
            size="sm"
            color="dark"
            style={{ textDecoration: 'line-through', opacity: 0.55 }}
          >
            $30.00
          </Text>
        </Flex>
      </CardContent>
      <CardActions>
        <Button size="sm">Add to cart</Button>
        <Button size="sm" variant="ghost">
          Details
        </Button>
      </CardActions>
    </Card>
  ),
};

export const MediaAndActions: Story = {
  render: () => (
    <Card style={{ width: 320 }}>
      <CardImage
        src="https://picsum.photos/seed/desk/640/360"
        alt="Workspace"
        height={160}
      />
      <CardContent>
        <CardTitle as="h4">Workspace kit</CardTitle>
        <Text>
          Compose image, title, body, and actions for richer layouts.
        </Text>
      </CardContent>
      <CardActions justify="end">
        <Button size="sm" variant="outline">
          Share
        </Button>
        <Button size="sm">Buy</Button>
      </CardActions>
    </Card>
  ),
};
