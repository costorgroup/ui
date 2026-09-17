import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { markerContentClasses } from './classes';
import { SMarkerContent } from './styles';
import { TMarkerContentProps } from './types';

const MarkerContent = forwardRef<HTMLSpanElement, TMarkerContentProps>(
  ({ children, className, ...props }, ref) => (
    <SMarkerContent
      ref={ref}
      {...props}
      className={mergeClasses(markerContentClasses.root, className)}
    >
      {children}
    </SMarkerContent>
  ),
);

MarkerContent.displayName = 'MarkerContent';

export type { TMarkerContentProps } from './types';
export { markerContentClasses } from './classes';
export { MarkerContent };
export default MarkerContent;
