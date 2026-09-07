import { createColorScale } from "../../../helpers/color/create-color-scale";
import { TThemeColors, TThemePaletteColors } from "./types";

export { CUI_CANVAS_VAR } from "../../../helpers/color/create-color-scale";

const canvas = {
  dark: "#111111",
  light: "#f3f3f3",
} as const;

export type TColorScheme = keyof typeof canvas;

const createPalette = () => {
  return {
    primary: createColorScale("#00123d", "#ffffff"),
    secondary: createColorScale("#334566", "#ffffff"),
    success: createColorScale("#34c759", "#ffffff"),
    error: createColorScale("#ff3b30", "#ffffff"),
    warning: createColorScale("#ff9500", "#ffffff"),
    info: createColorScale("#007aff", "#ffffff"),
    dark: createColorScale("#1a1a1a", "#ffffff"),
    light: createColorScale("#f5f5f5", "#1a1a1a"),
  } satisfies Omit<TThemePaletteColors, "base" | "default">;
};

/**
 * `base` — theme canvas scale. `base.contrastText` darkens or lightens chrome.
 * `default` — user contrast scale. `default.main` is theme text and default fills.
 */
export const colorSchemes = {
  dark: {
    base: createColorScale("#000000", "#ffffff"),
    default: createColorScale("#ffffff", "#000000"),
  },
  light: {
    base: createColorScale("#ffffff", "#000000"),
    default: createColorScale("#000000", "#ffffff"),
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
  ...createPalette(),
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
