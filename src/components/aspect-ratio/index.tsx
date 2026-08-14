import React, { Children, ElementType, forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { aspectRatioClasses } from './classes';
import type { TPolymorphicComponent } from '../../helpers/polymorphic';
import { SAspectRatio } from './styles';
import { TAspectRatioOwnProps, TAspectRatioProps } from './types';

const AspectRatio = forwardRef(function AspectRatio<
  C extends ElementType = 'div',
>(
  {
    as,
    children,
    ratio = 4 / 3,
    maxWidth,
    maxHeight,
    className, ...props
  }: TAspectRatioProps<C>,
  ref: React.Ref<Element>,
) {
  const child = Children.only(children);

  return (
    <SAspectRatio
      as={as}
      ref={ref as React.Ref<HTMLDivElement>}
      ratio={ratio}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      {...props}
        className={mergeClasses(
          aspectRatioClasses.root,
          className,
        )}
    >
      {child}
    </SAspectRatio>
  );
}) as TPolymorphicComponent<'div', TAspectRatioOwnProps>;

AspectRatio.displayName = 'AspectRatio';

export type { TAspectRatioProps, TAspectRatioOwnProps } from './types';
export { aspectRatioClasses } from './classes';
export { AspectRatio };
export default AspectRatio;
