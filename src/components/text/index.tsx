import React, { ElementType, forwardRef } from 'react';
import type { TPolymorphicComponent } from '../../helpers/polymorphic';
import { SText } from './styles';
import { TTextOwnProps, TTextProps } from './types';

const Text = forwardRef(function Text<C extends ElementType = 'p'>(
  { as, children, color = 'default', size = 'md', ...props }: TTextProps<C>,
  ref: React.Ref<Element>,
) {
  return (
    <SText
      as={as}
      ref={ref as React.Ref<HTMLParagraphElement>}
      color={color}
      size={size}
      {...props}
    >
      {children}
    </SText>
  );
}) as TPolymorphicComponent<'p', TTextOwnProps>;

Text.displayName = 'Text';

export type { TTextProps, TTextOwnProps, TTextSize } from './types';
export { Text };
export default Text;
