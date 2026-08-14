import React, { ElementType, forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { kbdClasses } from './classes';
import type { TPolymorphicComponent } from '../../helpers/polymorphic';
import { SKbd } from './styles';
import { TKbdOwnProps, TKbdProps } from './types';

const Kbd = forwardRef(function Kbd<C extends ElementType = 'kbd'>(
  {
    as,
    children,
    variant = 'raised',
    size = 'md',
    color = 'default',
    className, ...props
  }: TKbdProps<C>,
  ref: React.Ref<Element>,
) {
  return (
    <SKbd
      as={as}
      ref={ref as React.Ref<HTMLElement>}
      variant={variant}
      size={size}
      color={color}
      {...props}
        className={mergeClasses(
          kbdClasses.root,
          className,
        )}
    >
      {children}
    </SKbd>
  );
}) as TPolymorphicComponent<'kbd', TKbdOwnProps>;

Kbd.displayName = 'Kbd';

export type { TKbdProps, TKbdOwnProps, TKbdVariant, TKbdSize } from './types';
export { kbdClasses } from './classes';
export { Kbd };
export default Kbd;
