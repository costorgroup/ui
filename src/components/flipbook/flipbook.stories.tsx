import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useRef, useState } from 'react';
import { Button, Flex, Flipbook, FlipbookPage, Heading, Text } from '../../index';
import type { TFlipbookHandle } from './types';

const PagePanel = ({
  title,
  body,
  tone = '#f8fafc',
}: {
  title: string;
  body: string;
  tone?: string;
}) => (
  <div
    style={{
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      width: '100%',
      height: '100%',
      padding: 28,
      background: tone,
      color: '#0f172a',
    }}
  >
    <Heading as="h3" style={{ margin: 0 }}>
      {title}
    </Heading>
    <Text size="sm">{body}</Text>
  </div>
);

const meta: Meta<typeof Flipbook> = {
  title: 'Data Display/Flipbook',
  component: Flipbook,
  tags: ['autodocs'],
  argTypes: {
    showControls: { control: 'boolean' },
    showCover: { control: 'boolean' },
    flippingTime: { control: 'number' },
    width: { control: 'number' },
    height: { control: 'number' },
  },
};

export default meta;

type Story = StoryObj<typeof Flipbook>;

export const Default: Story = {
  args: {
    width: 720,
    height: 560,
    showControls: true,
    flippingTime: 700,
  },
  render: (args) => (
    <Flipbook {...args}>
      <FlipbookPage hard>
        <PagePanel
          title="Cover"
          body="HTML flipbook pages with a realistic page-turn."
          tone="#e2e8f0"
        />
      </FlipbookPage>
      <FlipbookPage>
        <PagePanel
          title="Chapter 1"
          body="Pass any React content inside FlipbookPage."
        />
      </FlipbookPage>
      <FlipbookPage>
        <PagePanel
          title="Chapter 2"
          body="Click the right edge, swipe, or use the controls to turn pages."
          tone="#eff6ff"
        />
      </FlipbookPage>
      <FlipbookPage>
        <PagePanel
          title="Chapter 3"
          body="Keyboard: ← →, Home, End."
          tone="#f0fdf4"
        />
      </FlipbookPage>
    </Flipbook>
  ),
};

export const WithHtmlChildren: Story = {
  render: () => (
    <Flipbook width={480} height={640}>
      <FlipbookPage hard>
        <PagePanel title="Brochure" body="Front cover" tone="#cbd5e1" />
      </FlipbookPage>
      <FlipbookPage>
        <PagePanel title="Features" body="Composable FlipbookPage slots." />
      </FlipbookPage>
      <FlipbookPage>
        <PagePanel title="Details" body="Theme-aware paper and shadows." />
      </FlipbookPage>
    </Flipbook>
  ),
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [page, setPage] = useState(0);

    return (
      <Flex direction="column" gap="md" align="center">
        <Text size="sm">page: {page}</Text>
        <Flex gap="sm">
          <Button size="sm" variant="subtle" onClick={() => setPage(0)}>
            Cover
          </Button>
          <Button size="sm" variant="subtle" onClick={() => setPage(2)}>
            Page 3
          </Button>
        </Flex>
        <Flipbook page={page} onPageChange={setPage} width={400} height={520}>
          <FlipbookPage hard>
            <PagePanel title="0" body="Cover" tone="#e2e8f0" />
          </FlipbookPage>
          <FlipbookPage>
            <PagePanel title="1" body="First leaf" />
          </FlipbookPage>
          <FlipbookPage>
            <PagePanel title="2" body="Second leaf" tone="#eff6ff" />
          </FlipbookPage>
          <FlipbookPage>
            <PagePanel title="3" body="Third leaf" tone="#f0fdf4" />
          </FlipbookPage>
        </Flipbook>
      </Flex>
    );
  },
};

export const ImperativeHandle: Story = {
  render: function ImperativeStory() {
    const flipbookRef = useRef<TFlipbookHandle>(null);

    return (
      <Flex direction="column" gap="md" align="center">
        <Flex gap="sm">
          <Button
            size="sm"
            variant="subtle"
            onClick={() => flipbookRef.current?.prev()}
          >
            Prev
          </Button>
          <Button
            size="sm"
            variant="subtle"
            onClick={() => flipbookRef.current?.next()}
          >
            Next
          </Button>
        </Flex>
        <Flipbook flipbookRef={flipbookRef} showControls={false}>
          <FlipbookPage>
            <PagePanel title="A" body="Imperative prev/next via flipbookRef." />
          </FlipbookPage>
          <FlipbookPage>
            <PagePanel title="B" body="Useful for custom toolbars." />
          </FlipbookPage>
          <FlipbookPage>
            <PagePanel title="C" body="End of book." tone="#fef3c7" />
          </FlipbookPage>
        </Flipbook>
      </Flex>
    );
  },
};

export const FromPdf: Story = {
  name: 'From PDF (src)',
  args: {
    // Public sample PDF (CORS-enabled). Requires peer dependency pdfjs-dist.
    src: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
    width: 480,
    height: 640,
    pdfScale: 1.25,
  },
};
