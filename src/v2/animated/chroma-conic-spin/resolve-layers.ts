import {
  CHROMA_WEBKIT_MASK_COMPOSITE,
  TChromaConicSpinProps,
  TChromaMaskComposite,
  TChromaWebkitMaskComposite,
} from './types';

export const DEFAULT_CHROMA_COLORS = ['#22e3ff', '#7c5cff', '#ff2bd6'];

export type TResolvedChromaLayer = {
  key: string;
  origin: string;
  gradient: string;
  thickness: number;
  duration: number;
  maskComposite: TChromaMaskComposite;
  webkitMaskComposite: TChromaWebkitMaskComposite;
};

export const buildGradientStops = (colors: string[]) => {
  const palette = colors.length > 0 ? colors : DEFAULT_CHROMA_COLORS;
  return [...palette, palette[0]].join(', ');
};

const resolveWebkitMaskComposite = (
  maskComposite: TChromaMaskComposite,
  webkitMaskComposite?: TChromaWebkitMaskComposite,
) => webkitMaskComposite ?? CHROMA_WEBKIT_MASK_COMPOSITE[maskComposite];

const normalizeOrigins = (origin: TChromaConicSpinProps['origin']) => {
  if (origin == null) {
    return ['50% 50%'];
  }

  return typeof origin === 'string' ? [origin] : [...origin];
};

const defaultOrigin = (origin: TChromaConicSpinProps['origin']) => {
  if (origin == null) {
    return '50% 50%';
  }

  return typeof origin === 'string' ? origin : origin[0] ?? '50% 50%';
};

type TResolveLayersInput = Pick<
  TChromaConicSpinProps,
  | 'layers'
  | 'origin'
  | 'colors'
  | 'thickness'
  | 'duration'
  | 'maskComposite'
  | 'webkitMaskComposite'
>;

export const resolveChromaLayers = ({
  layers,
  origin = '50% 50%',
  colors = DEFAULT_CHROMA_COLORS,
  thickness = 2,
  duration = 4,
  maskComposite = 'exclude',
  webkitMaskComposite,
}: TResolveLayersInput): TResolvedChromaLayer[] => {
  const fallbackOrigin = defaultOrigin(origin);
  const defaultWebkit = resolveWebkitMaskComposite(
    maskComposite,
    webkitMaskComposite,
  );

  if (layers != null && layers.length > 0) {
    return layers.map((layer, index) => {
      const layerMaskComposite = layer.maskComposite ?? maskComposite;

      return {
        key: `${layer.origin ?? fallbackOrigin}-${index}`,
        origin: layer.origin ?? fallbackOrigin,
        gradient: buildGradientStops(layer.colors ?? colors),
        thickness: layer.thickness ?? thickness,
        duration: layer.duration ?? duration,
        maskComposite: layerMaskComposite,
        webkitMaskComposite: resolveWebkitMaskComposite(
          layerMaskComposite,
          layer.webkitMaskComposite ?? webkitMaskComposite,
        ),
      };
    });
  }

  return normalizeOrigins(origin).map((point, index) => ({
    key: `${point}-${index}`,
    origin: point,
    gradient: buildGradientStops(colors),
    thickness,
    duration,
    maskComposite,
    webkitMaskComposite: defaultWebkit,
  }));
};
