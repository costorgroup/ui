import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Section } from './index';
import { SectionContent } from './section-content';
import { SectionGroup } from './section-group';
import { SectionTitle } from './section-title';

const meta: Meta<typeof SectionGroup> = {
  title: 'Components/Section/Parts',
  component: SectionGroup,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SectionGroup>;

export const Default: Story = {
  render: (args) => (
    <SectionGroup {...args} align="left" color="primary" style={{ maxWidth: 480 }}>
      <Section>
        <SectionTitle>Install</SectionTitle>
        <SectionContent>
          Add the package and wrap your tree with the theme provider.
        </SectionContent>
      </Section>
      <Section>
        <SectionTitle>Compose parts</SectionTitle>
        <SectionContent>
          Use SectionGroup with Section, SectionTitle, and SectionContent for a
          DIY layout.
        </SectionContent>
      </Section>
      <Section>
        <SectionTitle as="h4">Publish</SectionTitle>
        <SectionContent>
          The path line stops after the last section marker.
        </SectionContent>
      </Section>
    </SectionGroup>
  ),
};

export const CenterPath: Story = {
  render: () => (
    <SectionGroup align="center" color="secondary" style={{ maxWidth: 420 }}>
      <Section title="Start">
        Content sits between path nodes — the line only runs in the gap.
      </Section>
      <Section title="Middle">
        Dot — line — dot between sections, with a ripple behind each node.
      </Section>
      <Section title="End">Last section ends on a path node.</Section>
    </SectionGroup>
  ),
};

export const RightPath: Story = {
  render: () => (
    <SectionGroup align="right" color="info" style={{ maxWidth: 480 }}>
      <Section>
        <SectionTitle>Brief</SectionTitle>
        <SectionContent>
          On the right, markers and the line hug the trailing edge.
        </SectionContent>
      </Section>
      <Section>
        <SectionTitle>Review</SectionTitle>
        <SectionContent>Titles and body align with the rail.</SectionContent>
      </Section>
    </SectionGroup>
  ),
};
