import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Flex } from '../../../index';
import type { TPaletteColor } from '../../../theme/types';
import {
  Button,
  Heading,
  Image,
  SlidePermanentContent,
  Slider,
  SliderControl,
  SliderControls,
  SliderPagination,
  SliderSlide,
  SliderSlides,
  Text,
  useSlider,
  type TUseSliderReturn,
} from '../../index';

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

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ width: '100%', maxWidth: 600 }}>{children}</div>
);

const images = [
  'https://picsum.photos/seed/slide-1/960/560',
  'https://picsum.photos/seed/slide-2/960/560',
  'https://picsum.photos/seed/slide-3/960/560',
  'https://picsum.photos/seed/slide-4/960/560',
];

const Slides = () => (
  <SliderSlides>
    {images.map((src, index) => (
      <SliderSlide key={src}>
        <Image
          src={src}
          width="100%"
          height={280}
          radius="none"
          alt={`Slide ${index + 1}`}
        />
      </SliderSlide>
    ))}
  </SliderSlides>
);

const Chrome = () => (
  <SliderControls>
    <SliderControl direction="prev" />
    <SliderControl direction="next" />
    <SliderPagination />
  </SliderControls>
);

const HookBar = ({ slider }: { slider: TUseSliderReturn }) => (
  <Flex gap="sm" align="center">
    <Button
      size="sm"
      disabled={!slider.canPreviousPage}
      onClick={slider.previousPage}
    >
      Prev
    </Button>
    <Button size="sm" disabled={!slider.canNextPage} onClick={slider.nextPage}>
      Next
    </Button>
    <Button size="sm" onClick={() => slider.changePage(3)}>
      Set 4
    </Button>
    <Text>
      {slider.page + 1} / {slider.pageCount}
    </Text>
  </Flex>
);

const meta: Meta<typeof Slider> = {
  title: 'V3/Data Display/Slider',
  component: Slider,
  tags: ['autodocs'],
  args: {
    loop: true,
    draggable: true,
    color: 'inverted',
  },
  argTypes: {
    autoPlay: { control: 'boolean' },
    loop: { control: 'boolean' },
    draggable: { control: 'boolean' },
    autoPlayInterval: { control: 'number' },
    transitionMs: { control: 'number' },
    color: {
      control: 'select',
      options: COLORS,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Playground: Story = {
  tags: ['!dev'],
  render: (args) => (
    <Frame>
      <Slider {...args}>
        <Slides />
        <Chrome />
      </Slider>
    </Frame>
  ),
};

export const AutoPlay: Story = {
  args: {
    autoPlay: true,
    autoPlayInterval: 2500,
    loop: true,
    draggable: true,
  },
  render: (args) => (
    <Frame>
      <Slider {...args}>
        <Slides />
        <Chrome />
      </Slider>
    </Frame>
  ),
};

export const PermanentContent: Story = {
  render: () => (
    <Frame>
      <Slider loop draggable>
        <Slides />
        <SlidePermanentContent>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
            }}
          >
            <div
              data-slide-permanent-interactive
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
                textAlign: 'center',
                maxWidth: 280,
              }}
            >
              <Heading as="h3" style={{ margin: 0, color: '#fff' }}>
                Permanent content
              </Heading>
              <Text style={{ margin: 0, color: '#fff' }}>
                Stays in front of slides and behind controls.
              </Text>
              <Button
                onClick={() => {
                  window.alert('CTA clicked');
                }}
              >
                Get started
              </Button>
            </div>
          </div>
        </SlidePermanentContent>
        <Chrome />
      </Slider>
    </Frame>
  ),
};

export const PaginationOnly: Story = {
  render: () => (
    <Frame>
      <Slider loop draggable>
        <Slides />
        <SliderControls>
          <SliderPagination />
        </SliderControls>
      </Slider>
    </Frame>
  ),
};

export const ControlsOnly: Story = {
  render: () => (
    <Frame>
      <Slider loop draggable>
        <Slides />
        <SliderControls>
          <SliderControl direction="prev" />
          <SliderControl direction="next" />
        </SliderControls>
      </Slider>
    </Frame>
  ),
};

export const UseSlider: Story = {
  render: function UseSliderStory() {
    const slider = useSlider({ loop: true });

    return (
      <Flex direction="column" gap="md" style={{ maxWidth: 600 }}>
        <Slider {...slider.sliderProps}>
          <Slides />
          <Chrome />
        </Slider>
        <HookBar slider={slider} />
      </Flex>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    return (
      <Flex direction="column" gap="md" style={{ maxWidth: 600 }}>
        <Slider
          currentSlide={currentSlide}
          onSlideChange={setCurrentSlide}
          loop
        >
          <Slides />
          <Chrome />
        </Slider>
        <Flex gap="sm" align="center">
          <Button size="sm" onClick={() => setCurrentSlide(0)}>
            Go to 1
          </Button>
          <Button size="sm" onClick={() => setCurrentSlide(2)}>
            Go to 3
          </Button>
          <Text>Current: {currentSlide + 1}</Text>
        </Flex>
      </Flex>
    );
  },
};
