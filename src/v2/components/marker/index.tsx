import React, { ElementType, forwardRef } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import type { TPolymorphicComponent } from '../../../helpers/polymorphic';
import { markerClasses } from './classes';
import { SMarker } from './styles';
import { TMarkerOwnProps, TMarkerProps } from './types';

const Marker = forwardRef(function Marker<C extends ElementType = 'div'>(
  {
    as,
    children,
    variant = 'default',
    color = 'primary',
    className,
    ...props
  }: TMarkerProps<C>,
  ref: React.Ref<Element>,
) {
  return (
    <SMarker
      as={as}
      ref={ref as React.Ref<HTMLDivElement>}
      variant={variant}
      color={color}
      {...props}
      className={mergeClasses(
        markerClasses.root,
        markerClasses[variant],
        className,
      )}
    >
      {children}
    </SMarker>
  );
}) as TPolymorphicComponent<'div', TMarkerOwnProps>;

Marker.displayName = 'Marker';

export type {
  TMarkerProps,
  TMarkerOwnProps,
  TMarkerVariant,
} from './types';
export type { TMarkerIconProps } from './marker-icon';
export type { TMarkerContentProps } from './marker-content';
export { markerClasses } from './classes';
export { MarkerIcon, markerIconClasses } from './marker-icon';
export { MarkerContent, markerContentClasses } from './marker-content';
export { Marker };
export default Marker;
