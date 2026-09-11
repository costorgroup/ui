import type {
  TThemeComponents,
  TThemeComponentsOptions,
} from './types';

export const components: TThemeComponents = {
  snackbar: {
    minWidth: 240,
    maxWidth: 480,
  },
};

const defined = <T extends object>(value?: T) =>
  Object.fromEntries(
    Object.entries(value ?? {}).filter(([, item]) => item !== undefined),
  ) as T;

export const mergeComponents = (
  override?: TThemeComponentsOptions,
): TThemeComponents => ({
  snackbar: {
    ...components.snackbar,
    ...defined(override?.snackbar),
  },
});

export type {
  TThemeComponents,
  TThemeComponentsOptions,
  TThemeSnackbarConfig,
} from './types';
