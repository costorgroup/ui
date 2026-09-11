import React, { forwardRef, ReactElement } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import type { TPolymorphicPropsWithRef } from '../../../../helpers/polymorphic';
import { Heading } from '../../heading';
import { drawerTitleClasses } from './classes';
import {
  TDrawerTitleAs,
  TDrawerTitleOwnProps,
  TDrawerTitleProps,
} from './types';

type TDrawerTitleComponent = (<C extends TDrawerTitleAs = 'h4'>(
  props: TPolymorphicPropsWithRef<C, TDrawerTitleOwnProps>,
) => ReactElement | null) & {
  displayName?: string;
};

const DrawerTitle = forwardRef(function DrawerTitle<
  C extends TDrawerTitleAs = 'h4',
>(
  { as, children, color = 'default', className, ...props }: TDrawerTitleProps<C>,
  ref: React.Ref<Element>,
) {
  return (
    <Heading
      as={(as ?? 'h4') as TDrawerTitleAs}
      ref={ref as React.Ref<HTMLHeadingElement>}
      color={color}
      {...props}
      className={mergeClasses(drawerTitleClasses.root, className)}
    >
      {children}
    </Heading>
  );
}) as TDrawerTitleComponent;

DrawerTitle.displayName = 'DrawerTitle';

export type {
  TDrawerTitleProps,
  TDrawerTitleOwnProps,
  TDrawerTitleAs,
} from './types';
export { drawerTitleClasses } from './classes';
export { DrawerTitle };
export default DrawerTitle;
