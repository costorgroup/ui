import React, { ElementType, forwardRef } from 'react';
import type { TPolymorphicComponent } from '../../helpers/polymorphic';
import { SCard } from './styles';
import { TCardOwnProps, TCardProps } from './types';

const Card = forwardRef(function Card<C extends ElementType = 'div'>(
  { as, children, radius = 'large', ...props }: TCardProps<C>,
  ref: React.Ref<Element>,
) {
  return (
    <SCard
      as={as}
      ref={ref as React.Ref<HTMLDivElement>}
      radius={radius}
      {...props}
    >
      {children}
    </SCard>
  );
}) as TPolymorphicComponent<'div', TCardOwnProps>;

Card.displayName = 'Card';

export type { TCardProps, TCardOwnProps, TCardRadius } from './types';
export { Card };
export default Card;
