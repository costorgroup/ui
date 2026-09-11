import React, { ElementType, forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import type { TPolymorphicComponent } from '../../../helpers/polymorphic';
import { emClasses } from './classes';
import { SEm } from './styles';
import { TEmOwnProps, TEmProps } from './types';

const Em = forwardRef(function Em<C extends ElementType = 'em'>(
  { as, children, color, className, ...props }: TEmProps<C>,
  ref: React.Ref<Element>,
) {
  return (
    <SEm
      as={as}
      ref={ref as React.Ref<HTMLElement>}
      color={color}
      {...props}
      className={mergeClasses(emClasses.root, className)}
    >
      {children}
    </SEm>
  );
}) as TPolymorphicComponent<'em', TEmOwnProps>;

Em.displayName = 'Em';

export type { TEmProps, TEmOwnProps } from './types';
export { emClasses } from './classes';
export { Em };
export default Em;
