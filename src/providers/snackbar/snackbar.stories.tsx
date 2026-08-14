import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button, Flex, Text } from '../../index';
import { CheckIcon } from '../../icons';
import type { TAlertVariant } from '../../components/alert/types';
import type { TPaletteColor } from '../../theme/types';
import type { TSnackbarPosition } from './shared-types';
import type { TSnackbarProviderProps } from './types';
import SnackbarProvider from './index';
import { useSnackbar } from '../../hooks/use-snackbar';

const SNACKBAR_COLORS: TPaletteColor[] = [
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

const SNACKBAR_VARIANTS: TAlertVariant[] = [
  'solid',
  'subtle',
  'surface',
  'outline',
  'ghost',
  'plain',
];

type TSnackbarStoryArgs = TSnackbarProviderProps & {
  title: string;
  description: string;
};

const BasicDemo = () => {
  const { enqueue } = useSnackbar();

  return (
    <Button
      onClick={() =>
        enqueue({
          title: 'Snackbar',
          description: 'Something happened.',
        })
      }
    >
      Show snackbar
    </Button>
  );
};

const ColorsDemo = () => {
  const { enqueue } = useSnackbar();

  return (
    <Flex gap="sm" wrap="wrap">
      {SNACKBAR_COLORS.map((color) => (
        <Button
          key={color}
          color={color}
          onClick={() =>
            enqueue({
              title: `${color[0].toUpperCase()}${color.slice(1)}`,
              description: `Snackbar with color="${color}".`,
              color,
            })
          }
        >
          {color}
        </Button>
      ))}
    </Flex>
  );
};

const CustomDemo = () => {
  const { enqueue } = useSnackbar();

  return (
    <Button
      variant="outline"
      onClick={() =>
        enqueue({
          title: 'Custom render',
          description: 'Exception snackbar with a custom body.',
          duration: 6000,
          render: ({ title, description, onClose }) => (
            <div
              style={{
                padding: 12,
                borderRadius: 8,
                background: '#0b1a3b',
                color: '#fff',
              }}
            >
              <strong>{title}</strong>
              <div style={{ marginTop: 4 }}>{description}</div>
              <Button color="light" size="sm" style={{ marginTop: 8 }} onClick={onClose}>
                Close
              </Button>
            </div>
          ),
        })
      }
    >
      Show custom snackbar
    </Button>
  );
};

const meta: Meta<TSnackbarStoryArgs> = {
  title: 'Feedbacks/Snackbar',
  component: SnackbarProvider,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
      ] satisfies TSnackbarPosition[],
    },
    duration: {
      control: 'number',
    },
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<TSnackbarStoryArgs>;

export const Default: Story = {
  args: {
    position: 'bottom-right',
    duration: 4000,
    title: 'Snackbar',
    description: 'Something happened.',
  },
  render: (providerArgs) => (
    <SnackbarProvider {...providerArgs}>
      <BasicDemo />
    </SnackbarProvider>
  ),
};

export const Colors: Story = {
  render: () => (
    <SnackbarProvider position="bottom-right" duration={4000}>
      <Flex direction="column" gap="md">
        <Text>All palette colors.</Text>
        <ColorsDemo />
      </Flex>
    </SnackbarProvider>
  ),
};

export const TopLeft: Story = {
  render: () => (
    <SnackbarProvider position="top-left" duration={4000}>
      <BasicDemo />
    </SnackbarProvider>
  ),
};

export const TopRight: Story = {
  render: () => (
    <SnackbarProvider position="top-right" duration={4000}>
      <BasicDemo />
    </SnackbarProvider>
  ),
};

export const BottomLeft: Story = {
  render: () => (
    <SnackbarProvider position="bottom-left" duration={4000}>
      <BasicDemo />
    </SnackbarProvider>
  ),
};

export const BottomRight: Story = {
  render: () => (
    <SnackbarProvider position="bottom-right" duration={4000}>
      <BasicDemo />
    </SnackbarProvider>
  ),
};

export const CustomRender: Story = {
  render: () => (
    <SnackbarProvider position="bottom-right" duration={6000}>
      <Flex direction="column" gap="md">
        <Text>Per-enqueue custom render override.</Text>
        <CustomDemo />
      </Flex>
    </SnackbarProvider>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <SnackbarProvider position="bottom-right" duration={4000}>
      <Button
        onClick={() => {
          /* rendered via nested component below */
        }}
      >
        unused
      </Button>
      <WithIconDemo />
    </SnackbarProvider>
  ),
};

const WithIconDemo = () => {
  const { enqueue } = useSnackbar();
  return (
    <Button
      onClick={() =>
        enqueue({
          title: 'Saved',
          description: 'Your changes were stored.',
          color: 'success',
          icon: <CheckIcon />,
          variant: SNACKBAR_VARIANTS[1],
        })
      }
    >
      Show with icon
    </Button>
  );
};
