import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Card, CardContent, DragGroup, DragItem, Heading, Text, applyDrag, Flex } from '../..';
import type { TDropResult } from './types';

type TItem = { id: string; label: string };

const meta: Meta<typeof DragGroup> = {
  title: 'Layout/Drag',
  component: DragGroup,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DragGroup>;

const ItemCard = ({ item }: { item: TItem }) => (
  <Card variant="surface" radius="medium" style={{ margin: 4 }}>
    <CardContent>
      <Text>{item.label}</Text>
    </CardContent>
  </Card>
);

export const Default: Story = {
  render: function DefaultStory() {
    const [items, setItems] = useState<TItem[]>([
      { id: '1', label: 'Alpha' },
      { id: '2', label: 'Bravo' },
      { id: '3', label: 'Charlie' },
      { id: '4', label: 'Delta' },
    ]);

    return (
      <DragGroup
        style={{ width: 320 }}
        getChildPayload={(index) => items[index]}
        onDrop={(result) => setItems((current) => applyDrag(current, result))}
      >
        {items.map((item) => (
          <DragItem key={item.id}>
            <ItemCard item={item} />
          </DragItem>
        ))}
      </DragGroup>
    );
  },
};

export const BetweenGroups: Story = {
  render: function BetweenGroupsStory() {
    const [todo, setTodo] = useState<TItem[]>([
      { id: '1', label: 'Design API' },
      { id: '2', label: 'Write stories' },
    ]);
    const [done, setDone] = useState<TItem[]>([
      { id: '3', label: 'Create theme' },
    ]);

    const handleDrop =
      (setter: React.Dispatch<React.SetStateAction<TItem[]>>) =>
      (result: TDropResult) => {
        setter((current) => applyDrag(current, result));
      };

    return (
      <Flex gap="lg" align="flex-start">
        <Flex direction="column" gap="sm" style={{ width: 260 }}>
          <Heading as="h4" style={{ margin: 0 }}>
            Todo
          </Heading>
          <Card
            variant="subtle"
            radius="medium"
            style={{ minHeight: 160, padding: 8 }}
          >
            <DragGroup
              groupName="board"
              getChildPayload={(index) => todo[index]}
              onDrop={handleDrop(setTodo)}
            >
              {todo.map((item) => (
                <DragItem key={item.id}>
                  <ItemCard item={item} />
                </DragItem>
              ))}
            </DragGroup>
          </Card>
        </Flex>
        <Flex direction="column" gap="sm" style={{ width: 260 }}>
          <Heading as="h4" style={{ margin: 0 }}>
            Done
          </Heading>
          <Card
            variant="subtle"
            radius="medium"
            style={{ minHeight: 160, padding: 8 }}
          >
            <DragGroup
              groupName="board"
              getChildPayload={(index) => done[index]}
              onDrop={handleDrop(setDone)}
            >
              {done.map((item) => (
                <DragItem key={item.id}>
                  <ItemCard item={item} />
                </DragItem>
              ))}
            </DragGroup>
          </Card>
        </Flex>
      </Flex>
    );
  },
};

export const Horizontal: Story = {
  render: function HorizontalStory() {
    const [items, setItems] = useState<TItem[]>([
      { id: '1', label: 'One' },
      { id: '2', label: 'Two' },
      { id: '3', label: 'Three' },
    ]);

    return (
      <DragGroup
        orientation="horizontal"
        getChildPayload={(index) => items[index]}
        onDrop={(result) => setItems((current) => applyDrag(current, result))}
      >
        {items.map((item) => (
          <DragItem key={item.id}>
            <ItemCard item={item} />
          </DragItem>
        ))}
      </DragGroup>
    );
  },
};
