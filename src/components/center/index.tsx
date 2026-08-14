import React, { ElementType, forwardRef } from 'react';
import type { TPolymorphicComponent } from '../../helpers/polymorphic';
import { SCenter } from './styles';
import { TCenterOwnProps, TCenterProps } from './types';

const Center = forwardRef(function Center<C extends ElementType = 'div'>(
  {
    as,
    children,
    absolute = false,
    axis = 'both',
    inline = false,
    ...props
  }: TCenterProps<C>,
  ref: React.Ref<Element>,
) {
  return (
    <SCenter
      as={as}
      ref={ref as React.Ref<HTMLDivElement>}
      absolute={absolute}
      axis={axis}
      inline={inline}
      {...props}
    >
      {children}
    </SCenter>
  );
}) as TPolymorphicComponent<'div', TCenterOwnProps>;

Center.displayName = 'Center';

export type { TCenterProps, TCenterOwnProps, TCenterAxis } from './types';
export { Center };
export default Center;
