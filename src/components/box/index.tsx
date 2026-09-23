import React, { ElementType, forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import type { TPolymorphicComponent } from '../../helpers/polymorphic';
import { boxClasses } from './classes';
import { SBox } from './styles';
import { TBoxOwnProps, TBoxProps } from './types';

const Box = forwardRef(function Box<C extends ElementType = 'div'>(
  { as, children, cStyle, fullWidth = false, className, ...props }: TBoxProps<C>,
  ref: React.Ref<Element>,
) {
  return (
    <SBox
      as={as}
      ref={ref as React.Ref<HTMLDivElement>}
      fullWidth={fullWidth}
      {...props}
      css={cStyle}
      className={mergeClasses(boxClasses.root, className)}
    >
      {children}
    </SBox>
  );
}) as TPolymorphicComponent<'div', TBoxOwnProps>;

Box.displayName = 'Box';

export type { TBoxProps, TBoxOwnProps, TCStyle } from './types';
export { boxClasses } from './classes';
export { Box };
export default Box;
