import { TPaletteColor, TThemeGreyScale } from '../theming';
import { TMergeColors } from './types';

export const mergeColors: TMergeColors = (base, override) => {
  if (!override) {
    return {
      ...base,
      common: {
        ...base.common,
        grey: [...base.common.grey] as TThemeGreyScale,
      },
    };
  }

  const merged = {
    ...base,
    common: {
      ...base.common,
      ...override.common,
      grey: (override.common?.grey
        ? [...override.common.grey]
        : [...base.common.grey]) as TThemeGreyScale,
    },
  };

  (Object.keys(override).filter((key) => key !== 'common') as TPaletteColor[]).forEach((key) => {
    const scale = override[key];
    if (scale) {
      merged[key] = {
        ...base[key],
        ...scale,
      };
    }
  });

  return merged;
};

export type { TMergeColors } from './types';
