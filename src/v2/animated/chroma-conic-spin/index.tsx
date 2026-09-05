import React, { forwardRef, useMemo } from 'react';
import { mergeClasses } from '../../../helpers/generate-utility-classes';
import { useAnimatedPlay } from '../use-animated-play';
import { chromaConicSpinClasses } from './classes';
import { resolveChromaLayers } from './resolve-layers';
import { SChromaConicSpin, SChromaContent, SChromaRing } from './styles';
import { TChromaConicSpinProps } from './types';

const ChromaConicSpin = forwardRef<HTMLDivElement, TChromaConicSpinProps>(
  (
    {
      children,
      play = 'hover',
      colors,
      thickness,
      duration,
      radius = 'medium',
      origin,
      maskComposite,
      webkitMaskComposite,
      layers,
      className,
      ...props
    },
    ref,
  ) => {
    const { rootProps } = useAnimatedPlay(play);
    const resolvedLayers = useMemo(
      () =>
        resolveChromaLayers({
          layers,
          origin,
          colors,
          thickness,
          duration,
          maskComposite,
          webkitMaskComposite,
        }),
      [
        layers,
        origin,
        colors,
        thickness,
        duration,
        maskComposite,
        webkitMaskComposite,
      ],
    );

    return (
      <SChromaConicSpin
        ref={ref}
        radius={radius}
        {...rootProps}
        {...props}
        className={mergeClasses(chromaConicSpinClasses.root, className)}
      >
        {resolvedLayers.map((layer) => (
          <SChromaRing
            key={layer.key}
            className={chromaConicSpinClasses.ring}
            origin={layer.origin}
            gradient={layer.gradient}
            thickness={layer.thickness}
            duration={layer.duration}
            maskComposite={layer.maskComposite}
            webkitMaskComposite={layer.webkitMaskComposite}
            aria-hidden
          />
        ))}
        <SChromaContent className={chromaConicSpinClasses.content}>
          {children}
        </SChromaContent>
      </SChromaConicSpin>
    );
  },
);

ChromaConicSpin.displayName = 'ChromaConicSpin';

export type {
  TChromaConicSpinLayer,
  TChromaConicSpinProps,
  TChromaConicSpinOrigin,
  TChromaOrigin,
  TChromaMaskComposite,
  TChromaWebkitMaskComposite,
} from './types';
export { CHROMA_CORNER_ORIGINS, CHROMA_WEBKIT_MASK_COMPOSITE } from './types';
export { chromaConicSpinClasses } from './classes';
export { ChromaConicSpin };
export default ChromaConicSpin;
