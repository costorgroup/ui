import { createColorScale } from "../../../helpers/color/create-color-scale";
import { TThemeColors, TThemePaletteColors } from "./types";

export { CUI_CANVAS_VAR } from "../../../helpers/color/create-color-scale";

const canvas = {
  dark: "#111111",
  light: "#f3f3f3",
} as const;

export type TColorScheme = keyof typeof canvas;

const createPalette = (scheme: TColorScheme) => {
  const canvasHex = canvas[scheme];

  return {
    primary: createColorScale("#00123d", "#ffffff", { canvas: canvasHex }),
    secondary: createColorScale("#334566", "#ffffff", { canvas: canvasHex }),
    success: createColorScale("#34c759", "#ffffff", { canvas: canvasHex }),
    error: createColorScale("#ff3b30", "#ffffff", { canvas: canvasHex }),
    warning: createColorScale("#ff9500", "#ffffff", { canvas: canvasHex }),
    info: createColorScale("#007aff", "#ffffff", { canvas: canvasHex }),
    dark: createColorScale("#1a1a1a", "#ffffff", { canvas: canvasHex }),
    light: createColorScale("#f5f5f5", "#1a1a1a", { canvas: canvasHex }),
  } satisfies Omit<TThemePaletteColors, "base" | "default">;
};

/** Scheme canvas (`base`) + default fill for Cancel-style controls (`default`). */
export const colorSchemes = {
  dark: {
    base: createColorScale("#111111", "#ffffff", {
      canvas: canvas.dark,
      tint: "contrastText",
    }),
    default: createColorScale("#f3f3f3", "#000000", { canvas: canvas.dark }),
  },
  light: {
    base: createColorScale("#f3f3f3", "#000000", {
      canvas: canvas.light,
      tint: "contrastText",
    }),
    default: createColorScale("#111111", "#ffffff", { canvas: canvas.light }),
  },
} as const;

const commonColors: TThemeColors["common"] = {
  white: "#ffffff",
  black: "#000000",
  grey: [
    "#fdfdfd",
    "#fafafa",
    "#f8f8f8",
    "#f5f5f5",
    "#f2f2f2",
    "#eeeeee",
    "#e7e7e7",
    "#e0e0e0",
    "#cfcfcf",
    "#bdbdbd",
    "#aeaeae",
    "#9e9e9e",
    "#8a8a8a",
    "#757575",
    "#6b6b6b",
    "#616161",
    "#525252",
    "#424242",
    "#323232",
    "#212121",
  ],
};

export const createColors = (scheme: TColorScheme = "dark"): TThemeColors => ({
  ...createPalette(scheme),
  ...colorSchemes[scheme],
  common: commonColors,
});

/** Default palette (dark scheme). */
export const colors = createColors("dark");

export { createColorScale } from "../../../helpers/color/create-color-scale";
export type {
  TCreateColorScaleSteps,
  TCreateColorScaleOptions,
} from "../../../helpers/color/create-color-scale";
export type {
  TThemeColorScale,
  TThemePaletteColors,
  TThemeCommonColors,
  TThemeGreyScale,
  TThemeColors,
  TPaletteColor,
  TThemeColorsOptions,
} from "./types";
