import { createContext, SyntheticEvent, useContext } from 'react';
import type { TPaletteColor } from '../../../theme/types';
import type { TAccordionSize } from '../accordion-base/context';
import type { TAccordionRadius } from '../types';
import type {
  TAccordionAppearance,
  TAccordionColorScope,
  TAccordionVariant,
} from '../variant-styles';

export type TAccordionGroupContextValue = {
  color?: TPaletteColor;
  variant?: TAccordionVariant;
  size?: TAccordionSize;
  radius?: TAccordionRadius;
  colorScope?: TAccordionColorScope;
  forceContrastText?: boolean;
  /** Tints mix onto the theme canvas (`opaque`, default) or onto transparent. */
  appearance?: TAccordionAppearance;
  /** Only one item open at a time; the group owns which one. */
  exclusive: boolean;
  /** `value` of the open item while `exclusive`. */
  value: string | null;
  setValue: (event: SyntheticEvent, value: string | null) => void;
  /** Items are drag items with a grip (the group has `onReorder`). */
  sortable: boolean;
};

export const AccordionGroupContext =
  createContext<TAccordionGroupContextValue | null>(null);

export const useAccordionGroupContext = () =>
  useContext(AccordionGroupContext);
