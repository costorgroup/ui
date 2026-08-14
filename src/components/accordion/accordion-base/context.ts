import { createContext, SyntheticEvent } from 'react';
import { TPaletteColor } from '../../../theme/types';

export type TAccordionVariant =
  | 'solid'
  | 'subtle'
  | 'surface'
  | 'outline'
  | 'ghost'
  | 'plain';

export type TAccordionSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TAccordionContextValue = {
  expanded: boolean;
  toggle: (event: SyntheticEvent) => void;
  color: TPaletteColor;
  variant: TAccordionVariant;
  size: TAccordionSize;
  disabled: boolean;
};

export const AccordionContext = createContext<TAccordionContextValue | null>(
  null,
);
