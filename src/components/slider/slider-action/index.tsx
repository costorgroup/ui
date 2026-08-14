import React, { forwardRef, useContext } from 'react';
import { ArrowRightIcon } from '../../../icons';
import { SliderContext } from '../slider-base/context';
import { SSliderAction } from './styles';
import { TSliderActionProps } from './types';

const FlipIcon = () => (
  <span
    aria-hidden
    style={{ display: 'inline-flex', transform: 'scaleX(-1)' }}
  >
    <ArrowRightIcon width="1em" height="1em" />
  </span>
);

const SliderAction = forwardRef<HTMLButtonElement, TSliderActionProps>(
  (
    {
      children,
      direction = 'next',
      type = 'button',
      variant = 'solid',
      color: colorProp,
      size = 'md',
      rounded = true,
      onClick,
      disabled,
      ...props
    },
    ref,
  ) => {
    const slider = useContext(SliderContext);

    if (!slider) {
      throw new Error('SliderAction must be used within SliderBase');
    }

    const {
      currentSlide,
      slideCount,
      loop,
      color: contextColor,
      nextSlide,
      prevSlide,
    } = slider;

    const color = colorProp ?? contextColor;
    const isPrev = direction === 'prev';
    const atStart = currentSlide <= 0;
    const atEnd = currentSlide >= slideCount - 1;
    const isDisabled =
      disabled ||
      slideCount <= 1 ||
      (!loop && (isPrev ? atStart : atEnd));

    return (
      <SSliderAction
        ref={ref}
        type={type}
        variant={variant}
        color={color}
        size={size}
        rounded={rounded}
        disabled={isDisabled}
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
      >
        {children ??
          (isPrev ? (
            <FlipIcon />
          ) : (
            <ArrowRightIcon width="1em" height="1em" />
          ))}
      </SSliderAction>
    );
  },
);

SliderAction.displayName = 'SliderAction';

export { SliderAction };
export default SliderAction;
