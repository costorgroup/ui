import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import type { TPaletteColor } from '../../theme/types';
import { Flex, Text } from '../../index';
import { ArrowTopIcon } from '../../icons';
import { AccordionBase } from './accordion-base';
import { AccordionSummary } from './accordion-summary';
import { AccordionDetails } from './accordion-details';
import { AccordionGroup } from './accordion-group';
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

const meta: Meta<typeof AccordionBase> = {
  title: 'Components/Accordion/Parts',
  component: AccordionBase,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AccordionBase>;

export const Default: Story = {
  args: {
    color: 'primary',
    variant: 'subtle',
    size: 'md',
  },
  render: function DefaultStory(args) {
    return (
      <AccordionBase {...args} style={{ width: 420 }}>
        <AccordionSummary>Accordion title</AccordionSummary>
        <AccordionDetails>
          <Text>
            Details content expands and collapses with a short height animation.
          </Text>
        </AccordionDetails>
      </AccordionBase>
    );
  },
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [expanded, setExpanded] = useState(false);

    return (
      <Flex direction="column" gap="sm" style={{ width: 420 }}>
        <Text size="sm">expanded: {String(expanded)}</Text>
        <AccordionBase
          expanded={expanded}
          onChange={(_, next) => setExpanded(next)}
        >
          <AccordionSummary>Controlled accordion</AccordionSummary>
          <AccordionDetails>
            <Text>State is owned by the parent via expanded and onChange.</Text>
          </AccordionDetails>
        </AccordionBase>
      </Flex>
    );
  },
};

export const Variants: Story = {
  render: () => (
    <Flex direction="column" gap="md" style={{ width: 420 }}>
      {VARIANTS.map((variant) => (
        <AccordionBase
          key={variant}
          variant={variant}
          color="primary"
          defaultExpanded
        >
          <AccordionSummary>{variant}</AccordionSummary>
          <AccordionDetails>
            <Text>{variant} variant accordion content.</Text>
          </AccordionDetails>
        </AccordionBase>
      ))}
    </Flex>
  ),
};

export const Colors: Story = {
  render: () => (
    <Flex direction="column" gap="md" style={{ width: 420 }}>
      {COLORS.map((color) => (
        <AccordionBase key={color} color={color} variant="subtle">
          <AccordionSummary>{color}</AccordionSummary>
          <AccordionDetails>
            <Text>{color} subtle accordion.</Text>
          </AccordionDetails>
        </AccordionBase>
      ))}
    </Flex>
  ),
};

export const ExpandIconPosition: Story = {
  render: () => (
    <Flex direction="column" gap="md" style={{ width: 420 }}>
      <AccordionBase defaultExpanded>
        <AccordionSummary expandIconPosition="right">
          Icon on the right
        </AccordionSummary>
        <AccordionDetails>
          <Text>Default expand icon position.</Text>
        </AccordionDetails>
      </AccordionBase>
      <AccordionBase>
        <AccordionSummary expandIconPosition="left">
          Icon on the left
        </AccordionSummary>
        <AccordionDetails>
          <Text>Expand icon rendered before the summary content.</Text>
        </AccordionDetails>
      </AccordionBase>
      <AccordionBase>
        <AccordionSummary expandIcon={<ArrowTopIcon />}>
          Custom expand icon
        </AccordionSummary>
        <AccordionDetails>
          <Text>Uses ArrowTopIcon and still rotates 180° when expanded.</Text>
        </AccordionDetails>
      </AccordionBase>
    </Flex>
  ),
};

export const Group: Story = {
  render: () => (
    <AccordionGroup radius="medium" style={{ width: 420 }}>
      <AccordionBase variant="surface" color="primary">
        <AccordionSummary>First accordion</AccordionSummary>
        <AccordionDetails>
          <Text>Top corners are rounded.</Text>
        </AccordionDetails>
      </AccordionBase>
      <AccordionBase variant="surface" color="primary">
        <AccordionSummary>Middle accordion</AccordionSummary>
        <AccordionDetails>
          <Text>No corner radius between items.</Text>
        </AccordionDetails>
      </AccordionBase>
      <AccordionBase variant="surface" color="primary">
        <AccordionSummary>Last accordion</AccordionSummary>
        <AccordionDetails>
          <Text>Bottom corners are rounded.</Text>
        </AccordionDetails>
      </AccordionBase>
    </AccordionGroup>
  ),
};
