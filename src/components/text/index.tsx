import React, { ElementType, forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { textClasses } from './classes';
import type { TPolymorphicComponent } from '../../helpers/polymorphic';
import { SText } from './styles';
import { TTextOwnProps, TTextProps } from './types';

const Text = forwardRef(function Text<C extends ElementType = 'p'>(
  { as, children, color = 'default', size = 'md', className, ...props }: TTextProps<C>,
  ref: React.Ref<Element>,
) {
  return (
    <SText
      as={as}
      ref={ref as React.Ref<HTMLParagraphElement>}
      color={color}
      size={size}
      {...props}
        className={mergeClasses(
          textClasses.root,
          className,
        )}
    >
      {children}
    </SText>
  );
}) as TPolymorphicComponent<'p', TTextOwnProps>;

Text.displayName = 'Text';

export type { TTextProps, TTextOwnProps, TTextSize } from './types';
export { textClasses } from './classes';
export { Text };
export default Text;
