export type TThemeSurfaceTokens = {
  background: string;
  border: string;
  ink: string;
  muted: string;
  backdrop: string;
  backdropText: string;
  divider: string;
  mixer: string;
};

export type TThemeSurfacesByMode = {
  light: TThemeSurfaceTokens;
  dark: TThemeSurfaceTokens;
};

export type TThemeSurfacesOptions = {
  light?: Partial<TThemeSurfaceTokens>;
  dark?: Partial<TThemeSurfaceTokens>;
};
