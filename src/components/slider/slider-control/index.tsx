import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { ArrowRightIcon } from '../../../icons';
import { useSliderContext } from '../slider-base/context';
import { sliderControlClasses } from './classes';
import { SSliderControl, SSliderControlOrigin } from './styles';
import { TSliderControlProps } from './types';

const FlipIcon = () => (
  <span
    aria-hidden
    style={{ display: 'inline-flex', transform: 'scaleX(-1)' }}
  >
    <ArrowRightIcon width="1em" height="1em" />
  </span>
);

const SliderControl = forwardRef<HTMLButtonElement, TSliderControlProps>(
  (
    {
      children,
      direction = 'next',
      type = 'button',
      variant = 'solid',
      color: colorProp,
      size = 'md',
      radius = 'full',
      onClick,
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    const {
      currentSlide,
      slideCount,
      loop,
      color: contextColor,
      nextSlide,
      prevSlide,
    } = useSliderContext();

    const color = colorProp ?? contextColor;
    const isPrev = direction === 'prev';
    const atStart = currentSlide <= 0;
    const atEnd = currentSlide >= slideCount - 1;
    const isDisabled =
      disabled ||
      slideCount <= 1 ||
      (!loop && (isPrev ? atStart : atEnd));

    return (
      <SSliderControlOrigin origin={direction}>
        <SSliderControl
          ref={ref}
          type={type}
          variant={variant}
          color={color}
          size={size}
          radius={radius}
          disabled={isDisabled}
          data-slot="control"
          data-direction={direction}
          aria-label={isPrev ? 'Previous slide' : 'Next slide'}
          onClick={(event) => {
            if (isPrev) {
              prevSlide();
            } else {
              nextSlide();
            }

            onClick?.(event);
          }}
          {...props}
          className={mergeClasses(
            sliderControlClasses.root,
            isPrev ? sliderControlClasses.prev : sliderControlClasses.next,
            isDisabled && sliderControlClasses.disabled,
            className,
          )}
        >
          {children ??
            (isPrev ? (
              <FlipIcon />
            ) : (
              <ArrowRightIcon width="1em" height="1em" />
            ))}
        </SSliderControl>
      </SSliderControlOrigin>
    );
  },
);

SliderControl.displayName = 'SliderControl';

export type {
  TSliderControlProps,
  TSliderControlDirection,
} from './types';
export { sliderControlClasses } from './classes';
export { SliderControl };
export default SliderControl;
