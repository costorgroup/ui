import { createContext, SyntheticEvent, useContext } from 'react';
import { TPaletteColor } from '../../../../theme/types';
import { TWindowRadius } from '../../window/types';
import { TAccordionVariant } from '../variant-styles';

export type TAccordionSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TAccordionContextValue = {
  expanded: boolean;
  toggle: (event: SyntheticEvent) => void;
  color: TPaletteColor;
  variant: TAccordionVariant;
  size: TAccordionSize;
  radius: TWindowRadius;
  disabled: boolean;
  grouped: boolean;
  hasDetails: boolean;
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
