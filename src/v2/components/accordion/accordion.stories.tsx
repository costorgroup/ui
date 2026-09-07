import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Flex } from '../../../index';
import type { TPaletteColor } from '../../../theme/types';
import { Accordion, AccordionGroup, Text } from '../../index';
import type { TAccordionSize } from './types';
import type { TAccordionVariant } from './variant-styles';

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
];

const VARIANTS: TAccordionVariant[] = [
  'solid',
  'subtle',
  'surface',
  'outline',
  'ghost',
  'plain',
];

const SIZES: TAccordionSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta: Meta<typeof Accordion> = {
  title: 'V2/Data Display/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    expanded: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    color: {
      control: 'select',
      options: COLORS,
    },
    variant: {
      control: 'select',
      options: VARIANTS,
    },
    size: {
      control: 'select',
      options: SIZES,
    },
    expandIconPosition: {
      control: 'inline-radio',
      options: ['left', 'right'],
    },
    radius: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large', 'pill', 'circle'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    summary: 'Summary',
    children: 'Details content goes here.',
    color: 'default',
    variant: 'subtle',
    size: 'md',
    defaultExpanded: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 420 }}>
        <Story />
      </div>
    ),
  ],
};

export const Expanded: Story = {
  args: {
    summary: 'Account settings',
    children: (
      <Text size="sm">
        Manage your profile, security preferences, and notification settings.
      </Text>
    ),
    color: 'default',
    variant: 'subtle',
    size: 'md',
    defaultExpanded: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 420 }}>
        <Story />
      </div>
    ),
  ],
};

export const Variants: Story = {
  args: {
    color: 'default',
  },
  render: (args) => (
    <Flex direction="column" gap="md" style={{ width: 420 }}>
      {VARIANTS.map((variant) => (
        <Accordion
          key={variant}
          summary={variant}
          variant={variant}
          color={args.color}
          size={args.size}
          defaultExpanded
        >
          {variant} variant details use idle chrome fill.
        </Accordion>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  args: {
    color: 'default',
    variant: 'subtle',
  },
  render: (args) => (
    <Flex direction="column" gap="md" style={{ width: 420 }}>
      {SIZES.map((size) => (
        <Accordion
          key={size}
          summary={size}
          size={size}
          color={args.color}
          variant={args.variant}
          defaultExpanded
        >
          {size} size accordion details.
        </Accordion>
      ))}
    </Flex>
  ),
};

export const Controlled: Story = {
  args: {
    color: 'default',
    variant: 'subtle',
    size: 'md',
  },
  render: function ControlledStory(args) {
    const [expanded, setExpanded] = useState(false);

    return (
      <Flex direction="column" gap="sm" style={{ width: 420 }}>
        <Text size="sm">expanded: {String(expanded)}</Text>
        <Accordion
          {...args}
          summary="Controlled accordion"
          expanded={expanded}
          onChange={(_, next) => setExpanded(next)}
        >
          State is owned by the parent via expanded and onChange.
        </Accordion>
      </Flex>
    );
  },
};

export const IconPosition: Story = {
  args: {
    color: 'default',
    variant: 'subtle',
    size: 'md',
  },
  render: (args) => (
    <Flex direction="column" gap="md" style={{ width: 420 }}>
      <Accordion {...args} summary="Icon on the right" defaultExpanded>
        Default expand icon position.
      </Accordion>
      <Accordion {...args} summary="Icon on the left" expandIconPosition="left">
        Expand icon rendered before the summary content.
      </Accordion>
    </Flex>
  ),
};

export const Grouped: Story = {
  args: {
    color: 'default',
    variant: 'surface',
    size: 'md',
    radius: 'medium',
  },
  render: (args) => (
    <AccordionGroup
      color={args.color}
      variant={args.variant}
      size={args.size}
      radius={args.radius}
      style={{ width: 420 }}
    >
      <Accordion summary="General">
        General settings content.
      </Accordion>
      <Accordion summary="Privacy" defaultExpanded>
        Privacy settings content.
      </Accordion>
      <Accordion summary="Advanced">
        Advanced settings content.
      </Accordion>
    </AccordionGroup>
  ),
};
