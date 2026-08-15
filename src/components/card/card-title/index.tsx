import React, { forwardRef, ReactElement } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import type { TPolymorphicPropsWithRef } from '../../../helpers/polymorphic';
import { Heading } from '../../heading';
import { cardTitleClasses } from './classes';
import { TCardTitleAs, TCardTitleOwnProps, TCardTitleProps } from './types';

type TCardTitleComponent = (<C extends TCardTitleAs = 'h3'>(
  props: TPolymorphicPropsWithRef<C, TCardTitleOwnProps>,
) => ReactElement | null) & {
  displayName?: string;
};

const CardTitle = forwardRef(function CardTitle<C extends TCardTitleAs = 'h3'>(
  { as, className, ...props }: TCardTitleProps<C>,
  ref: React.Ref<Element>,
) {
  return (
    <Heading
      as={(as ?? 'h3') as TCardTitleAs}
      ref={ref as React.Ref<HTMLHeadingElement>}
      {...props}
      className={mergeClasses(cardTitleClasses.root, className)}
    />
  );
}) as TCardTitleComponent;

CardTitle.displayName = 'CardTitle';

export type { TCardTitleProps, TCardTitleOwnProps, TCardTitleAs } from './types';
export { cardTitleClasses } from './classes';
export { CardTitle };
export default CardTitle;
