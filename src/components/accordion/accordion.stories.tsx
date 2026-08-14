import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Accordion, Flex, Text } from '../../index';
import { ArrowTopIcon } from '../../icons';
import type { TPaletteColor } from '../../theme/types';
import type { TAccordionVariant } from './accordion-base/context';

const COLORS: TPaletteColor[] = [
  'default',
  'primary',
  'secondary',
  'success',
  'error',
  'warning',
  'info',
  'dark',
  'light',
];

const VARIANTS: TAccordionVariant[] = [
  'solid',
  'subtle',
  'surface',
  'outline',
  'ghost',
  'plain',
];

const meta: Meta<typeof Accordion> = {
  title: 'Data Display/Accordion',
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
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    expandIconPosition: {
      control: 'inline-radio',
      options: ['left', 'right'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    summary: 'Summary',
    children: 'Hello',
    color: 'primary',
    variant: 'subtle',
    size: 'md',
  },
};

export const Controlled: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(false);

    return (
      <Flex direction="column" gap="sm" style={{ width: 420 }}>
        <Text size="sm">expanded: {String(expanded)}</Text>
        <Accordion
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

export const Variants: Story = {
  render: () => (
    <Flex direction="column" gap="md" style={{ width: 420 }}>
      {VARIANTS.map((variant) => (
        <Accordion
          key={variant}
          summary={variant}
          variant={variant}
          color="primary"
          defaultExpanded
        >
          {variant} variant accordion content.
        </Accordion>
      ))}
    </Flex>
  ),
};

export const IconPosition: Story = {
  render: () => (
    <Flex direction="column" gap="md" style={{ width: 420 }}>
      <Accordion summary="Icon on the right" defaultExpanded>
        Default expand icon position.
      </Accordion>
      <Accordion summary="Icon on the left" expandIconPosition="left">
        Expand icon rendered before the summary content.
      </Accordion>
      <Accordion summary="Custom icon" icon={<ArrowTopIcon />}>
        Uses ArrowTopIcon and still rotates 180° when expanded.
      </Accordion>
    </Flex>
  ),
};
