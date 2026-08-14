import React, { forwardRef } from 'react';
import { SSkeleton } from './styles';
import { TSkeletonProps } from './types';

const toCssTime = (value: number | string | undefined) => {
  if (value === undefined) {
    return '0ms';
  }

  return typeof value === 'number' ? `${value}ms` : value;
};

const Skeleton = forwardRef<HTMLSpanElement, TSkeletonProps>(
  (
    {
      width,
      height,
      radius = 'medium',
      animation = 'pulse',
      animationOffset = 0,
      ...props
    },
    ref,
  ) => {
    return (
      <SSkeleton
        ref={ref}
        width={width}
        height={height}
        radius={radius}
        animation={animation === false ? 'none' : animation}
        animationOffset={toCssTime(animationOffset)}
        aria-hidden
        {...props}
      />
    );
  },
);

Skeleton.displayName = 'Skeleton';

export { Skeleton };
export default Skeleton;
