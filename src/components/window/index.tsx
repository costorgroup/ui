import React, { ElementType, forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import type { TPolymorphicComponent } from '../../helpers/polymorphic';
import { windowClasses } from './classes';
import { SWindow } from './styles';
import { TWindowOwnProps, TWindowProps } from './types';

const Window = forwardRef(function Window<C extends ElementType = 'div'>(
  {
    as,
    children,
    radius = 'large',
    appearance = 'opaque',
    className,
    ...props
  }: TWindowProps<C>,
  ref: React.Ref<Element>,
) {
  return (
    <SWindow
      as={as}
      ref={ref as React.Ref<HTMLDivElement>}
      radius={radius}
      appearance={appearance}
      {...props}
      className={mergeClasses(
        windowClasses.root,
        appearance === 'opaque'
          ? windowClasses.opaque
          : windowClasses.transparent,
        className,
      )}
    >
      {children}
    </SWindow>
  );
}) as TPolymorphicComponent<'div', TWindowOwnProps>;

Window.displayName = 'Window';

export type {
  TWindowProps,
  TWindowOwnProps,
  TWindowRadius,
  TWindowAppearance,
} from './types';
export { windowClasses } from './classes';
export { Window };
export default Window;
