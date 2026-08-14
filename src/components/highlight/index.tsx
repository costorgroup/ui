import React, { ElementType, forwardRef } from 'react';
import type { TPolymorphicComponent } from '../../helpers/polymorphic';
import { SHighlight } from './styles';
import { THighlightOwnProps, THighlightProps } from './types';

const Highlight = forwardRef(function Highlight<
  C extends ElementType = 'span',
>(
  { as, children, color = 'primary', ...props }: THighlightProps<C>,
  ref: React.Ref<Element>,
) {
  return (
    <SHighlight
      as={as}
      ref={ref as React.Ref<HTMLElement>}
      color={color}
      {...props}
    >
      {children}
    </SHighlight>
  );
}) as TPolymorphicComponent<'span', THighlightOwnProps>;

Highlight.displayName = 'Highlight';

export type { THighlightProps, THighlightOwnProps } from './types';
export { Highlight };
export default Highlight;
