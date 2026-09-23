import React, { ElementType, forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import type { TPolymorphicComponent } from '../../helpers/polymorphic';
import { centerClasses } from './classes';
import { SCenter } from './styles';
import { TCenterOwnProps, TCenterProps } from './types';

const Center = forwardRef(function Center<C extends ElementType = 'div'>(
  { as, children, absolute = false, axis = 'both', inline = false, fullWidth = false, className, ...props }: TCenterProps<C>,
  ref: React.Ref<Element>,
) {
  return (
    <SCenter
      as={as}
      ref={ref as React.Ref<HTMLDivElement>}
      absolute={absolute}
      axis={axis}
      inline={inline}
      fullWidth={fullWidth}
      {...props}
      className={mergeClasses(centerClasses.root, className)}
    >
      {children}
    </SCenter>
  );
}) as TPolymorphicComponent<'div', TCenterOwnProps>;

Center.displayName = 'Center';

export type { TCenterProps, TCenterOwnProps, TCenterAxis } from './types';
export { centerClasses } from './classes';
export { Center };
export default Center;
