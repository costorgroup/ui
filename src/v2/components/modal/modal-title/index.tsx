import React, { forwardRef, ReactElement } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import type { TPolymorphicPropsWithRef } from '../../../../helpers/polymorphic';
import { Heading } from '../../heading';
import { modalTitleClasses } from './classes';
import {
  TModalTitleAs,
  TModalTitleOwnProps,
  TModalTitleProps,
} from './types';

type TModalTitleComponent = (<C extends TModalTitleAs = 'h4'>(
  props: TPolymorphicPropsWithRef<C, TModalTitleOwnProps>,
) => ReactElement | null) & {
  displayName?: string;
};

const ModalTitle = forwardRef(function ModalTitle<
  C extends TModalTitleAs = 'h4',
>(
  { as, children, color = 'default', className, ...props }: TModalTitleProps<C>,
  ref: React.Ref<Element>,
) {
  return (
    <Heading
      as={(as ?? 'h4') as TModalTitleAs}
      ref={ref as React.Ref<HTMLHeadingElement>}
      color={color}
      {...props}
      className={mergeClasses(modalTitleClasses.root, className)}
    >
      {children}
    </Heading>
  );
}) as TModalTitleComponent;

ModalTitle.displayName = 'ModalTitle';

export type {
  TModalTitleProps,
  TModalTitleOwnProps,
  TModalTitleAs,
} from './types';
export { modalTitleClasses } from './classes';
export { ModalTitle };
export default ModalTitle;
