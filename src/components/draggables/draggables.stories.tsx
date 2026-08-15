import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Draggable,
  Draggables,
  Flex,
  Heading,
  Text,
  applyDrag,
} from '../../index';
import type { TDropResult } from './types';

type TItem = { id: string; label: string };

const meta: Meta<typeof Draggables> = {
  title: 'Layout/Draggables',
  component: Draggables,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Draggables>;

const ItemCard = ({ item }: { item: TItem }) => (
  <Card radius="medium" style={{ margin: 4 }}>
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
      <Draggables
        style={{ width: 320 }}
        getChildPayload={(index) => items[index]}
        onDrop={(result) => setItems((current) => applyDrag(current, result))}
      >
        {items.map((item) => (
          <Draggable key={item.id}>
            <ItemCard item={item} />
          </Draggable>
        ))}
      </Draggables>
    );
  },
};

export const BetweenContainers: Story = {
  render: function BetweenContainersStory() {
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
          <Draggables
            groupName="board"
            getChildPayload={(index) => todo[index]}
            onDrop={handleDrop(setTodo)}
            style={{
              minHeight: 160,
              padding: 8,
              background: '#f5f5f5',
              borderRadius: 8,
            }}
          >
            {todo.map((item) => (
              <Draggable key={item.id}>
                <ItemCard item={item} />
              </Draggable>
            ))}
          </Draggables>
        </Flex>
        <Flex direction="column" gap="sm" style={{ width: 260 }}>
          <Heading as="h4" style={{ margin: 0 }}>
            Done
          </Heading>
          <Draggables
            groupName="board"
            getChildPayload={(index) => done[index]}
            onDrop={handleDrop(setDone)}
            style={{
              minHeight: 160,
              padding: 8,
              background: '#f5f5f5',
              borderRadius: 8,
            }}
          >
            {done.map((item) => (
              <Draggable key={item.id}>
                <ItemCard item={item} />
              </Draggable>
            ))}
          </Draggables>
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
      <Draggables
        orientation="horizontal"
        getChildPayload={(index) => items[index]}
        onDrop={(result) => setItems((current) => applyDrag(current, result))}
      >
        {items.map((item) => (
          <Draggable key={item.id}>
            <ItemCard item={item} />
          </Draggable>
        ))}
      </Draggables>
    );
  },
};
