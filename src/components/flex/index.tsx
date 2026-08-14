import React, { ElementType, forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { flexClasses } from './classes';
import type { TPolymorphicComponent } from '../../helpers/polymorphic';
import { SFlex } from './styles';
import { TFlexOwnProps, TFlexProps } from './types';

const Flex = forwardRef(function Flex<C extends ElementType = 'div'>(
  {
    as,
    children,
    direction = 'row',
    align,
    justify,
    wrap,
    alignContent,
    grow,
    shrink,
    basis,
    gap,
    inline = false,
    className, ...props
  }: TFlexProps<C>,
  ref: React.Ref<Element>,
) {
  return (
    <SFlex
      as={as}
      ref={ref as React.Ref<HTMLDivElement>}
      direction={direction}
      align={align}
      justify={justify}
      wrap={wrap}
      alignContent={alignContent}
      grow={grow}
      shrink={shrink}
      basis={basis}
      gap={gap}
      inline={inline}
      {...props}
        className={mergeClasses(
          flexClasses.root,
          className,
        )}
    >
      {children}
    </SFlex>
  );
}) as TPolymorphicComponent<'div', TFlexOwnProps>;

Flex.displayName = 'Flex';

export type { TFlexProps, TFlexOwnProps, TFlexGap } from './types';
export { flexClasses } from './classes';
export { Flex };
export default Flex;
