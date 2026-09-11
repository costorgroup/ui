import { components } from "../components";
import { TThemeConfig } from "./types";

export const config: TThemeConfig = {
  snackbarMinWidth: components.snackbar.minWidth,
  snackbarMaxWidth: components.snackbar.maxWidth,
};

export type { TThemeConfig, TThemeConfigOptions } from "./types";

