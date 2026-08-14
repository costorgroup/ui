import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { spinnerClasses } from './classes';
import { SSpinner } from './styles';
import { TSpinnerProps } from './types';

const VIEWBOX_SIZE = 50;
const VIEWBOX_CENTER = VIEWBOX_SIZE / 2;

const resolveSize = (value: number | string | undefined, fallback: number) => {
  if (value === undefined) {
    return fallback;
  }

  return value;
};

const toPixels = (value: number | string, fallback: number) => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  const parsed = parseFloat(String(value));

  if (!Number.isNaN(parsed)) {
    return parsed;
  }

  return fallback;
};

const Spinner = forwardRef<SVGSVGElement, TSpinnerProps>(
  (
    {
      width,
      height,
      color = 'primary',
      thickness = 2,
      role = 'status',
      'aria-label': ariaLabel = 'Loading',
      className,
      ...props
    },
    ref,
  ) => {
    const resolvedWidth = resolveSize(width, 24);
    const resolvedHeight = resolveSize(height ?? width, 24);
    const sizePx = Math.max(
      Math.min(toPixels(resolvedWidth, 24), toPixels(resolvedHeight, 24)),
      1,
    );
    const strokeWidth = Math.min(
      (thickness * VIEWBOX_SIZE) / sizePx,
      VIEWBOX_SIZE * 0.9,
    );
    const radius = Math.max(VIEWBOX_CENTER - strokeWidth / 2, 0.5);

    return (
      <SSpinner
        ref={ref}
        color={color}
        thickness={strokeWidth}
        width={resolvedWidth}
        height={resolvedHeight}
        viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
        role={role}
        aria-label={ariaLabel}
        {...props}
        className={mergeClasses(
          spinnerClasses.root,
          className,
        )}
      >
        <circle cx={VIEWBOX_CENTER} cy={VIEWBOX_CENTER} r={radius} pathLength={100} />
      </SSpinner>
    );
  },
);

Spinner.displayName = 'Spinner';

export { spinnerClasses } from './classes';
export { Spinner };
export default Spinner;
