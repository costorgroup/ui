import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef, useState } from 'react';
import {
  Button,
  Heading,
  Slider,
  Text,
  type TSliderHandle,
} from '../../index';

const SlidePanel = ({
  label,
  color,
}: {
  label?: string;
  color: string;
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: 280,
      background: color,
      color: '#fff',
    }}
  >
    {label != null ? (
      <Heading as="h3" style={{ color: 'inherit', margin: 0 }}>
        {label}
      </Heading>
    ) : null}
  </div>
);

const meta: Meta<typeof Slider> = {
  title: 'Data Display/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    autoPlay: { control: 'boolean' },
    loop: { control: 'boolean' },
    draggable: { control: 'boolean' },
    showActions: { control: 'boolean' },
    showPagination: { control: 'boolean' },
    autoPlayInterval: { control: 'number' },
    transitionMs: { control: 'number' },
    color: {
      control: 'select',
      options: [
        'default',
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
};

export default meta;

type Story = StoryObj<typeof Slider>;

const slides = [
  <SlidePanel key="1" label="Slide 1" color="#1f6feb" />,
  <SlidePanel key="2" label="Slide 2" color="#238636" />,
  <SlidePanel key="3" label="Slide 3" color="#9a6700" />,
  <SlidePanel key="4" label="Slide 4" color="#bf3989" />,
];

const colorSlides = [
  <SlidePanel key="1" color="#1f6feb" />,
  <SlidePanel key="2" color="#238636" />,
  <SlidePanel key="3" color="#9a6700" />,
  <SlidePanel key="4" color="#bf3989" />,
];

export const Default: Story = {
  args: {
    loop: true,
    draggable: true,
    showActions: true,
    showPagination: true,
  },
  render: (args) => <Slider {...args}>{slides}</Slider>,
};

export const AutoPlay: Story = {
  args: {
    autoPlay: true,
    autoPlayInterval: 2500,
    loop: true,
    draggable: true,
  },
  render: (args) => <Slider {...args}>{slides}</Slider>,
};

export const WithContent: Story = {
  render: () => (
    <Slider
      loop
      draggable
      content={
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
            data-slider-content-interactive
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
            <Text style={{ margin: 0, color: '#fff', opacity: 0.9 }}>
              Stays in front of slides and behind actions/pagination.
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
      }
    >
      {colorSlides}
    </Slider>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    return (
      <div style={{ display: 'grid', gap: 12 }}>
        <Slider
          currentSlide={currentSlide}
          onSlideChange={setCurrentSlide}
          loop
        >
          {slides}
        </Slider>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Button size="sm" onClick={() => setCurrentSlide(0)}>
            Go to 1
          </Button>
          <Button size="sm" onClick={() => setCurrentSlide(2)}>
            Go to 3
          </Button>
          <Text>Current: {currentSlide + 1}</Text>
        </div>
      </div>
    );
  },
};

export const ImperativeApi: Story = {
  render: () => {
    const sliderRef = useRef<TSliderHandle>(null);

    return (
      <div style={{ display: 'grid', gap: 12 }}>
        <Slider sliderRef={sliderRef} loop>
          {slides}
        </Slider>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button size="sm" onClick={() => sliderRef.current?.prevSlide()}>
            Prev
          </Button>
          <Button size="sm" onClick={() => sliderRef.current?.nextSlide()}>
            Next
          </Button>
          <Button size="sm" onClick={() => sliderRef.current?.setSlide(3)}>
            Set 4
          </Button>
        </div>
      </div>
    );
  },
};

export const PaginationOnly: Story = {
  render: () => (
    <Slider showActions={false} loop draggable>
      {slides}
    </Slider>
  ),
};

export const Draggable: Story = {
  render: () => (
    <Slider loop draggable showActions={false}>
      {slides}
    </Slider>
  ),
};
