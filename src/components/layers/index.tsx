import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  useMemo,
} from 'react';
import { mergeClasses } from '../../helpers/generate-utility-classes';
import { layersClasses } from './classes';
import { LayersContext } from './context';
import { Layer, type TLayerProps } from './layer';
import { SLayers, SLayersScene } from './styles';
import { TLayersProps, TLayersSpread } from './types';
import { mergeSlotProps } from '../../helpers/slot-props';

const SPREAD_CLASS: Record<TLayersSpread, keyof typeof layersClasses> = {
  top: 'spreadTop',
  right: 'spreadRight',
  bottom: 'spreadBottom',
  left: 'spreadLeft',
};

const isLayerElement = (
  child: ReactElement,
): child is ReactElement<TLayerProps> =>
  typeof child.type !== 'string' &&
  (child.type as { isLayer?: boolean }).isLayer === true;

const wrapLayers = (children: TLayersProps['children']) =>
  Children.toArray(children).flatMap((child, index) => {
    if (!isValidElement(child)) {
      return [];
    }

    if (isLayerElement(child)) {
      return [child];
    }

    return [
      <Layer key={child.key ?? index}>{child}</Layer>,
    ];
  });

const Layers = forwardRef<HTMLDivElement, TLayersProps>(
  (
    {
      children,
      radius = 'lg',
      aspectRatio = '3 / 4',
      spread = 'bottom',
      className,
      slotProps,
      ...props
    },
    ref,
  ) => {
    const items = useMemo(() => wrapLayers(children), [children]);
    const count = items.length;

    return (
      <LayersContext.Provider value={{ count, radius, spread }}>
        <SLayers
          ref={ref}
          count={count}
          aspectRatio={aspectRatio}
          spread={spread}
          {...props}
          className={mergeClasses(
            layersClasses.root,
            layersClasses[SPREAD_CLASS[spread]],
            className,
          )}
        >
          <SLayersScene
            {...mergeSlotProps(
              {
                className: layersClasses.scene,
              },
              slotProps?.scene,
            )}
          >
            {items.map((item, index) =>
              cloneElement(item, {
                key: item.key ?? index,
                index,
              }),
            )}
          </SLayersScene>
        </SLayers>
      </LayersContext.Provider>
    );
  },
);

Layers.displayName = 'Layers';

export type {
  TLayersProps,
  TLayersSlotProps,
  TLayersRadius,
  TLayersSpread,
} from './types';
export type { TLayerProps } from './layer';
export { layersClasses } from './classes';
export { Layer, layerClasses } from './layer';
export { LayersContext, useLayersContext } from './context';
export { Layers };
export default Layers;
