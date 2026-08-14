export type TBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TThemeBreakpointValues = Record<TBreakpoint, number>;

export type TThemeBreakpointsOptions = {
  values?: Partial<TThemeBreakpointValues>;
  unit?: string;
  step?: number;
};

export type TThemeBreakpoints = {
  keys: TBreakpoint[];
  values: TThemeBreakpointValues;
  unit: string;
  step: number;
  up: (key: TBreakpoint | number) => string;
  down: (key: TBreakpoint | number) => string;
  between: (start: TBreakpoint | number, end: TBreakpoint | number) => string;
  only: (key: TBreakpoint) => string;
  not: (key: TBreakpoint) => string;
};
