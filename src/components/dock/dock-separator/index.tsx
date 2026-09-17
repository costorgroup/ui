import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { useDockContext } from '../context';
import { dockSeparatorClasses } from './classes';
import { SDockSeparator } from './styles';
import { TDockSeparatorProps } from './types';

const DockSeparator = forwardRef<HTMLSpanElement, TDockSeparatorProps>(
  ({ className, ...props }, ref) => {
    const dock = useDockContext();
    const orientation = dock?.orientation ?? 'horizontal';
    const size = dock?.size ?? 'md';

    return (
      <SDockSeparator
        ref={ref}
        orientation={orientation}
        size={size}
        role="separator"
        aria-orientation={
          orientation === 'vertical' ? 'horizontal' : 'vertical'
        }
        {...props}
        className={mergeClasses(dockSeparatorClasses.root, className)}
      />
    );
  },
);

DockSeparator.displayName = 'DockSeparator';

export type { TDockSeparatorProps } from './types';
export { dockSeparatorClasses } from './classes';
export { DockSeparator };
export default DockSeparator;
