import React, { ElementType, forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import type { TPolymorphicComponent } from '../../../helpers/polymorphic';
import { strongClasses } from './classes';
import { SStrong } from './styles';
import { TStrongOwnProps, TStrongProps } from './types';

const Strong = forwardRef(function Strong<C extends ElementType = 'strong'>(
  { as, children, className, ...props }: TStrongProps<C>,
  ref: React.Ref<Element>,
) {
  return (
    <SStrong
      as={as}
      ref={ref as React.Ref<HTMLElement>}
      {...props}
      className={mergeClasses(strongClasses.root, className)}
    >
      {children}
    </SStrong>
  );
}) as TPolymorphicComponent<'strong', TStrongOwnProps>;

Strong.displayName = 'Strong';

export type { TStrongProps, TStrongOwnProps } from './types';
export { strongClasses } from './classes';
export { Strong };
export default Strong;
