import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Heading, Text } from '../../index';
import { SliderBase } from './slider-base';
import { SliderSlides } from './slider-slides';
import { SliderSlide } from './slider-slide';
import { SliderContent } from './slider-content';
import { SliderControls } from './slider-controls';
import { SliderActions } from './slider-actions';
import { SliderAction } from './slider-action';
import { SliderPagination } from './slider-pagination';

const meta: Meta<typeof SliderBase> = {
  title: 'Components/Slider/Parts',
  component: SliderBase,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SliderBase>;

export const Composition: Story = {
  render: () => (
    <SliderBase loop style={{ minHeight: 280 }}>
      <SliderSlides>
        <SliderSlide>
          <div
            style={{
              minHeight: 280,
              background: '#1f6feb',
              display: 'grid',
              placeItems: 'center',
              color: '#fff',
            }}
          >
            <Heading as="h3" style={{ margin: 0, color: 'inherit' }}>
              One
            </Heading>
          </div>
        </SliderSlide>
        <SliderSlide>
          <div
            style={{
              minHeight: 280,
              background: '#238636',
              display: 'grid',
              placeItems: 'center',
              color: '#fff',
            }}
          >
            <Heading as="h3" style={{ margin: 0, color: 'inherit' }}>
              Two
            </Heading>
          </div>
        </SliderSlide>
        <SliderSlide>
          <div
            style={{
              minHeight: 280,
              background: '#9a6700',
              display: 'grid',
              placeItems: 'center',
              color: '#fff',
            }}
          >
            <Heading as="h3" style={{ margin: 0, color: 'inherit' }}>
              Three
            </Heading>
          </div>
        </SliderSlide>
      </SliderSlides>
      <SliderContent>
        <div style={{ position: 'absolute', left: 24, top: 24 }}>
          <Text style={{ color: '#fff' }}>Overlay content</Text>
        </div>
      </SliderContent>
      <SliderControls>
        <SliderActions>
          <SliderAction direction="prev" />
          <SliderAction direction="next" />
        </SliderActions>
        <SliderPagination />
      </SliderControls>
    </SliderBase>
  ),
};
