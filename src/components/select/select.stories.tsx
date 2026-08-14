import type { Meta, StoryObj } from "@storybook/react";
import React, { MouseEvent, useState } from "react";
import {
  Avatar,
  Chip,
  Flex,
  IconButton,
  Select,
  SelectOption,
  Text,
} from "../../index";
import { CloseIcon } from "../../icons";

type TPerson = {
  name: string;
  src: string;
};

const people: TPerson[] = [
  { name: "Remy Sharp", src: "https://i.pravatar.cc/150?img=1" },
  { name: "Travis Howard", src: "https://i.pravatar.cc/150?img=2" },
  { name: "Cindy Baker", src: "https://i.pravatar.cc/150?img=3" },
  { name: "Agnes Walker", src: "https://i.pravatar.cc/150?img=4" },
  { name: "Trevor Henderson", src: "https://i.pravatar.cc/150?img=5" },
];

const meta: Meta<typeof Select> = {
  title: 'Forms & Inputs/Select',
  component: Select,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    variant: {
      control: "select",
      options: ["subtle", "surface", "outline"],
    },
    color: {
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "success",
        "error",
        "warning",
        "info",
        "dark",
        "light",
      ],
    },
    fullWidth: { control: "boolean" },
    required: { control: "boolean" },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    multiSelect: { control: "boolean" },
    closeOnSelect: { control: "boolean" },
    hideSelectedOptions: { control: "boolean" },
    noOptionsText: { control: "text" },
    label: { control: "text" },
    description: { control: "text" },
    helperText: { control: "text" },
    placeholder: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<TPerson>(people[0]);

    return (
      <Select
        {...args}
        renderValue={() => (
          <Flex align="center" gap="sm">
            <Avatar name={value.name} src={value.src} size="xs" />
            <Text size="sm">{value.name}</Text>
          </Flex>
        )}
      >
        {people.map((person) => (
          <SelectOption
            key={person.name}
            value={person.name}
            onClick={() => setValue(person)}
          >
            <Avatar name={person.name} src={person.src} size="xs" />
            <Text size="sm">{person.name}</Text>
          </SelectOption>
        ))}
      </Select>
    );
  },
  args: {
    label: "Assignee",
    helperText: "Who owns this task.",
    placeholder: "Select a person",
    size: "md",
    variant: "subtle",
    color: "primary",
    fullWidth: true,
    multiSelect: false,
    error: false,
  },
};

export const MultiSelect: Story = {
  render: (args) => {
    const [value, setValue] = useState<TPerson[]>([people[0], people[2]]);

    const togglePerson = (person: TPerson) => {
      setValue((current) => {
        const exists = current.some((item) => item.name === person.name);

        if (exists) {
          return current.filter((item) => item.name !== person.name);
        }

        return [...current, person];
      });
    };

    const removePerson = (event: MouseEvent, person: TPerson) => {
      event.stopPropagation();
      event.preventDefault();
      setValue((current) =>
        current.filter((item) => item.name !== person.name),
      );
    };

    return (
      <Select
        {...args}
        multiSelect
        hideSelectedOptions
        renderValue={() =>
          value.length > 0 ? (
            <Flex align="center" gap="xs" wrap="wrap">
              {value.map((person) => (
                <Chip
                  key={person.name}
                  size="sm"
                  variant="subtle"
                  color="default"
                  rounded
                  onMouseDown={(event) => event.stopPropagation()}
                  onClick={(event) => event.stopPropagation()}
                >
                  <Avatar name={person.name} src={person.src} size="xs" />
                  <Text size="sm">{person.name}</Text>
                  <IconButton
                    size="xs"
                    variant="ghost"
                    color="default"
                    aria-label={`Remove ${person.name}`}
                    onMouseDown={(event) => event.stopPropagation()}
                    onClick={(event) => removePerson(event, person)}
                  >
                    <CloseIcon />
                  </IconButton>
                </Chip>
              ))}
            </Flex>
          ) : null
        }
      >
        {people.map((person) => {
          const selected = value.some((item) => item.name === person.name);

          return (
            <SelectOption
              key={person.name}
              value={person.name}
              aria-selected={selected}
              onClick={() => togglePerson(person)}
            >
              <Avatar name={person.name} src={person.src} size="xs" />
              <Text size="sm">{person.name}</Text>
            </SelectOption>
          );
        })}
      </Select>
    );
  },
  args: {
    label: "Assignees",
    helperText: "Select one or more people.",
    placeholder: "Select people",
    size: "md",
    variant: "subtle",
    color: "primary",
    fullWidth: true,
    multiSelect: true,
    hideSelectedOptions: true,
    error: false,
  },
};

export const Error: Story = {
  render: (args) => (
    <Select {...args}>
      {people.map((person) => (
        <SelectOption key={person.name} value={person.name}>
          <Avatar name={person.name} src={person.src} size="xs" />
          <Text size="sm">{person.name}</Text>
        </SelectOption>
      ))}
    </Select>
  ),
  args: {
    label: "Assignee",
    helperText: "Please select an assignee.",
    placeholder: "Select a person",
    size: "md",
    variant: "subtle",
    color: "primary",
    fullWidth: true,
    error: true,
    required: true,
  },
};
