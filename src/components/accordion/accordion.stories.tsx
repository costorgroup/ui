import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import type { TPaletteColor } from '../../theme/types';
import { Accordion, AccordionGroup, Text, Flex } from '../..';
import type { TAccordionRadius, TAccordionSize } from './types';
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
  'inverted',
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
const RADIUS: TAccordionRadius[] = [
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'pill',
  'full',
];

const meta: Meta<typeof Accordion> = {
  title: 'Data Display/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  args: {
    color: 'default',
    variant: 'subtle',
    size: 'md',
    radius: 'md',
    colorScope: 'all',
    forceContrastText: false,
  },
  argTypes: {
    colorScope: {
      control: 'inline-radio',
      options: ['all', 'summary'],
    },
    forceContrastText: {
      control: 'boolean',
    },
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
      options: RADIUS,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    summary: 'Summary',
    children: 'Details content goes here.',
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
  render: (args) => (
    <Flex direction="column" gap="md" style={{ width: 420 }}>
      {VARIANTS.map((variant) => (
        <Accordion
          key={variant}
          summary={variant}
          variant={variant}
          color={args.color}
          size={args.size}
          radius={args.radius}
          colorScope={args.colorScope}
          forceContrastText={args.forceContrastText}
          defaultExpanded
        >
          {variant} variant details.
        </Accordion>
      ))}
    </Flex>
  ),
};

export const ColorScope: Story = {
  args: {
    color: 'primary',
    variant: 'solid',
  },
  render: (args) => (
    <Flex direction="column" gap="md" style={{ width: 420 }}>
      {(['all', 'summary'] as const).map((colorScope) => (
        <Accordion
          key={colorScope}
          {...args}
          summary={`colorScope="${colorScope}"`}
          colorScope={colorScope}
          defaultExpanded
        >
          {colorScope === 'all'
            ? 'The whole accordion follows the color.'
            : 'Only the summary follows the color; details stay neutral.'}
        </Accordion>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Flex direction="column" gap="md" style={{ width: 420 }}>
      {SIZES.map((size) => (
        <Accordion
          key={size}
          summary={size}
          size={size}
          color={args.color}
          variant={args.variant}
          radius={args.radius}
          defaultExpanded
        >
          {size} size accordion details.
        </Accordion>
      ))}
    </Flex>
  ),
};

export const Controlled: Story = {
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
    variant: 'surface',
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
