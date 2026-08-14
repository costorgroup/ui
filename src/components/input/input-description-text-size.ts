import type { TTextSize } from '../text/types';
import type { TInputSize } from './input-wrapper/types';

/** Map field control size → Text size for descriptions (one step softer). */
export const inputDescriptionTextSize: Record<TInputSize, TTextSize> = {
  xs: 'xs',
  sm: 'xs',
  md: 'sm',
  lg: 'sm',
  xl: 'md',
};
