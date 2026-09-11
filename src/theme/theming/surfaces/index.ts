import type { TThemeMode } from '../../appearance';
import type {
  TThemeSurfaceTokens,
  TThemeSurfacesByMode,
  TThemeSurfacesOptions,
} from './types';

export const defaultSurfaces: TThemeSurfacesByMode = {
  light: {
    background: '#ffffff',
    border: '#00000030',
    ink: '#000000',
    muted: '#00000099',
    backdrop: '#00000080',
    divider: '#0000001a',
    mixer: '#000000',
  },
  dark: {
    background: '#111111',
    border: '#ffffff20',
    ink: '#ffffff',
    muted: '#ffffff99',
    backdrop: '#00000080',
    divider: '#ffffff1a',
    mixer: '#ffffff',
  },
};

export const mergeSurfacesByMode = (
  override?: TThemeSurfacesOptions,
): TThemeSurfacesByMode => ({
  light: { ...defaultSurfaces.light, ...override?.light },
  dark: { ...defaultSurfaces.dark, ...override?.dark },
});

export const resolveSurfaces = (
  mode: TThemeMode,
  override?: TThemeSurfacesOptions,
): TThemeSurfaceTokens => mergeSurfacesByMode(override)[mode];

export type {
  TThemeSurfaceTokens,
  TThemeSurfacesByMode,
  TThemeSurfacesOptions,
} from './types';
