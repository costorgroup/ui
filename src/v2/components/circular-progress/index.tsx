import React, { forwardRef, useId } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { circularProgressClasses } from './classes';
import { SCircularProgress } from './styles';
import { TCircularProgressProps } from './types';

const VIEWBOX_SIZE = 50;
const VIEWBOX_CENTER = VIEWBOX_SIZE / 2;

const describeDonut = (
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
) => {
  if (innerR <= 0) {
    return `M ${cx} ${cy - outerR} A ${outerR} ${outerR} 0 1 1 ${cx} ${cy + outerR} A ${outerR} ${outerR} 0 1 1 ${cx} ${cy - outerR} Z`;
  }

  return [
    `M ${cx} ${cy - outerR}`,
    `A ${outerR} ${outerR} 0 1 1 ${cx} ${cy + outerR}`,
    `A ${outerR} ${outerR} 0 1 1 ${cx} ${cy - outerR}`,
    `M ${cx} ${cy - innerR}`,
    `A ${innerR} ${innerR} 0 1 0 ${cx} ${cy + innerR}`,
    `A ${innerR} ${innerR} 0 1 0 ${cx} ${cy - innerR}`,
    'Z',
  ].join(' ');
};

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

const CircularProgress = forwardRef<SVGSVGElement, TCircularProgressProps>(
  (
    {
      width,
      height,
      color = 'default',
      variant = 'solid',
      thickness = 2,
      role = 'status',
      'aria-label': ariaLabel = 'Loading',
      className,
      ...props
    },
    ref,
  ) => {
    const clipId = useId().replace(/:/g, '');
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
    const outerRadius = radius + strokeWidth / 2;
    const innerRadius = Math.max(radius - strokeWidth / 2, 0);
    const trackPath = describeDonut(
      VIEWBOX_CENTER,
      VIEWBOX_CENTER,
      outerRadius,
      innerRadius,
    );

    return (
      <SCircularProgress
        ref={ref}
        color={color}
        variant={variant}
        thickness={strokeWidth}
        width={resolvedWidth}
        height={resolvedHeight}
        viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
        role={role}
        aria-label={ariaLabel}
        {...props}
        className={mergeClasses(
          circularProgressClasses.root,
          className,
        )}
      >
        <defs>
          <clipPath id={clipId}>
            <circle
              cx={VIEWBOX_CENTER}
              cy={VIEWBOX_CENTER}
              r={outerRadius}
            />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          <path
            data-part="track"
            className={circularProgressClasses.track}
            d={trackPath}
            fillRule="evenodd"
          />
          <circle
            className={circularProgressClasses.path}
            cx={VIEWBOX_CENTER}
            cy={VIEWBOX_CENTER}
            r={radius}
            pathLength={100}
          />
        </g>
      </SCircularProgress>
    );
  },
);

CircularProgress.displayName = 'CircularProgress';

export type { TCircularProgressProps, TCircularProgressVariant } from './types';
export { circularProgressClasses } from './classes';
export { CircularProgress };
export default CircularProgress;
