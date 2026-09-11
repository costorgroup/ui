import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useRef } from 'react';
import { Flex, Text } from '../../../index';
import { CheckIcon } from '../../../icons';
import type { TPaletteColor } from '../../../theme/types';
import type { TAlertVariant } from '../../components/alert/types';
import type { TSnackbarPosition } from './shared-types';
import type { TSnackbarProviderProps } from './types';
import SnackbarProvider from './index';
import { useSnackbar } from '../../hooks/use-snackbar';
import { Button } from '../../index';

const SNACKBAR_COLORS: TPaletteColor[] = [
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

const VARIANTS: TAlertVariant[] = [
  'solid',
  'subtle',
  'surface',
];

type TSnackbarStoryArgs = TSnackbarProviderProps & {
  title: string;
  description: string;
  color?: TPaletteColor;
  variant?: TAlertVariant;
};

const EnqueueDemo = ({
  title,
  description,
  color,
  variant,
}: Pick<TSnackbarStoryArgs, 'title' | 'description' | 'color' | 'variant'>) => {
  const { enqueue } = useSnackbar();

  return (
    <Button
      onClick={() =>
        enqueue({
          title,
          description,
          color,
          variant,
        })
      }
    >
      Show snackbar
    </Button>
  );
};

const ColorsDemo = ({ variant }: Pick<TSnackbarStoryArgs, 'variant'>) => {
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
              description: `Snackbar with color="${color}" and variant="${variant ?? 'solid'}".`,
              color,
              variant,
            })
          }
        >
          {color}
        </Button>
      ))}
    </Flex>
  );
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
        })
      }
    >
      Show with icon
    </Button>
  );
};

const WithoutIconDemo = () => {
  const { enqueue } = useSnackbar();

  return (
    <Button
      variant="outline"
      onClick={() =>
        enqueue({
          title: 'Notice',
          description: 'No icon is shown unless you pass one.',
          color: 'info',
        })
      }
    >
      Show without icon
    </Button>
  );
};

const VariantsDemo = () => {
  const { enqueue } = useSnackbar();

  return (
    <Flex gap="sm" wrap="wrap">
      {VARIANTS.map((variant) => (
        <Button
          key={variant}
          variant="outline"
          onClick={() =>
            enqueue({
              title: variant,
              description: `Snackbar with variant="${variant}".`,
              color: 'primary',
              variant,
            })
          }
        >
          {variant}
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

const StackedDemo = () => {
  const { enqueue } = useSnackbar();
  const countRef = useRef(0);

  return (
    <Button
      onClick={() => {
        countRef.current += 1;
        enqueue({
          title: `Update ${countRef.current}`,
          description: 'Stacked snackbars share size="md". Hover to expand.',
          color: countRef.current % 2 === 0 ? 'success' : 'info',
        });
      }}
    >
      Enqueue snackbar
    </Button>
  );
};

const StretchDemo = () => {
  const { enqueue } = useSnackbar();

  return (
    <Flex gap="sm" wrap="wrap">
      <Button
        onClick={() =>
          enqueue({
            title: 'Short',
            description: 'Brief.',
            color: 'primary',
          })
        }
      >
        Short
      </Button>
      <Button
        onClick={() =>
          enqueue({
            title: 'Much longer notification',
            description:
              'All snackbars share the same width when stretch is enabled on the provider.',
            color: 'success',
          })
        }
      >
        Long
      </Button>
    </Flex>
  );
};

const meta: Meta<TSnackbarStoryArgs> = {
  title: 'V3/Feedback/Snackbar',
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
    color: {
      control: 'select',
      options: SNACKBAR_COLORS,
    },
    variant: {
      control: 'select',
      options: VARIANTS,
    },
    stretch: {
      control: 'boolean',
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
    color: 'primary',
    variant: 'solid',
  },
  render: ({ title, description, color, variant, ...providerArgs }) => (
    <SnackbarProvider {...providerArgs}>
      <EnqueueDemo
        title={title}
        description={description}
        color={color}
        variant={variant}
      />
    </SnackbarProvider>
  ),
};

export const Colors: Story = {
  args: {
    position: 'bottom-right',
    duration: 4000,
    variant: 'solid',
  },
  render: ({ variant, ...providerArgs }) => (
    <SnackbarProvider {...providerArgs}>
      <Flex direction="column" gap="md">
        <Text>
          Pick a variant in controls, then click a color to preview every palette.
        </Text>
        <ColorsDemo variant={variant} />
      </Flex>
    </SnackbarProvider>
  ),
};

export const Variants: Story = {
  render: () => (
    <SnackbarProvider position="bottom-right" duration={4000}>
      <Flex direction="column" gap="md">
        <Text>Pass variant to match alert styles.</Text>
        <VariantsDemo />
      </Flex>
    </SnackbarProvider>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <SnackbarProvider position="bottom-right" duration={4000}>
      <Flex direction="column" gap="md">
        <Text>Icon is only shown when explicitly passed.</Text>
        <Flex gap="sm">
          <WithIconDemo />
          <WithoutIconDemo />
        </Flex>
      </Flex>
    </SnackbarProvider>
  ),
};

export const TopLeft: Story = {
  args: Default.args,
  render: ({ title, description, color, variant, ...providerArgs }) => (
    <SnackbarProvider {...providerArgs} position="top-left">
      <EnqueueDemo
        title={title}
        description={description}
        color={color}
        variant={variant}
      />
    </SnackbarProvider>
  ),
};

export const TopRight: Story = {
  args: Default.args,
  render: ({ title, description, color, variant, ...providerArgs }) => (
    <SnackbarProvider {...providerArgs} position="top-right">
      <EnqueueDemo
        title={title}
        description={description}
        color={color}
        variant={variant}
      />
    </SnackbarProvider>
  ),
};

export const BottomLeft: Story = {
  args: Default.args,
  render: ({ title, description, color, variant, ...providerArgs }) => (
    <SnackbarProvider {...providerArgs} position="bottom-left">
      <EnqueueDemo
        title={title}
        description={description}
        color={color}
        variant={variant}
      />
    </SnackbarProvider>
  ),
};

export const BottomRight: Story = {
  args: Default.args,
  render: ({ title, description, color, variant, ...providerArgs }) => (
    <SnackbarProvider {...providerArgs} position="bottom-right">
      <EnqueueDemo
        title={title}
        description={description}
        color={color}
        variant={variant}
      />
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

export const Stacked: Story = {
  render: () => (
    <SnackbarProvider
      stacked
      size="md"
      maxVisible={3}
      position="bottom-right"
      duration={8000}
    >
      <Flex direction="column" gap="md">
        <Text>
          Enqueue several snackbars. Only 3 are visible in a stack; hover to
          expand. Closing one brings the next from the queue. stacked requires
          a shared size.
        </Text>
        <StackedDemo />
      </Flex>
    </SnackbarProvider>
  ),
};

export const Stretch: Story = {
  render: () => (
    <SnackbarProvider position="bottom-right" duration={6000} stretch>
      <Flex direction="column" gap="md">
        <Text>All snackbars match the width of the widest one.</Text>
        <StretchDemo />
      </Flex>
    </SnackbarProvider>
  ),
};
