import type { Meta, StoryObj } from '@storybook/react';
import React, { MouseEvent, useMemo, useState } from 'react';
import {
  AutoComplete,
  AutoCompleteOption,
  Avatar,
  Chip,
  Flex,
  IconButton,
  Text,
} from '../../index';
import { CloseIcon } from '../../icons';

type TPerson = {
  name: string;
  src: string;
};

const people: TPerson[] = [
  { name: 'Remy Sharp', src: 'https://i.pravatar.cc/150?img=1' },
  { name: 'Travis Howard', src: 'https://i.pravatar.cc/150?img=2' },
  { name: 'Cindy Baker', src: 'https://i.pravatar.cc/150?img=3' },
  { name: 'Agnes Walker', src: 'https://i.pravatar.cc/150?img=4' },
  { name: 'Trevor Henderson', src: 'https://i.pravatar.cc/150?img=5' },
];

const meta: Meta<typeof AutoComplete> = {
  title: 'Forms & Inputs/AutoComplete',
  component: AutoComplete,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['subtle', 'surface', 'outline'],
    },
    color: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'success',
        'error',
        'warning',
        'info',
        'dark',
        'light',
      ],
    },
    fullWidth: { control: 'boolean' },
    required: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    multiSelect: { control: 'boolean' },
    closeOnSelect: { control: 'boolean' },
    hideSelectedOptions: { control: 'boolean' },
    noOptionsText: { control: 'text' },
    label: { control: 'text' },
    description: { control: 'text' },
    helperText: { control: 'text' },
    placeholder: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof AutoComplete>;

export const Default: Story = {
  render: (args) => {
    const [inputValue, setInputValue] = useState(people[0].name);
    const [selected, setSelected] = useState<TPerson>(people[0]);

    const options = useMemo(() => {
      const query = inputValue.trim().toLowerCase();

      if (!query) {
        return people;
      }

      return people.filter((person) =>
        person.name.toLowerCase().includes(query),
      );
    }, [inputValue]);

    return (
      <AutoComplete
        {...args}
        inputValue={inputValue}
        onInputChange={(value) => setInputValue(value)}
      >
        {options.map((person) => (
          <AutoCompleteOption
            key={person.name}
            value={person.name}
            aria-selected={selected.name === person.name}
            onClick={() => {
              setSelected(person);
              setInputValue(person.name);
            }}
          >
            <Avatar name={person.name} src={person.src} size="xs" />
            <Text size="sm">{person.name}</Text>
          </AutoCompleteOption>
        ))}
      </AutoComplete>
    );
  },
  args: {
    label: 'Assignee',
    helperText: 'Type a name or pick from the list.',
    placeholder: 'Find a person',
    size: 'md',
    variant: 'subtle',
    color: 'primary',
    fullWidth: true,
    multiSelect: false,
    error: false,
  },
};

export const MultiSelect: Story = {
  render: (args) => {
    const [inputValue, setInputValue] = useState('');
    const [value, setValue] = useState<TPerson[]>([people[0], people[2]]);

    const options = useMemo(() => {
      const query = inputValue.trim().toLowerCase();

      if (!query) {
        return people;
      }

      return people.filter((person) =>
        person.name.toLowerCase().includes(query),
      );
    }, [inputValue]);

    const togglePerson = (person: TPerson) => {
      setValue((current) => {
        const exists = current.some((item) => item.name === person.name);

        if (exists) {
          return current.filter((item) => item.name !== person.name);
        }

        return [...current, person];
      });
      setInputValue('');
    };

    const removePerson = (event: MouseEvent, person: TPerson) => {
      event.stopPropagation();
      event.preventDefault();
      setValue((current) =>
        current.filter((item) => item.name !== person.name),
      );
    };

    return (
      <AutoComplete
        {...args}
        multiSelect
        hideSelectedOptions
        inputValue={inputValue}
        onInputChange={(next) => setInputValue(next)}
        onRemoveLast={() => {
          setValue((current) => current.slice(0, -1));
        }}
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
        {options.map((person) => {
          const selected = value.some((item) => item.name === person.name);

          return (
            <AutoCompleteOption
              key={person.name}
              value={person.name}
              aria-selected={selected}
              onClick={() => togglePerson(person)}
            >
              <Avatar name={person.name} src={person.src} size="xs" />
              <Text size="sm">{person.name}</Text>
            </AutoCompleteOption>
          );
        })}
      </AutoComplete>
    );
  },
  args: {
    label: 'Assignees',
    helperText: 'Type to narrow the list, then pick people.',
    placeholder: 'Add people',
    size: 'md',
    variant: 'subtle',
    color: 'primary',
    fullWidth: true,
    multiSelect: true,
    hideSelectedOptions: true,
    error: false,
  },
};
