import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import {
  AmericanExpressLogo,
  DinersClubLogo,
  DiscoverLogo,
  JcbLogo,
  MaestroLogo,
  MastercardLogo,
  UnionPayLogo,
  VisaLogo,
} from './';
import type { TLogoVariant } from './types';

const logos = [
  { name: 'VisaLogo', Logo: VisaLogo },
  { name: 'MastercardLogo', Logo: MastercardLogo },
  { name: 'AmericanExpressLogo', Logo: AmericanExpressLogo },
  { name: 'DiscoverLogo', Logo: DiscoverLogo },
  { name: 'DinersClubLogo', Logo: DinersClubLogo },
  { name: 'JcbLogo', Logo: JcbLogo },
  { name: 'UnionPayLogo', Logo: UnionPayLogo },
  { name: 'MaestroLogo', Logo: MaestroLogo },
] as const;

const variants: TLogoVariant[] = ['clean', 'realistic'];

const meta: Meta = {
  title: 'Utilities/Logos',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj;

const Tile = ({
  name,
  children,
  dark = false,
}: {
  name: string;
  children: React.ReactNode;
  dark?: boolean;
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '1rem',
      borderRadius: '0.5rem',
      background: dark ? '#1c1c1f' : '#f7f7f8',
      color: dark ? '#f7f7f8' : '#1c1c1f',
    }}
  >
    {children}
    <span style={{ fontSize: '0.75rem', textAlign: 'center' }}>{name}</span>
  </div>
);

const Grid = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(8.5rem, 1fr))',
      gap: '1rem',
    }}
  >
    {children}
  </div>
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
    <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{title}</span>
    {children}
  </div>
);

export const All: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {variants.map((variant) => (
        <Section key={variant} title={variant}>
          <Grid>
            {logos.map(({ name, Logo }) => (
              <Tile
                key={`${name}-${variant}`}
                name={name}
                dark={variant === 'clean'}
              >
                <Logo variant={variant} />
              </Tile>
            ))}
          </Grid>
        </Section>
      ))}
    </div>
  ),
};

const Pair = ({
  name,
  Logo,
}: {
  name: string;
  Logo: (typeof logos)[number]['Logo'];
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, minmax(8.5rem, 1fr))',
      gap: '1rem',
    }}
  >
    {variants.map((variant) => (
      <Tile key={variant} name={`${name} · ${variant}`} dark={variant === 'clean'}>
        <Logo variant={variant} />
      </Tile>
    ))}
  </div>
);

export const Visa: Story = {
  render: () => <Pair name="VisaLogo" Logo={VisaLogo} />,
};

export const Mastercard: Story = {
  render: () => <Pair name="MastercardLogo" Logo={MastercardLogo} />,
};

export const AmericanExpress: Story = {
  render: () => (
    <Pair name="AmericanExpressLogo" Logo={AmericanExpressLogo} />
  ),
};

export const Discover: Story = {
  render: () => <Pair name="DiscoverLogo" Logo={DiscoverLogo} />,
};

export const DinersClub: Story = {
  render: () => <Pair name="DinersClubLogo" Logo={DinersClubLogo} />,
};

export const Jcb: Story = {
  render: () => <Pair name="JcbLogo" Logo={JcbLogo} />,
};

export const UnionPay: Story = {
  render: () => <Pair name="UnionPayLogo" Logo={UnionPayLogo} />,
};

export const Maestro: Story = {
  render: () => <Pair name="MaestroLogo" Logo={MaestroLogo} />,
};
