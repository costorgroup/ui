import React, { ElementType, forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { containerClasses } from './classes';
import type { TPolymorphicComponent } from '../../helpers/polymorphic';
import { SContainer } from './styles';
import { TContainerOwnProps, TContainerProps } from './types';

const Container = forwardRef(function Container<C extends ElementType = 'div'>(
  {
    as,
    children,
    maxWidth = 'lg',
    fixed = false,
    disableGutters = false,
    className, ...props
  }: TContainerProps<C>,
  ref: React.Ref<Element>,
) {
  return (
    <SContainer
      as={as}
      ref={ref as React.Ref<HTMLDivElement>}
      maxWidth={maxWidth}
      fixed={fixed}
      disableGutters={disableGutters}
      {...props}
        className={mergeClasses(
          containerClasses.root,
          className,
        )}
    >
      {children}
    </SContainer>
  );
}) as TPolymorphicComponent<'div', TContainerOwnProps>;

Container.displayName = 'Container';

export type {
  TContainerProps,
  TContainerOwnProps,
  TContainerMaxWidth,
} from './types';
export { containerClasses } from './classes';
export { Container };
export default Container;
