import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { MouseEvent, useState } from 'react';
import type { TPaletteColor } from '../../../theme/types';
import { Avatar, Flex } from '../../../index';
import { CloseIcon } from '../../../icons';
import {
  AutoComplete,
  Chip,
  IconButton,
  InputActions,
  InputButton,
  Text,
} from '../../index';
import type { TInputSize, TInputVariant } from '../input/input-wrapper/types';

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

const COLORS: TPaletteColor[] = [
  'base',
  'primary',
  'secondary',
  'success',
  'error',
  'warning',
  'info',
  'dark',
  'light',
  'default',
  'inverted',
];

const VARIANTS: TInputVariant[] = ['subtle', 'surface', 'outline'];
const SIZES: TInputSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const personLabel = (person: TPerson) => (
  <Flex align="center" gap="sm">
    <Avatar name={person.name} src={person.src} size="xs" />
    <Text size="sm">{person.name}</Text>
  </Flex>
);

const meta: Meta<typeof AutoComplete> = {
  title: 'V3/Forms/AutoComplete',
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
    size: { control: 'select', options: SIZES },
    variant: { control: 'select', options: VARIANTS },
    color: { control: 'select', options: COLORS },
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
  args: {
    label: 'Assignee',
    helperText: 'Type a name or pick from the list.',
    placeholder: 'Find a person',
    size: 'md',
    variant: 'surface',
    color: 'primary',
    fullWidth: true,
    multiSelect: false,
    error: false,
  },
};

export default meta;

type Story = StoryObj<typeof AutoComplete<TPerson>>;

export const Playground: Story = {
  tags: ['!dev'],
  render: (args) => {
    const [value, setValue] = useState<TPerson>(people[0]);

    return (
      <AutoComplete
        {...args}
        options={people}
        value={value}
        defaultInputValue={people[0].name}
        onChange={(_, next) => setValue(next as TPerson)}
        isValueEqual={(a, b) => a.name === b.name}
        getOptionLabel={(person) => person.name}
        renderOption={(person) => personLabel(person)}
      />
    );
  },
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {COLORS.map((color) => (
        <AutoComplete
          key={color}
          color={color}
          label={color}
          options={people}
          getOptionLabel={(person) => person.name}
          defaultValue={people[0]}
          defaultInputValue={people[0].name}
          isValueEqual={(a, b) => a.name === b.name}
        />
      ))}
    </Flex>
  ),
};

export const Variants: Story = {
  render: () => (
    <Flex direction="column" gap="lg">
      {VARIANTS.map((variant) => (
        <Flex key={variant} direction="column" gap="xs">
          <Text size="sm">{variant}</Text>
          <AutoComplete
            variant={variant}
            label={variant}
            options={people}
            getOptionLabel={(person) => person.name}
            defaultValue={people[0]}
            defaultInputValue={people[0].name}
            isValueEqual={(a, b) => a.name === b.name}
          />
        </Flex>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {SIZES.map((size) => (
        <AutoComplete
          key={size}
          size={size}
          label={size}
          options={people}
          getOptionLabel={(person) => person.name}
          defaultValue={people[0]}
          defaultInputValue={people[0].name}
          isValueEqual={(a, b) => a.name === b.name}
        />
      ))}
    </Flex>
  ),
};

export const MultiSelect: Story = {
  render: (args) => {
    const [value, setValue] = useState<TPerson[]>([people[0], people[2]]);

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
        options={people}
        value={value}
        onChange={(_, next) => setValue(next as TPerson[])}
        isValueEqual={(a, b) => a.name === b.name}
        getOptionLabel={(person) => person.name}
        renderOption={(person) => personLabel(person)}
        renderValue={(selected) => {
          const items = Array.isArray(selected) ? selected : [];

          return items.length > 0 ? (
            <Flex align="center" gap="xs" wrap="wrap">
              {items.map((person) => (
                <span
                  key={person.name}
                  onMouseDown={(event) => event.stopPropagation()}
                  onClick={(event) => event.stopPropagation()}
                >
                  <Chip
                    size="sm"
                    variant="solid"
                    color="primary"
                    radius="pill"
                    onDelete={(event) => removePerson(event, person)}
                  >
                    <Avatar name={person.name} src={person.src} size="xs" />
                    {person.name}
                  </Chip>
                </span>
              ))}
            </Flex>
          ) : null;
        }}
      />
    );
  },
  args: {
    label: 'Assignees',
    helperText: 'Type to narrow the list, then pick people.',
    placeholder: 'Add people',
    multiSelect: true,
    hideSelectedOptions: true,
  },
};

export const Error: Story = {
  args: {
    helperText: 'Please pick an assignee.',
    error: true,
    required: true,
  },
  render: (args) => (
    <AutoComplete
      {...args}
      options={people}
      getOptionLabel={(person) => person.name}
      renderOption={(person) => personLabel(person)}
    />
  ),
};

export const ActionBar: Story = {
  render: (args) => (
    <AutoComplete
      {...args}
      options={people}
      getOptionLabel={(person) => person.name}
      defaultValue={people[0]}
      defaultInputValue={people[0].name}
      isValueEqual={(a, b) => a.name === b.name}
      actionBar={
        <Flex align="center" justify="flex-end">
          <InputActions>
            <InputButton radius="sm">Clear value</InputButton>
          </InputActions>
        </Flex>
      }
    />
  ),
};
