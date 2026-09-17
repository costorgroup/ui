import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { markerIconClasses } from './classes';
import { SMarkerIcon } from './styles';
import { TMarkerIconProps } from './types';

const MarkerIcon = forwardRef<HTMLSpanElement, TMarkerIconProps>(
  ({ children, className, ...props }, ref) => (
    <SMarkerIcon
      ref={ref}
      aria-hidden
      {...props}
      className={mergeClasses(markerIconClasses.root, className)}
    >
      {children}
    </SMarkerIcon>
  ),
);

MarkerIcon.displayName = 'MarkerIcon';

export type { TMarkerIconProps } from './types';
export { markerIconClasses } from './classes';
export { MarkerIcon };
export default MarkerIcon;
