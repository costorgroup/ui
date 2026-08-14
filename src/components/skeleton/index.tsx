import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { skeletonClasses } from './classes';
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
      className,
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
        className={mergeClasses(
          skeletonClasses.root,
          className,
        )}
      />
    );
  },
);

Skeleton.displayName = 'Skeleton';

export { skeletonClasses } from './classes';
export { Skeleton };
export default Skeleton;
