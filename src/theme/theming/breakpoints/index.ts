import {
  TBreakpoint,
  TThemeBreakpointValues,
  TThemeBreakpoints,
  TThemeBreakpointsOptions,
} from './types';

export const breakpointKeys: TBreakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export const breakpointValues: TThemeBreakpointValues = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

const sortBreakpointsValues = (values: TThemeBreakpointValues) => {
  const entries = (Object.keys(values) as TBreakpoint[]).map((key) => ({
    key,
    val: values[key],
  }));

  entries.sort((a, b) => a.val - b.val);

  return entries.reduce((acc, entry) => {
    acc[entry.key] = entry.val;
    return acc;
  }, {} as TThemeBreakpointValues);
};

const resolveValue = (
  values: TThemeBreakpointValues,
  key: TBreakpoint | number,
) => (typeof key === 'number' ? key : values[key]);

export const createBreakpoints = (
  options: TThemeBreakpointsOptions = {},
): TThemeBreakpoints => {
  const unit = options.unit ?? 'px';
  const step = options.step ?? 5;
  const values = sortBreakpointsValues({
    ...breakpointValues,
    ...options.values,
  });
  const keys = Object.keys(values) as TBreakpoint[];

  const up = (key: TBreakpoint | number) =>
    `@media (min-width:${resolveValue(values, key)}${unit})`;

  const down = (key: TBreakpoint | number) => {
    const value = resolveValue(values, key);
    return `@media (max-width:${value - step / 100}${unit})`;
  };

  const between = (start: TBreakpoint | number, end: TBreakpoint | number) => {
    const endIndex = typeof end === 'string' ? keys.indexOf(end) : -1;
    const endValue =
      endIndex !== -1 ? values[keys[endIndex]] : resolveValue(values, end);

    return (
      `@media (min-width:${resolveValue(values, start)}${unit}) and ` +
      `(max-width:${endValue - step / 100}${unit})`
    );
  };

  const only = (key: TBreakpoint) => {
    const keyIndex = keys.indexOf(key);

    if (keyIndex + 1 < keys.length) {
      return between(key, keys[keyIndex + 1]);
    }

    return up(key);
  };

  const not = (key: TBreakpoint) => {
    const keyIndex = keys.indexOf(key);

    if (keyIndex === 0) {
      return up(keys[1]);
    }

    if (keyIndex === keys.length - 1) {
      return down(keys[keyIndex]);
    }

    return between(key, keys[keyIndex + 1]).replace(
      '@media',
      '@media not all and',
    );
  };

  return {
    keys,
    values,
    unit,
    step,
    up,
    down,
    between,
    only,
    not,
  };
};

export const breakpoints = createBreakpoints();

export type {
  TBreakpoint,
  TThemeBreakpointValues,
  TThemeBreakpoints,
  TThemeBreakpointsOptions,
} from './types';
