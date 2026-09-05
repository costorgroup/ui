import { createContext, useContext } from 'react';
import { TPaletteColor } from '../../../../theme/types';
import { TWindowRadius } from '../../window/types';
import { TAccordionSize } from '../accordion-base/context';
import { TAccordionVariant } from '../variant-styles';

export type TAccordionGroupContextValue = {
  color?: TPaletteColor;
  variant?: TAccordionVariant;
  size?: TAccordionSize;
  radius?: TWindowRadius;
};

export const AccordionGroupContext =
  createContext<TAccordionGroupContextValue | null>(null);

export const useAccordionGroupContext = () =>
  useContext(AccordionGroupContext);
