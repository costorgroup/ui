export type TThemeSizeKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TThemeSizeStep = {
  height: string;
  padX: string;
  padY: string;
  gap: string;
  fontSize: string;
  icon: string;
};

export type TThemeSizes = Record<TThemeSizeKey, TThemeSizeStep>;

export type TThemeDensity = 'compact' | 'comfortable';

export type TThemeSizesOptions = Partial<{
  [K in TThemeSizeKey]: Partial<TThemeSizeStep>;
}>;
