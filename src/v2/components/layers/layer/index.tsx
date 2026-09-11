import React, { forwardRef } from 'react';
import { mergeClasses } from '../../../../helpers/generate-utility-classes';
import { useLayersContext } from '../context';
import { layerClasses } from './classes';
import { SLayer } from './styles';
import { TLayerProps } from './types';

type TLayerComponent = React.ForwardRefExoticComponent<
  TLayerProps & React.RefAttributes<HTMLDivElement>
> & {
  isLayer: true;
};

const Layer = forwardRef<HTMLDivElement, TLayerProps>(
  (
    {
      children,
      radius: radiusProp,
      index = 0,
      className,
      ...props
    },
    ref,
  ) => {
    const context = useLayersContext();
    const radius = radiusProp ?? context?.radius ?? 'lg';
    const count = context?.count ?? 1;
    const spread = context?.spread ?? 'bottom';

    return (
      <SLayer
        ref={ref}
        radius={radius}
        {...props}
        index={index}
        count={count}
        spread={spread}
        className={mergeClasses(layerClasses.root, className)}
      >
        {children}
      </SLayer>
    );
  },
) as TLayerComponent;

Layer.displayName = 'Layer';
Layer.isLayer = true;

export type { TLayerProps } from './types';
export { layerClasses } from './classes';
export { Layer };
export default Layer;
