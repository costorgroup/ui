import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { ArrowBottomIcon } from '../../icons';
import type { TPaletteColor } from '../../theme/types';
import {
  Accordion,
  AccordionGroup,
  Flex,
  IconButton,
  Text,
  TextField,
} from '../..';
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
    color: 'primary',
    variant: 'subtle',
    size: 'md',
    radius: 'md',
    colorScope: 'summary',
    forceContrastText: false,
    appearance: 'opaque',
  },
  argTypes: {
    colorScope: {
      control: 'inline-radio',
      options: ['all', 'summary', 'none'],
    },
    appearance: {
      control: 'inline-radio',
      options: ['opaque', 'transparent'],
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
    icon: <ArrowBottomIcon width="0.875em" height="0.875em" />,
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
          appearance={args.appearance}
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
      {(['all', 'summary', 'none'] as const).map((colorScope) => (
        <Accordion
          key={colorScope}
          {...args}
          summary={`colorScope="${colorScope}"`}
          colorScope={colorScope}
          defaultExpanded
        >
          {
            {
              all: 'On expand, the whole accordion takes the color.',
              summary: 'On expand, only the summary row takes the color.',
              none: 'Expanding does not change any colors.',
            }[colorScope]
          }
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
      <Accordion {...args} summary="No icon" defaultExpanded>
        Without `icon`, no expand icon is shown.
      </Accordion>
      <Accordion
        {...args}
        summary="Icon on the right"
        icon={<ArrowBottomIcon width="0.875em" height="0.875em" />}
      >
        Default expand icon position.
      </Accordion>
      <Accordion
        {...args}
        summary="Icon on the left"
        icon={<ArrowBottomIcon width="0.875em" height="0.875em" />}
        expandIconPosition="left"
      >
        Expand icon rendered before the summary content.
      </Accordion>
    </Flex>
  ),
};

export const Grouped: Story = {
  render: (args) => (
    <AccordionGroup
      color={args.color}
      variant={args.variant}
      size={args.size}
      radius={args.radius}
      colorScope={args.colorScope}
      forceContrastText={args.forceContrastText}
      exclusive
      defaultValue="privacy"
      style={{ width: 420 }}
    >
      <Accordion summary="General">
        General settings content.
      </Accordion>
      <Accordion summary="Privacy" value="privacy">
        Privacy settings content.
      </Accordion>
      <Accordion summary="Advanced">
        Advanced settings content.
      </Accordion>
    </AccordionGroup>
  ),
};

type TJob = { id: string; role: string; company: string };

let jobSeed = 3;
const newJobId = () => `job-${(jobSeed += 1)}`;

const DuplicateIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth={2} />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" stroke="currentColor" strokeWidth={2} />
  </svg>
);

const TrashIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** The cv-builder list editor: one entry open at a time, duplicate / remove
 * on hover, drag by the grip, add row at the bottom. */
export const ListEditor: Story = {
  render: function ListEditorStory(args) {
    const [jobs, setJobs] = useState<TJob[]>([
      { id: 'job-1', role: 'Frontend Engineer', company: 'Costor' },
      { id: 'job-2', role: 'Designer', company: 'Acme' },
    ]);
    const [openId, setOpenId] = useState<string | null>(null);

    const update = (id: string, patch: Partial<TJob>) =>
      setJobs((list) =>
        list.map((job) => (job.id === id ? { ...job, ...patch } : job)),
      );

    const insertAt = (index: number, job: TJob) => {
      setJobs((list) => [...list.slice(0, index), job, ...list.slice(index)]);
      setOpenId(job.id);
    };

    return (
      <AccordionGroup
        color={args.color}
        variant={args.variant}
        size={args.size}
        radius={args.radius}
        colorScope={args.colorScope}
        forceContrastText={args.forceContrastText}
        appearance={args.appearance}
        value={openId}
        onValueChange={(_, next) => setOpenId(next)}
        onReorder={(from, to) =>
          setJobs((list) => {
            const next = [...list];
            const [moved] = next.splice(from, 1);
            next.splice(to, 0, moved);
            return next;
          })
        }
        onAdd={() =>
          insertAt(jobs.length, { id: newJobId(), role: '', company: '' })
        }
        addLabel="Add work experience"
        empty={
          <>
            <strong>No work experience yet</strong>
            Add the roles you want on your CV.
          </>
        }
        style={{ width: 480 }}
      >
        {jobs.map((job, index) => {
          const summary =
            [job.role, job.company].filter(Boolean).join(', ') ||
            'New position';

          return (
            <Accordion
              key={job.id}
              value={job.id}
              summary={summary}
              actions={
                <>
                  <IconButton
                    size="sm"
                    variant="ghost"
                    aria-label={`Duplicate ${summary}`}
                    title="Duplicate"
                    onClick={() =>
                      insertAt(index + 1, { ...job, id: newJobId() })
                    }
                  >
                    <DuplicateIcon />
                  </IconButton>
                  <IconButton
                    size="sm"
                    variant="ghost"
                    color="error"
                    aria-label={`Remove ${summary}`}
                    title="Remove"
                    onClick={() =>
                      setJobs((list) => list.filter(({ id }) => id !== job.id))
                    }
                  >
                    <TrashIcon />
                  </IconButton>
                </>
              }
            >
              <Flex direction="column" gap="md">
                <TextField
                  label="Role"
                  value={job.role}
                  onChange={(event) =>
                    update(job.id, { role: event.target.value })
                  }
                  fullWidth
                />
                <TextField
                  label="Company"
                  value={job.company}
                  onChange={(event) =>
                    update(job.id, { company: event.target.value })
                  }
                  fullWidth
                />
              </Flex>
            </Accordion>
          );
        })}
      </AccordionGroup>
    );
  },
};
