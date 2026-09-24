import { createContext, useContext } from 'react';
import type { TPaletteColor } from '../../../theme/types';
import type { TAccordionSize } from '../accordion-base/context';
import type { TAccordionRadius } from '../types';
import type {
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
};

export const AccordionGroupContext =
  createContext<TAccordionGroupContextValue | null>(null);

export const useAccordionGroupContext = () =>
  useContext(AccordionGroupContext);
