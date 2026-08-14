import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { dividerClasses } from './classes';
import { SDivider } from './styles';
import { TDividerProps } from './types';

const Divider = forwardRef<HTMLDivElement, TDividerProps>(
  (
    {
      children,
      orientation = 'horizontal',
      variant = 'solid',
      size = 'md',
      color = 'default',
      role = 'separator',
      className,
      ...props
    },
    ref,
  ) => {
    const labeled = children != null && children !== false && children !== '';

    return (
      <SDivider
        ref={ref}
        role={role}
        aria-orientation={orientation}
        orientation={orientation}
        variant={variant}
        size={size}
        color={color}
        labeled={Boolean(labeled)}
        {...props}
        className={mergeClasses(
          dividerClasses.root,
          className,
        )}
      >
        {labeled ? children : null}
      </SDivider>
    );
  },
);

Divider.displayName = 'Divider';

export type {
  TDividerProps,
  TDividerOrientation,
  TDividerVariant,
  TDividerSize,
} from './types';
export { dividerClasses } from './classes';
export { Divider };
export default Divider;
