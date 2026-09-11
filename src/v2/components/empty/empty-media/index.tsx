import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { emptyMediaClasses } from './classes';
import { SEmptyMedia } from './styles';
import { TEmptyMediaProps } from './types';

const EmptyMedia = forwardRef<HTMLDivElement, TEmptyMediaProps>(
  ({ children, variant = 'default', className, ...props }, ref) => (
    <SEmptyMedia
      ref={ref}
      variant={variant}
      {...props}
      className={mergeClasses(
        emptyMediaClasses.root,
        emptyMediaClasses[variant],
        className,
      )}
    >
      {children}
    </SEmptyMedia>
  ),
);

EmptyMedia.displayName = 'EmptyMedia';

export type { TEmptyMediaProps, TEmptyMediaVariant } from './types';
export { emptyMediaClasses } from './classes';
export { EmptyMedia };
export default EmptyMedia;
