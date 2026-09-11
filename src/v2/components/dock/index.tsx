import React, { forwardRef, useMemo } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { dockClasses } from './classes';
import { DockContext } from './context';
import { SDock } from './styles';
import { TDockProps } from './types';

const Dock = forwardRef<HTMLDivElement, TDockProps>(
  (
    {
      children,
      orientation = 'horizontal',
      appearance = 'opaque',
      variant = 'surface',
      className,
      ...props
    },
    ref,
  ) => {
    const contextValue = useMemo(() => ({ orientation }), [orientation]);

    return (
      <DockContext.Provider value={contextValue}>
        <SDock
          ref={ref}
          orientation={orientation}
          appearance={appearance}
          variant={variant}
          role="toolbar"
          {...props}
          className={mergeClasses(
            dockClasses.root,
            dockClasses[variant],
            dockClasses[orientation],
            appearance === 'opaque'
              ? dockClasses.opaque
              : dockClasses.transparent,
            className,
          )}
        >
          {children}
        </SDock>
      </DockContext.Provider>
    );
  },
);

Dock.displayName = 'Dock';

export type {
  TDockProps,
  TDockAppearance,
  TDockOrientation,
  TDockVariant,
} from './types';
export type { TDockItemProps } from './dock-item';
export type { TDockSeparatorProps } from './dock-separator';
export { dockClasses } from './classes';
export { DockItem, dockItemClasses } from './dock-item';
export { DockSeparator, dockSeparatorClasses } from './dock-separator';
export { Dock };
export default Dock;
