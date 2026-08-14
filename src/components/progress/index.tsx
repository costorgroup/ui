import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { progressClasses } from './classes';
import { SProgress, SProgressFill, SProgressGap, SProgressRail } from './styles';
import { TProgressProps } from './types';

const resolveSize = (value: number | string | undefined, fallback: number | string) => {
  if (value === undefined) {
    return fallback;
  }

  return value;
};

const Progress = forwardRef<HTMLDivElement, TProgressProps>(
  (
    {
      width,
      height,
      color = 'primary',
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

    // Rail is 200% of track → one period is 50% of rail (= 100% of track).
    const fillSize = canAnimate ? `${ratio * 50}%` : `${ratio * 100}%`;
    const gapSize = `${(1 - ratio) * 50}%`;

    return (
      <SProgress
        ref={ref}
        width={resolveSize(width, '100%')}
        height={resolveSize(height, 8)}
        color={color}
        role={role}
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={clamped}
        aria-busy={canAnimate || undefined}
        {...props}
        className={mergeClasses(
          progressClasses.root,
          className,
        )}
      >
        {canAnimate ? (
          <SProgressRail>
            <SProgressFill size={fillSize} />
            <SProgressGap size={gapSize} />
            <SProgressFill size={fillSize} />
            <SProgressGap size={gapSize} />
          </SProgressRail>
        ) : (
          <SProgressFill size={fillSize} />
        )}
      </SProgress>
    );
  },
);

Progress.displayName = 'Progress';

export { progressClasses } from './classes';
export { Progress };
export default Progress;
