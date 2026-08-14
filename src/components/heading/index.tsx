import React, { forwardRef, ReactElement } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { headingClasses } from './classes';
import type { TPolymorphicPropsWithRef } from '../../helpers/polymorphic';
import { SHeading } from './styles';
import { THeadingAs, THeadingOwnProps, THeadingProps } from './types';

type THeadingComponent = (<C extends THeadingAs = 'h1'>(
  props: TPolymorphicPropsWithRef<C, THeadingOwnProps>,
) => ReactElement | null) & {
  displayName?: string;
};

const Heading = forwardRef(function Heading<C extends THeadingAs = 'h1'>(
  { as, children, color = 'default', className, ...props }: THeadingProps<C>,
  ref: React.Ref<Element>,
) {
  const tag = (as ?? 'h1') as THeadingAs;

  return (
    <SHeading
      as={tag}
      ref={ref as React.Ref<HTMLHeadingElement>}
      level={tag}
      color={color}
      {...props}
        className={mergeClasses(
          headingClasses.root,
          className,
        )}
    >
      {children}
    </SHeading>
  );
}) as THeadingComponent;

Heading.displayName = 'Heading';

export type { THeadingProps, THeadingOwnProps, THeadingAs } from './types';
export { headingClasses } from './classes';
export { Heading };
export default Heading;
