import { TThemeSpacing } from './types';

export const spacing: TThemeSpacing = (...factors) =>
  factors.map((factor) => `${0.25 * factor}rem`).join(' ');

export type { TThemeSpacing } from './types';
