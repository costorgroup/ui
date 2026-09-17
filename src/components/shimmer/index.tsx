import React, { ElementType, forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import type { TPolymorphicComponent } from '../../helpers/polymorphic';
import { shimmerClasses } from './classes';
import { SShimmer } from './styles';
import { TShimmerOwnProps, TShimmerProps } from './types';

const Shimmer = forwardRef(function Shimmer<C extends ElementType = 'span'>(
  {
    as,
    children,
    color = 'default',
    duration = 2500,
    className,
    ...props
  }: TShimmerProps<C>,
  ref: React.Ref<Element>,
) {
  return (
    <SShimmer
      as={as}
      ref={ref as React.Ref<HTMLSpanElement>}
      color={color}
      duration={duration}
      data-slot="shimmer"
      {...props}
      className={mergeClasses(shimmerClasses.root, className)}
    >
      {children}
    </SShimmer>
  );
}) as TPolymorphicComponent<'span', TShimmerOwnProps>;

Shimmer.displayName = 'Shimmer';

export type { TShimmerProps, TShimmerOwnProps } from './types';
export { shimmerClasses } from './classes';
export { Shimmer };
export default Shimmer;
