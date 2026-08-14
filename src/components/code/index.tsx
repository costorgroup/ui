import React, { ElementType, forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { codeClasses } from './classes';
import type { TPolymorphicComponent } from '../../helpers/polymorphic';
import { SCode } from './styles';
import { TCodeOwnProps, TCodeProps } from './types';

const Code = forwardRef(function Code<C extends ElementType = 'code'>(
  {
    as,
    children,
    variant = 'subtle',
    size = 'sm',
    color = 'default',
    className, ...props
  }: TCodeProps<C>,
  ref: React.Ref<Element>,
) {
  return (
    <SCode
      as={as}
      ref={ref as React.Ref<HTMLElement>}
      variant={variant}
      size={size}
      color={color}
      {...props}
        className={mergeClasses(
          codeClasses.root,
          className,
        )}
    >
      {children}
    </SCode>
  );
}) as TPolymorphicComponent<'code', TCodeOwnProps>;

Code.displayName = 'Code';

export type { TCodeProps, TCodeOwnProps, TCodeVariant, TCodeSize } from './types';
export { codeClasses } from './classes';
export { Code };
export default Code;
