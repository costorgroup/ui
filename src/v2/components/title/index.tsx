import React, { forwardRef, ReactElement } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import type { TPolymorphicPropsWithRef } from '../../../helpers/polymorphic';
import { titleClasses } from './classes';
import { STitle } from './styles';
import { TTitleAs, TTitleOwnProps, TTitleProps } from './types';

type TTitleComponent = (<C extends TTitleAs = 'h1'>(
  props: TPolymorphicPropsWithRef<C, TTitleOwnProps>,
) => ReactElement | null) & {
  displayName?: string;
};

const Title = forwardRef(function Title<C extends TTitleAs = 'h1'>(
  { as, children, color = 'default', className, ...props }: TTitleProps<C>,
  ref: React.Ref<Element>,
) {
  const tag = (as ?? 'h1') as TTitleAs;

  return (
    <STitle
      as={tag}
      ref={ref as React.Ref<HTMLHeadingElement>}
      level={tag}
      color={color}
      {...props}
      className={mergeClasses(titleClasses.root, className)}
    >
      {children}
    </STitle>
  );
}) as TTitleComponent;

Title.displayName = 'Title';

export type { TTitleProps, TTitleOwnProps, TTitleAs } from './types';
export { titleClasses } from './classes';
export { Title };
export default Title;
