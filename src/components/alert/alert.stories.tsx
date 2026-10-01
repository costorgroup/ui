import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { CheckIcon } from '../../icons';
import type { TPaletteColor } from '../../theme/types';
import { Button, Flex } from '../..';
import type {
  TAlertActionsPlacement,
  TAlertAlign,
  TAlertRadius,
  TAlertSize,
  TAlertVariant,
} from './types';
import { Alert } from './';

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

const VARIANTS: TAlertVariant[] = ['solid', 'subtle', 'surface'];
const SIZES: TAlertSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const RADIUS: TAlertRadius[] = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'pill'];
const ALIGN: TAlertAlign[] = ['start', 'center', 'end'];
const PLACEMENT: TAlertActionsPlacement[] = ['bottom', 'end'];

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: {
    color: 'primary',
    variant: 'subtle',
    size: 'md',
    radius: 'md',
    title: 'Heads up',
    icon: <CheckIcon />,
    children: 'Something needs your attention.',
  },
  argTypes: {
    color: { control: 'select', options: COLORS },
    variant: { control: 'select', options: VARIANTS },
    size: { control: 'select', options: SIZES },
    radius: { control: 'select', options: RADIUS },
    iconAlign: { control: 'inline-radio', options: ALIGN },
    actionsPlacement: { control: 'inline-radio', options: PLACEMENT },
    actionsAlign: { control: 'inline-radio', options: ALIGN },
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Playground: Story = {
  tags: ['!dev'],
  args: {
    actions: (
      <>
        <Button size="sm" variant="ghost">
          Dismiss
        </Button>
        <Button size="sm">Review</Button>
      </>
    ),
  },
};

export const Colors: Story = {
  render: (args) => (
    <Flex direction="column" gap="md">
      {COLORS.map((color) => (
        <Alert
          key={color}
          {...args}
          color={color}
          title={color}
        >
          Description inherits the alert text color.
        </Alert>
      ))}
    </Flex>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <Flex direction="column" gap="md">
      {VARIANTS.map((variant) => (
        <Alert
          key={variant}
          {...args}
          variant={variant}
          title={variant}
        >
          Description inherits the alert text color.
        </Alert>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Flex direction="column" gap="md">
      {SIZES.map((size) => (
        <Alert key={size} {...args} size={size} title={size}>
          Scaled padding, type, and icon from the theme size step.
        </Alert>
      ))}
    </Flex>
  ),
};

export const Radius: Story = {
  render: (args) => (
    <Flex direction="column" gap="md">
      {RADIUS.map((radius) => (
        <Alert key={radius} {...args} radius={radius} title={radius}>
          Corner radius from the theme.
        </Alert>
      ))}
    </Flex>
  ),
};

export const Closable: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);

    if (!open) {
      return <Button onClick={() => setOpen(true)}>Show alert</Button>;
    }

    return (
      <Alert
        {...args}
        color="error"
        title="Could not save"
        onClose={() => setOpen(false)}
      >
        Check your connection and try again.
      </Alert>
    );
  },
};

export const WithActions: Story = {
  args: {
    actions: (
      <>
        <Button size="sm" variant="ghost">
          Dismiss
        </Button>
        <Button size="sm">Review</Button>
      </>
    ),
  },
};

const LAYOUT_ACTIONS = (
  <>
    <Button size="sm" variant="ghost">
      Dismiss
    </Button>
    <Button size="sm">Review</Button>
  </>
);

/** Icon and action alignment combinations. With actions at the `end`,
 * `actionsAlign` is vertical; at the `bottom`, it is horizontal. */
export const Layouts: Story = {
  render: (args) => (
    <Flex direction="column" gap="md" style={{ maxWidth: 560 }}>
      <Alert {...args} actions={LAYOUT_ACTIONS} />
      <Alert
        {...args}
        actions={LAYOUT_ACTIONS}
        actionsAlign="start"
        title="Actions bottom-left"
      />
      <Alert
        {...args}
        iconAlign="center"
        actionsPlacement="end"
        actions={LAYOUT_ACTIONS}
        title="Icon and actions centered"
      />
      <Alert
        {...args}
        actionsPlacement="end"
        actionsAlign="end"
        actions={LAYOUT_ACTIONS}
        title="Actions bottom-right, beside the message"
      >
        A longer description that wraps onto a second line, so the
        difference between top, center and bottom alignment is visible.
      </Alert>
      <Alert
        {...args}
        iconAlign="end"
        actionsPlacement="end"
        actionsAlign="start"
        actions={LAYOUT_ACTIONS}
        title="Icon bottom, actions top"
      >
        A longer description that wraps onto a second line, so the
        difference between top, center and bottom alignment is visible.
      </Alert>
    </Flex>
  ),
};
