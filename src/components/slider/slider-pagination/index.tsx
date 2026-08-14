import React, { forwardRef, useContext } from 'react';
import { SliderContext } from '../slider-base/context';
import { SSliderPagination, SSliderPaginationDot } from './styles';
import { TSliderPaginationProps } from './types';

const SliderPagination = forwardRef<HTMLDivElement, TSliderPaginationProps>(
  ({ color: colorProp, ...props }, ref) => {
    const slider = useContext(SliderContext);

    if (!slider) {
      throw new Error('SliderPagination must be used within SliderBase');
    }

    const {
      currentSlide,
      slideCount,
      setSlide,
      color: contextColor,
    } = slider;

    const color = colorProp ?? contextColor;

    if (slideCount <= 1) {
      return null;
    }

    return (
      <SSliderPagination
        ref={ref}
        role="tablist"
        aria-label="Slider pagination"
        {...props}
      >
        {Array.from({ length: slideCount }, (_, index) => {
          const active = index === currentSlide;

          return (
            <SSliderPaginationDot
              key={index}
              type="button"
              role="tab"
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={active}
              active={active}
              color={color}
              onClick={() => setSlide(index)}
            />
          );
        })}
      </SSliderPagination>
    );
  },
);

SliderPagination.displayName = 'SliderPagination';

export { SliderPagination };
export default SliderPagination;
