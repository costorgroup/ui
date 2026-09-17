import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { CSSProperties } from 'react';
import { CheckIcon, ImageIcon, UploadIcon } from '../../icons';
import type { TPaletteColor } from '../../theme/types';
import { useTheme } from '../../theme';
import { FloatingProvider } from '../../providers/floating';
import { Floating, IconButton, SpeedDial, Text, Flex } from '../..';
import type { TIconButtonSize, TIconButtonVariant } from '../icon-button/types';
import type { TSpeedDialItemsDirection } from './types';

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

const VARIANTS: TIconButtonVariant[] = [
  'solid',
  'subtle',
  'surface',
  'outline',
  'ghost',
  'plain',
];

const SIZES: TIconButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const DIRECTIONS: TSpeedDialItemsDirection[] = [
  'top',
  'right',
  'bottom',
  'left',
];

const Frame = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const style: CSSProperties = {
    position: 'relative',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 560,
    aspectRatio: '16 / 10',
    overflow: 'hidden',
    transform: 'translateZ(0)',
    border: `1px solid ${theme.surfaces.border}`,
    background: theme.surfaces.background,
  };

  return <div style={style}>{children}</div>;
};

const Actions = () => (
  <>
    <IconButton aria-label="Upload" radius="pill" size="md">
      <UploadIcon />
    </IconButton>
    <IconButton aria-label="Image" radius="pill" size="md">
      <ImageIcon />
    </IconButton>
    <IconButton aria-label="Done" radius="pill" size="md">
      <CheckIcon />
    </IconButton>
  </>
);

const meta: Meta<typeof SpeedDial> = {
  title: 'Buttons/SpeedDial',
  component: SpeedDial,
  tags: ['autodocs'],
  parameters: {
    frame: true,
  },
  decorators: [
    (Story, { parameters }) =>
      parameters.frame === false ? (
        <Story />
      ) : (
        <Frame>
          <Story />
        </Frame>
      ),
  ],
  argTypes: {
    itemsDirection: { control: 'select', options: DIRECTIONS },
    itemsGap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    size: { control: 'select', options: SIZES },
    variant: { control: 'select', options: VARIANTS },
    appearance: { control: 'select', options: ['opaque', 'transparent'] },
    color: { control: 'select', options: COLORS },
    radius: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'pill'],
    },
    disabled: { control: 'boolean' },
  },
  args: {
    itemsDirection: 'top',
    itemsGap: 'sm',
    gap: 'md',
    color: 'default',
    variant: 'solid',
    appearance: 'opaque',
    size: 'lg',
    radius: 'pill',
    disabled: false,
    'aria-label': 'Create',
  },
};

export default meta;

type Story = StoryObj<typeof SpeedDial>;

export const Playground: Story = {
  tags: ['!dev'],
  args: {
    defaultOpen: true,
  },
  render: (args) => (
    <SpeedDial {...args}>
      <Actions />
    </SpeedDial>
  ),
};

export const Colors: Story = {
  parameters: { frame: false },
  render: () => (
    <Flex gap="xl" wrap="wrap" align="center" justify="center">
      {COLORS.map((color) => (
        <SpeedDial
          key={color}
          color={color}
          defaultOpen
          aria-label={color}
        >
          <Actions />
        </SpeedDial>
      ))}
    </Flex>
  ),
};

export const Variants: Story = {
  parameters: { frame: false },
  render: () => (
    <Flex gap="xl" wrap="wrap" align="flex-end" justify="center">
      {VARIANTS.map((variant) => (
        <Flex key={variant} direction="column" gap="xs" align="center">
          <SpeedDial variant={variant} defaultOpen aria-label={variant}>
            <Actions />
          </SpeedDial>
          <Text size="sm">{variant}</Text>
        </Flex>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  parameters: { frame: false },
  render: () => (
    <Flex gap="xl" wrap="wrap" align="flex-end" justify="center">
      {SIZES.map((size) => (
        <SpeedDial key={size} size={size} defaultOpen aria-label={size}>
          <Actions />
        </SpeedDial>
      ))}
    </Flex>
  ),
};

export const Directions: Story = {
  parameters: { frame: false },
  render: () => (
    <Flex gap="xl" wrap="wrap" align="center" justify="center">
      {DIRECTIONS.map((itemsDirection) => (
        <Flex key={itemsDirection} direction="column" gap="xs" align="center">
          <SpeedDial
            itemsDirection={itemsDirection}
            defaultOpen
            aria-label={itemsDirection}
          >
            <Actions />
          </SpeedDial>
          <Text size="sm">{itemsDirection}</Text>
        </Flex>
      ))}
    </Flex>
  ),
};

export const InFloating: Story = {
  parameters: { frame: false },
  decorators: [
    (Story) => (
      <Frame>
        <FloatingProvider position="bottom-right" itemsDirection="vertical">
          <Story />
        </FloatingProvider>
      </Frame>
    ),
  ],
  render: () => (
    <Floating>
      <SpeedDial aria-label="Create">
        <Actions />
      </SpeedDial>
    </Floating>
  ),
};
