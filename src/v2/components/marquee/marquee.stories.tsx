import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Flex } from '../../../index';
import {
  AmericanExpressLogo,
  DinersClubLogo,
  DiscoverLogo,
  JcbLogo,
  MaestroLogo,
  MastercardLogo,
  UnionPayLogo,
  VisaLogo,
} from '../../../logos';
import { Marquee } from '../../index';

const meta: Meta<typeof Marquee> = {
  title: 'V3/Layout/Marquee',
  component: Marquee,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    autoPlay: { control: 'boolean' },
    speed: { control: 'number' },
    offset: { control: 'number' },
    pauseOnHover: { control: 'boolean' },
    paused: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Marquee>;

const LOGOS = [
  { name: 'Visa', Logo: VisaLogo },
  { name: 'Mastercard', Logo: MastercardLogo },
  { name: 'Amex', Logo: AmericanExpressLogo },
  { name: 'Discover', Logo: DiscoverLogo },
  { name: 'Diners', Logo: DinersClubLogo },
  { name: 'JCB', Logo: JcbLogo },
  { name: 'UnionPay', Logo: UnionPayLogo },
  { name: 'Maestro', Logo: MaestroLogo },
] as const;

const marks = () =>
  LOGOS.map(({ name, Logo }) => <Logo key={name} variant="realistic" />);

export const Default: Story = {
  args: {
    direction: 'left',
    autoPlay: true,
    speed: 40,
    gap: 'lg',
    pauseOnHover: true,
  },
  render: (args) => <Marquee {...args}>{marks()}</Marquee>,
};

export const MixedSizes: Story = {
  render: () => (
    <Marquee autoPlay speed={36} gap="lg">
      <VisaLogo variant="realistic" width={96} height={31} />
      <MastercardLogo variant="realistic" width={56} height={35} />
      <AmericanExpressLogo variant="realistic" width={80} height={22} />
      <DiscoverLogo variant="realistic" width={72} height={28} />
      <JcbLogo variant="realistic" width={48} height={36} />
      <UnionPayLogo variant="realistic" width={64} height={40} />
      <MaestroLogo variant="realistic" width={52} height={32} />
      <DinersClubLogo variant="realistic" width={88} height={24} />
    </Marquee>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Marquee
      direction="top"
      autoPlay
      speed={32}
      gap="lg"
      style={{ height: 230 }}
    >
      {marks()}
    </Marquee>
  ),
};

export const Directions: Story = {
  render: () => (
    <Flex direction="column" gap="lg">
      {(['left', 'right'] as const).map((direction) => (
        <Marquee
          key={direction}
          autoPlay
          speed={40}
          gap="lg"
          direction={direction}
        >
          {marks()}
        </Marquee>
      ))}
      <Flex gap="lg">
        {(['top', 'bottom'] as const).map((direction) => (
          <Marquee
            key={direction}
            autoPlay
            speed={36}
            gap="lg"
            direction={direction}
            style={{ height: 230 }}
          >
            {marks()}
          </Marquee>
        ))}
      </Flex>
    </Flex>
  ),
};

export const Rows: Story = {
  render: () => (
    <Flex direction="column" gap="lg">
      <Marquee autoPlay speed={44} gap="lg">
        {marks()}
      </Marquee>
      <Marquee autoPlay speed={44} gap="lg" offset={72}>
        {marks()}
      </Marquee>
    </Flex>
  ),
};

export const DragOnly: Story = {
  render: () => <Marquee gap="lg">{marks()}</Marquee>,
};
