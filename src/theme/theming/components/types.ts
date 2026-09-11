export type TThemeSnackbarConfig = {
  minWidth: number;
  maxWidth: number;
};

export type TThemeComponents = {
  snackbar: TThemeSnackbarConfig;
};

export type TThemeComponentsOptions = {
  snackbar?: Partial<TThemeSnackbarConfig>;
};
