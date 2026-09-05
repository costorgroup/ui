import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Section } from './index';
import { SectionGroup } from './section-group';
import type { TSectionAlign, TSectionVariant } from './section-group';

const ALIGNS: TSectionAlign[] = ['left', 'center', 'right'];
const VARIANTS: TSectionVariant[] = ['halo', 'dot', 'line', 'none'];

const meta: Meta<typeof SectionGroup> = {
  title: 'Layout/Section',
  component: SectionGroup,
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'select',
      options: ALIGNS,
    },
    variant: {
      control: 'select',
      options: VARIANTS,
    },
    gap: {
      control: 'text',
    },
    color: {
      control: 'select',
      options: [
        'base',
        'primary',
        'secondary',
        'success',
        'error',
        'warning',
        'info',
        'dark',
        'light',
      ],
    },
  },
  args: {
    align: 'left',
    color: 'primary',
    variant: 'halo',
    gap: 'xl',
  },
};

export default meta;

type Story = StoryObj<typeof SectionGroup>;

const sections = [
  {
    title: 'Discover',
    body: 'Browse the catalog and pick the building blocks that fit your product.',
  },
  {
    title: 'Compose',
    body: 'Stack sections into a vertical path. Markers and the connecting line follow the group alignment.',
  },
  {
    title: 'Ship',
    body: 'Drop the group into any layout surface. Title and content stay aligned with the path.',
  },
];

export const Default: Story = {
  render: (args) => (
    <SectionGroup {...args} style={{ maxWidth: 480 }}>
      {sections.map((item) => (
        <Section key={item.title} title={item.title}>
          {item.body}
        </Section>
      ))}
    </SectionGroup>
  ),
};

export const Alignments: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: 32,
      }}
    >
      {ALIGNS.map((align) => (
        <SectionGroup key={align} align={align} color="primary" variant="halo">
          {sections.map((item) => (
            <Section key={item.title} title={item.title}>
              {item.body}
            </Section>
          ))}
        </SectionGroup>
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 32,
      }}
    >
      {VARIANTS.map((variant) => (
        <div key={variant}>
          <p style={{ margin: '0 0 12px', fontWeight: 600 }}>{variant}</p>
          <SectionGroup align="left" color="primary" variant={variant}>
            {sections.map((item) => (
              <Section key={item.title} title={item.title}>
                {item.body}
              </Section>
            ))}
          </SectionGroup>
        </div>
      ))}
    </div>
  ),
};

export const Gaps: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40, maxWidth: 480 }}>
      <SectionGroup align="left" variant="halo" gap="sm">
        <Section title="gap=&quot;sm&quot;">Theme gap key</Section>
        <Section title="Next">Still connected</Section>
      </SectionGroup>
      <SectionGroup align="left" variant="halo" gap={8}>
        <Section title="gap={8}">Number → theme.spacing(8)</Section>
        <Section title="Next">Still connected</Section>
      </SectionGroup>
      <SectionGroup align="left" variant="halo" gap="2.5rem">
        <Section title='gap="2.5rem"'>Raw CSS length</Section>
        <Section title="Next">Still connected</Section>
      </SectionGroup>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40, maxWidth: 480 }}>
      {(['primary', 'secondary', 'success', 'info'] as const).map((color) => (
        <SectionGroup key={color} align="left" color={color} variant="halo">
          <Section title={`${color} path`}>
            Path color follows the group palette token.
          </Section>
          <Section title="Next stop">
            Markers and the connecting line share the same color.
          </Section>
        </SectionGroup>
      ))}
    </div>
  ),
};
