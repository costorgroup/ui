import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { emptyClasses } from './classes';
import { SEmpty } from './styles';
import { TEmptyProps } from './types';

const Empty = forwardRef<HTMLDivElement, TEmptyProps>(
  (
    {
      children,
      radius = 'md',
      appearance = 'transparent',
      variant = 'plain',
      className,
      ...props
    },
    ref,
  ) => (
    <SEmpty
      ref={ref}
      radius={radius}
      appearance={appearance}
      variant={variant}
      {...props}
      className={mergeClasses(
        emptyClasses.root,
        emptyClasses[variant],
        appearance === 'opaque'
          ? emptyClasses.opaque
          : emptyClasses.transparent,
        className,
      )}
    >
      {children}
    </SEmpty>
  ),
);

Empty.displayName = 'Empty';

export type {
  TEmptyProps,
  TEmptyAppearance,
  TEmptyRadius,
  TEmptyVariant,
} from './types';
export type { TEmptyHeaderProps } from './empty-header';
export type { TEmptyMediaProps, TEmptyMediaVariant } from './empty-media';
export type { TEmptyTitleProps } from './empty-title';
export type { TEmptyDescriptionProps } from './empty-description';
export type { TEmptyContentProps } from './empty-content';
export { emptyClasses } from './classes';
export { EmptyHeader, emptyHeaderClasses } from './empty-header';
export { EmptyMedia, emptyMediaClasses } from './empty-media';
export { EmptyTitle, emptyTitleClasses } from './empty-title';
export { EmptyDescription, emptyDescriptionClasses } from './empty-description';
export { EmptyContent, emptyContentClasses } from './empty-content';
export { Empty };
export default Empty;
