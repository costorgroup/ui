import React, { forwardRef } from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { viewportClasses } from './classes';
import { SViewport } from './styles';
import { TViewportProps } from './types';

const Viewport = forwardRef<HTMLDivElement, TViewportProps>(
  (
    { children, radius = 'medium', variant = 'surface', elevation = 1, className, ...props },
    ref,
  ) => {
    return (
      <SViewport
        ref={ref}
        radius={radius}
        variant={variant}
        elevation={elevation}
        data-slot="viewport"
        {...props}
        className={mergeClasses(viewportClasses.root, className)}
      >
        {children}
      </SViewport>
    );
  },
);

Viewport.displayName = 'Viewport';

export type { TViewportProps, TViewportRadius, TViewportVariant } from './types';
export { viewportClasses } from './classes';
export { Viewport };
export default Viewport;
