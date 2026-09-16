import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import {
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
} from '../../index';

const meta: Meta<typeof Slider> = {
  title: 'V3/Data Display/Slider/Parts',
  component: Slider,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Composition: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: 600 }}>
      <Slider loop>
        <SliderSlides>
          <SliderSlide>
            <Image
              src="https://picsum.photos/seed/parts-1/960/560"
              width="100%"
              height={280}
              radius="none"
              alt="One"
            />
          </SliderSlide>
          <SliderSlide>
            <Image
              src="https://picsum.photos/seed/parts-2/960/560"
              width="100%"
              height={280}
              radius="none"
              alt="Two"
            />
          </SliderSlide>
          <SliderSlide>
            <Image
              src="https://picsum.photos/seed/parts-3/960/560"
              width="100%"
              height={280}
              radius="none"
              alt="Three"
            />
          </SliderSlide>
        </SliderSlides>
        <SlidePermanentContent>
          <div style={{ position: 'absolute', left: 24, top: 24 }}>
            <Heading as="h3" style={{ margin: 0, color: '#fff' }}>
              Overlay
            </Heading>
            <Text style={{ color: '#fff' }}>DIY slider parts</Text>
          </div>
        </SlidePermanentContent>
        <SliderControls>
          <SliderControl direction="prev" />
          <SliderControl direction="next" />
          <SliderPagination />
        </SliderControls>
      </Slider>
    </div>
  ),
};
