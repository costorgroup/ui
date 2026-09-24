import { createContext, SyntheticEvent, useContext } from 'react';
import type { TPaletteColor } from '../../../theme/types';
import type { TAccordionRadius } from '../types';
import type {
  TAccordionColorScope,
  TAccordionVariant,
} from '../variant-styles';

export type TAccordionSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TAccordionContextValue = {
  expanded: boolean;
  toggle: (event: SyntheticEvent) => void;
  color: TPaletteColor;
  variant: TAccordionVariant;
  size: TAccordionSize;
  radius: TAccordionRadius;
  disabled: boolean;
  grouped: boolean;
  hasDetails: boolean;
  colorScope: TAccordionColorScope;
  forceContrastText: boolean;
};

export const AccordionContext = createContext<TAccordionContextValue | null>(
  null,
);

export const useAccordionContext = (): TAccordionContextValue => {
  const context = useContext(AccordionContext);

  if (context == null) {
    throw new Error('Accordion parts must be used within AccordionBase.');
  }

  return context;
};
