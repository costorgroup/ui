import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { linearProgressClasses } from './classes';
import {
  SLinearProgress,
  SLinearProgressFill,
  SLinearProgressGap,
  SLinearProgressRail,
} from './styles';
import { TLinearProgressProps } from './types';

const resolveSize = (value: number | string | undefined, fallback: number | string) => {
  if (value === undefined) {
    return fallback;
  }

  return value;
};

const LinearProgress = forwardRef<HTMLDivElement, TLinearProgressProps>(
  (
    {
      width,
      height,
      color = 'default',
      variant = 'solid',
      value = 0,
      max = 100,
      animated = false,
      role = 'progressbar',
      'aria-label': ariaLabel = 'Progress',
      className,
      ...props
    },
    ref,
  ) => {
    const safeMax = max > 0 ? max : 100;
    const clamped = Math.min(Math.max(value, 0), safeMax);
    const ratio = clamped / safeMax;
    const canAnimate = animated && ratio > 0 && ratio < 1;

    const fillSize = canAnimate ? `${ratio * 50}%` : `${ratio * 100}%`;
    const gapSize = `${(1 - ratio) * 50}%`;

    return (
      <SLinearProgress
        ref={ref}
        width={resolveSize(width, '100%')}
        height={resolveSize(height, 8)}
        color={color}
        variant={variant}
        role={role}
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={clamped}
        aria-busy={canAnimate || undefined}
        {...props}
        className={mergeClasses(
          linearProgressClasses.root,
          className,
        )}
      >
        {canAnimate ? (
          <SLinearProgressRail>
            <SLinearProgressFill size={fillSize} />
            <SLinearProgressGap size={gapSize} />
            <SLinearProgressFill size={fillSize} />
            <SLinearProgressGap size={gapSize} />
          </SLinearProgressRail>
        ) : (
          <SLinearProgressFill size={fillSize} />
        )}
      </SLinearProgress>
    );
  },
);

LinearProgress.displayName = 'LinearProgress';

export type { TLinearProgressProps, TLinearProgressVariant } from './types';
export { linearProgressClasses } from './classes';
export { LinearProgress };
export default LinearProgress;
