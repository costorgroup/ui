import React, { ElementType, forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import type { TPolymorphicComponent } from '../../helpers/polymorphic';
import { smallClasses } from './classes';
import { SSmall } from './styles';
import { TSmallOwnProps, TSmallProps } from './types';

const Small = forwardRef(function Small<C extends ElementType = 'small'>(
  { as, children, color = 'default', className, ...props }: TSmallProps<C>,
  ref: React.Ref<Element>,
) {
  return (
    <SSmall
      as={as}
      ref={ref as React.Ref<HTMLElement>}
      color={color}
      {...props}
      className={mergeClasses(smallClasses.root, className)}
    >
      {children}
    </SSmall>
  );
}) as TPolymorphicComponent<'small', TSmallOwnProps>;

Small.displayName = 'Small';

export type { TSmallProps, TSmallOwnProps } from './types';
export { smallClasses } from './classes';
export { Small };
export default Small;
