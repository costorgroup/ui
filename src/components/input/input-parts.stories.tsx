import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Avatar, Button, Flex, IconButton, InputGroup, Text } from '../../index';
import {
  InputBase,
  InputLabel,
  InputWrapper,
  InputTextField,
  InputNumberField,
  InputTextAreaField,
  InputHelperText,
  InputCheckBox,
  InputRadioButton,
  InputSwitch,
  InputSelect,
  InputSelectOption,
} from '.';
import { EyeIcon } from '../../icons';

const meta: Meta<typeof InputBase> = {
  title: 'Components/Input/Parts',
  component: InputBase,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    fullWidth: {
      control: 'boolean',
    },
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal', 'horizontal-reverse'],
    },
    justify: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof InputBase>;

const stageStyle = {
  width: 480,
  maxWidth: "100%",
  margin: "0 auto",
} as const;

const people = [
  { name: "Remy Sharp", src: "https://i.pravatar.cc/150?img=1" },
  { name: "Travis Howard", src: "https://i.pravatar.cc/150?img=2" },
  { name: "Cindy Baker", src: "https://i.pravatar.cc/150?img=3" },
  { name: "Agnes Walker", src: "https://i.pravatar.cc/150?img=4" },
  { name: "Trevor Henderson", src: "https://i.pravatar.cc/150?img=5" },
];

export const TextField: Story = {
  name: "TextField",
  render: () => (
    <Flex style={stageStyle}>
      <InputBase fullWidth>
        <InputLabel htmlFor="email" required>
          Email
        </InputLabel>
        <InputWrapper>
          <InputTextField
            id="email"
            type="email"
            placeholder="you@example.com"
          />
        </InputWrapper>
        <InputHelperText>We’ll never share your email.</InputHelperText>
      </InputBase>
    </Flex>
  ),
};

export const NumberField: Story = {
  name: "NumberField",
  render: () => (
    <Flex style={stageStyle}>
      <InputBase fullWidth>
        <InputLabel htmlFor="quantity" required>
          Quantity
        </InputLabel>
        <InputNumberField id="quantity" min={0} max={10} step={1} defaultValue={1} />
        <InputHelperText>Use the arrows to increase or decrease.</InputHelperText>
      </InputBase>
    </Flex>
  ),
};

export const TextArea: Story = {
  name: "TextArea",
  render: () => (
    <Flex style={stageStyle}>
      <InputBase fullWidth>
        <InputLabel htmlFor="bio" required>
          Bio
        </InputLabel>
        <InputWrapper>
          <InputTextAreaField
            id="bio"
            placeholder="Tell us a little about yourself"
            rows={4}
          />
        </InputWrapper>
        <InputHelperText>Max 500 characters.</InputHelperText>
      </InputBase>
    </Flex>
  ),
};

export const CheckBox: Story = {
  name: "CheckBox",
  render: () => (
    <Flex style={stageStyle}>
      <InputBase fullWidth>
        <InputBase direction="horizontal">
          <InputCheckBox id="newsletter" defaultChecked />
          <InputLabel htmlFor="newsletter">Email me updates</InputLabel>
        </InputBase>
        <InputHelperText>You can unsubscribe anytime.</InputHelperText>
      </InputBase>
    </Flex>
  ),
};

export const RadioButton: Story = {
  name: "RadioButton",
  render: () => (
    <Flex style={stageStyle}>
      <InputBase fullWidth>
        <InputLabel>Plan</InputLabel>
        <Flex gap="md">
          <InputBase direction="horizontal">
            <InputRadioButton
              id="plan-free"
              name="plan"
              value="free"
              defaultChecked
            />
            <InputLabel htmlFor="plan-free">Free</InputLabel>
          </InputBase>
          <InputBase direction="horizontal">
            <InputRadioButton id="plan-pro" name="plan" value="pro" />
            <InputLabel htmlFor="plan-pro">Pro</InputLabel>
          </InputBase>
          <InputBase direction="horizontal">
            <InputRadioButton id="plan-team" name="plan" value="team" />
            <InputLabel htmlFor="plan-team">Team</InputLabel>
          </InputBase>
        </Flex>
        <InputHelperText>Change plans whenever you like.</InputHelperText>
      </InputBase>
    </Flex>
  ),
};

export const Switch: Story = {
  name: "Switch",
  render: () => (
    <Flex style={stageStyle}>
      <InputBase fullWidth>
        <InputBase direction="horizontal">
          <InputSwitch id="notifications" defaultChecked />
          <InputLabel htmlFor="notifications">Notifications</InputLabel>
        </InputBase>
        <InputHelperText>
          Push alerts for mentions and replies.
        </InputHelperText>
      </InputBase>
    </Flex>
  ),
};

export const Select: Story = {
  name: "Select",
  render: () => (
    <Flex style={stageStyle}>
      <InputBase fullWidth>
        <InputLabel>Assignee</InputLabel>
        <InputSelect
          placeholder="Select a person"
          renderValue={() => (
            <Flex align="center" gap="sm">
              <Avatar name={people[0].name} src={people[0].src} size="xs" />
              <Text size="sm">{people[0].name}</Text>
            </Flex>
          )}
        >
          {people.map((person) => (
            <InputSelectOption key={person.name} value={person.name}>
              <Avatar name={person.name} src={person.src} size="xs" />
              <Text size="sm">{person.name}</Text>
            </InputSelectOption>
          ))}
        </InputSelect>
        <InputHelperText>Who owns this task.</InputHelperText>
      </InputBase>
    </Flex>
  ),
};

export const Group: Story = {
  name: "Group",
  render: () => (
    <Flex direction="column" gap="md" style={stageStyle}>
      <InputBase fullWidth>
        <InputLabel htmlFor="domain">Website</InputLabel>
        <InputGroup>
          <Button type="button" variant="outline">
            https://
          </Button>
          <InputWrapper variant="outline">
            <InputTextField id="domain" placeholder="example" />
          </InputWrapper>
          <Button type="button" variant="outline">
            .com
          </Button>
        </InputGroup>
        <InputHelperText>Prefixed and suffixed with buttons.</InputHelperText>
      </InputBase>

      <InputBase fullWidth>
        <InputLabel htmlFor="search">Search</InputLabel>
        <InputGroup>
          <InputWrapper variant="outline">
            <InputTextField id="search" placeholder="Find something…" />
          </InputWrapper>
          <Button type="button" variant="solid">
            Search
          </Button>
        </InputGroup>
        <InputHelperText>Field attached to an action button.</InputHelperText>
      </InputBase>

      <InputBase fullWidth>
        <InputLabel htmlFor="secret">Password</InputLabel>
        <InputGroup>
          <InputWrapper variant="outline">
            <InputTextField
              id="secret"
              type="password"
              placeholder="••••••••"
            />
          </InputWrapper>
          <IconButton
            type="button"
            variant="ghost"
            aria-label="Show password"
          >
            <EyeIcon />
          </IconButton>
        </InputGroup>
        <InputHelperText>Field with an icon button.</InputHelperText>
      </InputBase>
    </Flex>
  ),
};
