import React, { Children, forwardRef, isValidElement } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { sliderClasses } from './classes';
import { SliderAction } from './slider-action';
import { SliderActions } from './slider-actions';
import { SliderContent } from './slider-content';
import { SliderControls } from './slider-controls';
import { SliderPagination } from './slider-pagination';
import { SliderSlide } from './slider-slide';
import { SliderSlides } from './slider-slides';
import { SSlider } from './styles';
import { TSliderProps } from './types';

const Slider = forwardRef<HTMLDivElement, TSliderProps>(
  (
    {
      children,
      content,
      showActions = true,
      showPagination = true,
      color = 'primary',
      sliderRef,
      className,
      ...props
    },
    ref,
  ) => {
    const slides = Children.map(children, (child, index) => {
      if (
        isValidElement(child) &&
        (child.type === SliderSlide ||
          (typeof child.type !== 'string' &&
            'displayName' in child.type &&
            child.type.displayName === 'SliderSlide'))
      ) {
        return child;
      }

      return <SliderSlide key={index}>{child}</SliderSlide>;
    });

    const showControls = showActions || showPagination;

    return (
      <SSlider ref={ref} sliderRef={sliderRef} color={color} {...props}
        className={mergeClasses(
          sliderClasses.root,
          className,
        )}>
        <SliderSlides>{slides}</SliderSlides>
        {content != null ? <SliderContent>{content}</SliderContent> : null}
        {showControls ? (
          <SliderControls>
            {showActions ? (
              <SliderActions>
                <SliderAction direction="prev" />
                <SliderAction direction="next" />
              </SliderActions>
            ) : null}
            {showPagination ? <SliderPagination /> : null}
          </SliderControls>
        ) : null}
      </SSlider>
    );
  },
);

Slider.displayName = 'Slider';

export type { TSliderProps, TSliderHandle } from './types';
export { sliderClasses } from './classes';
export { Slider };
export default Slider;
