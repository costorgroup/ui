import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import type { TPaletteColor } from '../../../theme/types';
import {
  CheckBox,
  FormControl,
  InputHelperText,
  InputLabel,
  InputTextField,
  InputWrapper,
  RadioButton,
  RadioButtonGroup,
  Select,
  Switch,
  Text,
  TextField,
} from '../../index';
import { Flex } from '../../../index';
import type { TInputSize, TInputVariant } from '../input/input-wrapper/types';

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

type TPerson = {
  id: string;
  name: string;
};

const people: TPerson[] = [
  { id: '1', name: 'Remy Sharp' },
  { id: '2', name: 'Travis Howard' },
  { id: '3', name: 'Cindy Baker' },
];

const meta: Meta<typeof FormControl> = {
  title: 'V3/Forms/FormControl',
  component: FormControl,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: SIZES },
    variant: { control: 'select', options: VARIANTS },
    color: { control: 'select', options: COLORS },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    size: 'md',
    variant: 'surface',
    color: 'primary',
    error: false,
    disabled: false,
    required: false,
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof FormControl>;

export const Playground: Story = {
  tags: ['!dev'],
  render: (args) => (
    <FormControl {...args} label="Email" helperText="We’ll never share your email.">
      <InputWrapper>
        <InputTextField placeholder="you@example.com" />
      </InputWrapper>
    </FormControl>
  ),
};

export const Compose: Story = {
  render: () => (
    <FormControl error required>
      <InputLabel>Workspace name</InputLabel>
      <InputWrapper>
        <InputTextField defaultValue="acme" />
      </InputWrapper>
      <InputHelperText>Must be unique.</InputHelperText>
    </FormControl>
  ),
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {COLORS.map((color) => (
        <TextField
          key={color}
          color={color}
          label={color}
          defaultValue={color}
        />
      ))}
    </Flex>
  ),
};

export const Variants: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {VARIANTS.map((variant) => (
        <TextField
          key={variant}
          variant={variant}
          label={variant}
          defaultValue={variant}
        />
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      {SIZES.map((size) => (
        <TextField key={size} size={size} label={size} defaultValue={size} />
      ))}
    </Flex>
  ),
};

export const ObjectSelect: Story = {
  render: () => {
    const [person, setPerson] = useState<TPerson>(people[0]);

    return (
      <Flex direction="column" gap="sm">
        <Select
          label="Assignee"
          helperText={person.name}
          options={people}
          value={person}
          onChange={(_, next) => setPerson(next as TPerson)}
          isValueEqual={(a, b) => a.id === b.id}
          getOptionLabel={(item) => item.name}
        />
        <Text size="sm">{person.name}</Text>
      </Flex>
    );
  },
};

export const ObjectRadio: Story = {
  render: () => {
    const [person, setPerson] = useState<TPerson>(people[0]);

    return (
      <RadioButtonGroup
        label="Owner"
        value={person}
        onChange={(_, next) => setPerson(next)}
        isValueEqual={(a, b) => a.id === b.id}
      >
        {people.map((item) => (
          <RadioButton key={item.id} value={item} label={item.name} />
        ))}
      </RadioButtonGroup>
    );
  },
};

export const Binary: Story = {
  render: () => (
    <Flex direction="column" gap="md">
      <CheckBox label="Subscribe" description="Product emails" defaultChecked />
      <Switch label="Notifications" description="Mentions and replies" defaultChecked />
    </Flex>
  ),
};
