import { createColorScale } from '../../helpers/color/create-color-scale';
import { TPaletteColor, TThemeGreyScale } from '../theming';
import { TMergeColors } from './types';

export const mergeColors: TMergeColors = (base, override) => {
  const merged = {
    ...base,
    common: {
      ...base.common,
      ...(override?.common ?? {}),
      grey: (override?.common?.grey
        ? [...override.common.grey]
        : [...base.common.grey]) as TThemeGreyScale,
    },
  };

  if (override) {
    (Object.keys(override).filter((key) => key !== 'common') as TPaletteColor[]).forEach(
      (key) => {
        const scale = override[key];
        if (scale) {
          merged[key] = {
            ...base[key],
            ...scale,
          };
        }
      },
    );
  }

  const canvas = merged.base.main;

  (Object.keys(merged).filter((key) => key !== 'common') as TPaletteColor[]).forEach(
    (key) => {
      const tint = key === 'base' ? 'contrastText' : 'main';
      const explicit = override?.[key];
      const current = merged[key];
      const built = createColorScale(current.main, current.contrastText, {
        canvas,
        tint,
      });

      merged[key] = {
        ...current,
        subtle: explicit?.subtle ?? built.subtle,
        muted: explicit?.muted ?? built.muted,
        fg: explicit?.fg ?? built.fg,
      };
    },
  );

  return merged;
};

export type { TMergeColors } from './types';
