import React, { ElementType, forwardRef } from 'react';
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
    ...props
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
    >
      {children}
    </SKbd>
  );
}) as TPolymorphicComponent<'kbd', TKbdOwnProps>;

Kbd.displayName = 'Kbd';

export type { TKbdProps, TKbdOwnProps, TKbdVariant, TKbdSize } from './types';
export { Kbd };
export default Kbd;
