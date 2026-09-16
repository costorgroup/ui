import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { useSliderContext } from '../slider-base/context';
import { sliderPaginationClasses } from './classes';
import { SSliderPagination, SSliderPaginationDot } from './styles';
import { TSliderPaginationProps } from './types';

const SliderPagination = forwardRef<HTMLDivElement, TSliderPaginationProps>(
  ({ color: colorProp, className, ...props }, ref) => {
    const { currentSlide, slideCount, setSlide, color: contextColor } =
      useSliderContext();

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
        data-slot="pagination"
        className={mergeClasses(
          sliderPaginationClasses.root,
          className,
        )}
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

export { sliderPaginationClasses } from './classes';
export { SliderPagination };
export default SliderPagination;
