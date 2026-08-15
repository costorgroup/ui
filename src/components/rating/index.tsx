import React, {
  forwardRef,
  SyntheticEvent,
  useId,
  useMemo,
  useState,
} from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import StarBorderIcon from '../../icons/star-border-icon';
import StarIcon from '../../icons/star-icon';
import { ratingClasses } from './classes';
import { SRating } from './styles';
import { TRatingProps } from './types';

const defaultGetLabelText = (value: number) =>
  `${value} Star${value !== 1 ? 's' : ''}`;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const roundToPrecision = (value: number, precision: number) => {
  const rounded = Math.round(value / precision) * precision;
  return Number(rounded.toFixed(10));
};

const getItemFill = (
  index: number,
  displayValue: number,
  highlightSelectedOnly: boolean,
) => {
  if (displayValue <= 0) {
    return 0;
  }

  if (highlightSelectedOnly) {
    const selected = Math.ceil(displayValue);

    if (index !== selected) {
      return 0;
    }

    return clamp(displayValue - (index - 1), 0, 1) * 100;
  }

  return clamp(displayValue - (index - 1), 0, 1) * 100;
};

const Rating = forwardRef<HTMLSpanElement, TRatingProps>(
  (
    {
      name,
      value: valueProp,
      defaultValue = null,
      max = 5,
      precision = 1,
      readOnly = false,
      disabled = false,
      icon,
      emptyIcon,
      color = 'warning',
      variant = 'solid',
      size = 'md',
      highlightSelectedOnly = false,
      getLabelText = defaultGetLabelText,
      onChange,
      onChangeActive,
      onMouseLeave,
      onFocus,
      onBlur,
      className,
      ...props
    },
    ref,
  ) => {
    const generatedName = useId();
    const groupName = name ?? generatedName;
    const isControlled = valueProp !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const [hover, setHover] = useState(-1);
    const [focusVisible, setFocusVisible] = useState(false);
    const value = isControlled ? valueProp : uncontrolledValue;
    const numericValue = value ?? 0;
    const displayValue = hover !== -1 ? hover : numericValue;
    const step = precision > 0 ? precision : 1;
    const filledIcon = icon ?? <StarIcon aria-hidden />;
    const vacantIcon = emptyIcon ?? <StarBorderIcon aria-hidden />;

    const items = useMemo(
      () => Array.from({ length: Math.max(1, Math.ceil(max)) }, (_, index) => index + 1),
      [max],
    );

    const fractions = useMemo(() => {
      const count = Math.round(1 / step);
      return Array.from({ length: Math.max(1, count) }, (_, index) =>
        roundToPrecision((index + 1) * step, step),
      );
    }, [step]);

    const commit = (event: SyntheticEvent, next: number | null) => {
      if (!isControlled) {
        setUncontrolledValue(next);
      }

      onChange?.(event, next);

      if (next == null && hover !== 0) {
        setHover(0);
        onChangeActive?.(event, 0);
      }
    };

    const handleMouseLeave: React.MouseEventHandler<HTMLSpanElement> = (event) => {
      if (hover !== -1) {
        setHover(-1);
        onChangeActive?.(event, -1);
      }

      onMouseLeave?.(event);
    };

    return (
      <SRating
        ref={ref}
        color={color}
        variant={variant}
        size={size}
        {...props}
        role={readOnly ? 'img' : 'radiogroup'}
        aria-label={readOnly ? getLabelText(numericValue) : props['aria-label']}
        className={mergeClasses(
          ratingClasses.root,
          disabled && ratingClasses.disabled,
          readOnly && ratingClasses.readOnly,
          focusVisible && ratingClasses.focusVisible,
          className,
        )}
        onMouseLeave={handleMouseLeave}
        onFocus={(event) => {
          setFocusVisible(event.currentTarget.matches(':focus-visible'));
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocusVisible(false);
          onBlur?.(event);
        }}
      >
        {!readOnly ? (
          <label className={ratingClasses.visuallyHidden}>
            <input
              type="radio"
              className={ratingClasses.visuallyHidden}
              name={groupName}
              value=""
              checked={numericValue === 0}
              disabled={disabled}
              aria-label="0 Stars"
              onChange={(event) => commit(event, null)}
            />
          </label>
        ) : null}
        {items.map((index) => {
          const fill = getItemFill(index, displayValue, highlightSelectedOnly);

          return (
            <span key={index} className={ratingClasses.item}>
              <span
                className={mergeClasses(ratingClasses.icon, ratingClasses.iconEmpty)}
              >
                {vacantIcon}
              </span>
              <span
                className={mergeClasses(ratingClasses.icon, ratingClasses.iconFilled)}
                style={{ ['--cui-rating-fill' as string]: `${fill}%` }}
              >
                {filledIcon}
              </span>
              {!readOnly
                ? fractions.map((fraction, fractionIndex) => {
                    const itemValue = roundToPrecision(
                      index - 1 + fraction,
                      step,
                    );

                    if (itemValue > max) {
                      return null;
                    }

                    return (
                      <label
                        key={itemValue}
                        className={ratingClasses.label}
                        style={{
                          width: `${(step / 1) * 100}%`,
                          insetInlineStart: `${fractionIndex * step * 100}%`,
                        }}
                        onMouseMove={(event) => {
                          if (hover !== itemValue) {
                            setHover(itemValue);
                            onChangeActive?.(event, itemValue);
                          }
                        }}
                      >
                        <input
                          type="radio"
                          className={ratingClasses.visuallyHidden}
                          name={groupName}
                          value={itemValue}
                          checked={numericValue === itemValue}
                          disabled={disabled}
                          aria-label={getLabelText(itemValue)}
                          onClick={(event) => {
                            if (numericValue === itemValue) {
                              commit(event, null);
                            }
                          }}
                          onChange={(event) => commit(event, itemValue)}
                        />
                      </label>
                    );
                  })
                : null}
            </span>
          );
        })}
      </SRating>
    );
  },
);

Rating.displayName = 'Rating';

export type { TRatingProps, TRatingSize, TRatingVariant } from './types';
export { ratingClasses } from './classes';
export { Rating };
export default Rating;
