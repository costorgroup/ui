import React, { ElementType, forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { fixedClasses } from './classes';
import type { TPolymorphicComponent } from '../../helpers/polymorphic';
import { SFixed } from './styles';
import { TFixedOwnProps, TFixedProps } from './types';

const Fixed = forwardRef(function Fixed<C extends ElementType = 'div'>(
  { as, children, top, right, bottom, left, className, ...props }: TFixedProps<C>,
  ref: React.Ref<Element>,
) {
  return (
    <SFixed
      as={as}
      ref={ref as React.Ref<HTMLDivElement>}
      top={top}
      right={right}
      bottom={bottom}
      left={left}
      {...props}
        className={mergeClasses(
          fixedClasses.root,
          className,
        )}
    >
      {children}
    </SFixed>
  );
}) as TPolymorphicComponent<'div', TFixedOwnProps>;

Fixed.displayName = 'Fixed';

export type { TFixedProps, TFixedOwnProps, TFixedInset } from './types';
export { fixedClasses } from './classes';
export { Fixed };
export default Fixed;
